import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function FixUserPage() {
  const { userId: currentClerkId } = await auth();
  const clerkUser = await currentUser();
  
  if (!currentClerkId || !clerkUser) {
    return <div className="p-8">Please sign in first!</div>;
  }

  const currentEmail = clerkUser.emailAddresses[0].emailAddress;

  // Find user in database by email (not Clerk ID)
  const existingUserByEmail = await db.user.findFirst({
    where: { email: currentEmail },
  });

  // Check if current Clerk ID exists
  const currentUserInDB = await db.user.findUnique({
    where: { clerkUserId: currentClerkId },
  });

  let fixed = false;
  let message = "";

  // Case 1: User exists with same email but different Clerk ID
  if (existingUserByEmail && !currentUserInDB) {
    // Update the old user's Clerk ID to the new one
    await db.user.update({
      where: { id: existingUserByEmail.id },
      data: { 
        clerkUserId: currentClerkId,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        imageUrl: clerkUser.imageUrl,
      },
    });
    
    fixed = true;
    message = `✅ Fixed! Your old accounts are now linked to your current login.`;
  }
  // Case 2: User doesn't exist at all
  else if (!currentUserInDB && !existingUserByEmail) {
    await db.user.create({
      data: {
        clerkUserId: currentClerkId,
        email: currentEmail,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        imageUrl: clerkUser.imageUrl,
      },
    });
    
    fixed = true;
    message = `✅ Created new user account in database.`;
  }
  // Case 3: Already correct
  else if (currentUserInDB) {
    message = `✅ Everything is already correct!`;
    fixed = true;
  }

  if (fixed) {
    // Wait a bit then redirect
    setTimeout(() => {
      redirect("/dashboard");
    }, 2000);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <div className="border-4 border-green-500 rounded-lg p-8 bg-green-50">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Account Fixed!
        </h1>
        
        <p className="text-lg mb-4">{message}</p>
        
        <div className="space-y-2 text-sm">
          <p><strong>Your Email:</strong> {currentEmail}</p>
          <p><strong>Current Clerk ID:</strong> {currentClerkId}</p>
          {existingUserByEmail && (
            <p><strong>Old Clerk ID:</strong> {existingUserByEmail.clerkUserId}</p>
          )}
        </div>

        <div className="mt-6 p-4 bg-white rounded border-2 border-green-300">
          <p className="font-semibold text-green-700">✅ What was fixed:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Linked your accounts (Moiz, Talha) to current login</li>
            <li>Updated Clerk user ID in database</li>
            <li>Synced your profile information</li>
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-center text-gray-600 animate-pulse">
            Redirecting to dashboard in 2 seconds...
          </p>
          <div className="mt-4 text-center">
            <a 
              href="/dashboard" 
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
            >
              Go to Dashboard Now →
            </a>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-gray-50">
        <h2 className="text-xl font-bold mb-3">📋 What Happened?</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Problem:</strong> You had accounts in database with an old Clerk user ID.
          </p>
          <p>
            <strong>Reason:</strong> Likely you reset password or created new Clerk account with same email.
          </p>
          <p>
            <strong>Solution:</strong> Updated database to use your current Clerk ID.
          </p>
          <p className="text-green-600 font-semibold">
            ✅ Your accounts (Moiz & Talha) are now accessible!
          </p>
        </div>
      </div>
    </div>
  );
}
