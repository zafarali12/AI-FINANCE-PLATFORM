"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// ✅ Helper to convert Decimal fields into numbers
const serializeDecimal = (obj) => {
  if (!obj) return obj;
  const serialized = { ...obj };
  if (obj.balance) serialized.balance = Number(obj.balance);
  if (obj.amount) serialized.amount = Number(obj.amount);
  return serialized;
};

//
// =======================================================================
// 1️⃣ Get Account with Transactions
// =======================================================================
//
export async function getAccountWithTransactions(accountId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: {
        select: { transactions: true },
      },
    },
  });

  if (!account) return null;

  return {
    ...serializeDecimal(account),
    transactions: account.transactions.map(serializeDecimal),
  };
}

//
// =======================================================================
// 2️⃣ Bulk Delete Transactions (with balance updates)
// =======================================================================
//
export async function bulkDeleteTransactions(transactionIds) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Find transactions to calculate balance adjustment
    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    // Check if any transactions were found
    if (transactions.length === 0) {
      throw new Error("No transactions found to delete");
    }

    // Calculate balance change per account
    // When deleting: EXPENSE adds back to balance, INCOME subtracts from balance
    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const amount = Number(transaction.amount);
      const change =
        transaction.type === "EXPENSE"
          ? amount  // Add back expense amount
          : -amount; // Subtract income amount
      
      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});

    // Delete transactions and update balances atomically
    await db.$transaction(async (tx) => {
      // Delete transactions
      const deleteResult = await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      // Update account balances
      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceChanges
      )) {
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: { increment: balanceChange },
          },
        });
      }

      console.log(`Deleted ${deleteResult.count} transactions`);
    });

    // Revalidate paths
    revalidatePath("/dashboard");
    revalidatePath("/account/[id]", "page");

    return { 
      success: true, 
      count: transactions.length,
      message: `Successfully deleted ${transactions.length} transaction(s)`
    };
  } catch (error) {
    console.error("Bulk delete error:", error);
    return { success: false, error: error.message };
  }
}

//
// =======================================================================
// 3️⃣ Update Default Account (Switch Account Functionality FIXED)
// =======================================================================
//
export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Step 1 → Unset old default account (if any)
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: { isDefault: false },
    });

    // Step 2 → Set new default account
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    // Step 3 → Revalidate correct pages
    revalidatePath("/dashboard");
    revalidatePath(`/account/${accountId}`);

    // ✅ FIXED: proper serializer used, no undefined function
    return {
      success: true,
      message: "Default account switched successfully!",
      data: serializeDecimal(account),
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
