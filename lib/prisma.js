import { PrismaClient } from "@prisma/client";

let prisma;

// Reuse Prisma Client across hot reloads in development
if (!globalThis.prisma) {
  prisma = new PrismaClient(); // no url/directUrl in constructor
  if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
  }
} else {
  prisma = globalThis.prisma;
}

// Named export for checkUser.js
export const db = prisma;
