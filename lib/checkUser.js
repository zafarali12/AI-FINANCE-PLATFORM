import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    // Fast check: get the user ID from the JWT token (no network request to Clerk API)
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    // Fast check: see if the user is already in our database
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // IF completely new user to our DB, only then make the network request to Clerk API
    const user = await currentUser();

    if (!user) {
      return null;
    }

    // Prepare user details
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      console.error("No email address found for user");
      return null;
    }

    // Check if user exists by email (happens if Clerk account gets recreated)
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      // Update orphaned user with new Clerk ID
      const updatedUser = await db.user.update({
        where: { email },
        data: {
          clerkUserId: user.id,
          name: name || existingUserByEmail.name,
          imageUrl: user.imageUrl || existingUserByEmail.imageUrl,
        },
      });
      return updatedUser;
    }

    // Create fresh user
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
      },
    });

    return newUser;
  } catch (error) {
    // Next.js uses this specific error to switch to dynamic rendering at build time.
    // If we catch it, it causes the warning logs on Vercel. We must rethrow it.
    if (
      error.message?.includes("Dynamic server usage") ||
      error.message?.includes("couldn't be rendered statically") ||
      error.digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw error;
    }

    console.error("Error in checkUser:", error.message);

    // If there was a race condition creating the user, try fetching them again
    if (error.code === "P2002") {
      try {
        const { userId } = await auth();
        if (userId) {
          const retryUser = await db.user.findUnique({
            where: { clerkUserId: userId },
          });
          if (retryUser) return retryUser;
        }
      } catch (retryError) {
        console.error("Retry fetch failed:", retryError.message);
      }
    }

    return null;
  }
};



