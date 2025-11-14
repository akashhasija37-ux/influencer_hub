import { PrismaClient } from '@prisma/client';

// This creates a single, global instance of the Prisma Client.
// This prevents your app from creating too many connections to the database.

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: Logs all queries to the console
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;