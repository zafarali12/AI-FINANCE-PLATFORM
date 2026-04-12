import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export default async function DebugPage() {
  const { userId: clerkUserId } = await auth();
  const clerkUser = await currentUser();
  
  let dbUser = null;
  let accounts = [];
  let allUsers = [];
  
  if (clerkUserId) {
    dbUser = await db.user.findUnique({
      where: { clerkUserId },
    });
    
    if (dbUser) {
      accounts = await db.account.findMany({
        where: { userId: dbUser.id },
      });
    }
    
    // Get all users to see what's in database
    allUsers = await db.user.findMany({
      include: {
        accounts: true,
      },
    });
  }

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">🔍 Debug Information</h1>
      
      {/* Clerk User Info */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Clerk User</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify({
            clerkUserId,
            email: clerkUser?.emailAddresses?.[0]?.emailAddress,
            name: clerkUser?.firstName + " " + clerkUser?.lastName,
          }, null, 2)}
        </pre>
      </div>

      {/* Database User Info */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Database User</h2>
        {dbUser ? (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(dbUser, null, 2)}
          </pre>
        ) : (
          <p className="text-red-500">❌ User not found in database!</p>
        )}
      </div>

      {/* User's Accounts */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Your Accounts ({accounts.length})</h2>
        {accounts.length > 0 ? (
          <div className="space-y-2">
            {accounts.map(acc => (
              <div key={acc.id} className="bg-gray-100 p-3 rounded">
                <p><strong>Name:</strong> {acc.name}</p>
                <p><strong>Type:</strong> {acc.type}</p>
                <p><strong>Balance:</strong> ${acc.balance.toString()}</p>
                <p><strong>Default:</strong> {acc.isDefault ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-yellow-600">⚠️ No accounts found for this user</p>
        )}
      </div>

      {/* All Users in Database */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">All Users in Database ({allUsers.length})</h2>
        <div className="space-y-4">
          {allUsers.map(user => (
            <div key={user.id} className="bg-gray-50 p-4 rounded border">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Clerk ID:</strong> {user.clerkUserId}</p>
              <p><strong>Accounts:</strong> {user.accounts.length}</p>
              {user.accounts.length > 0 && (
                <div className="ml-4 mt-2 space-y-1">
                  {user.accounts.map(acc => (
                    <p key={acc.id} className="text-sm">
                      • {acc.name} ({acc.type}) - ${acc.balance.toString()}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
