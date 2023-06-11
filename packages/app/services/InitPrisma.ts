import { createDefaultCustomCredentialUser } from '@/services/CredentialProvider';
import { PrismaClient } from '@prisma/client';

if (process.env.NEXT_IS_BUILDING !== 'TRUE') {
  if (!process.env.OAUTH_GITHUB_CLIENT_ID) {
    throw new Error('OAUTH_GITHUB_CLIENT_ID is not defined');
  }
  if (!process.env.OAUTH_GITHUB_CLIENT_SECRET) {
    throw new Error('OAUTH_GITHUB_CLIENT_SECRET is not defined');
  }
  if (!process.env.OAUTH_GITHUB_CLIENT_ID) {
    throw new Error('OAUTH_GITHUB_CLIENT_ID is not defined');
  }
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET is not defined');
  }
  if (!process.env.NEXTAUTH_URL) {
    throw new Error('NEXTAUTH_URL is not defined');
  }
  if (!process.env.ACCOUNT_ADMIN_EMAIL) {
    throw new Error('OAUTH_GITHUB_CLIENT_ID is not defined');
  }
  if (!process.env.ACCOUNT_ADMIN_PASSWORD) {
    throw new Error('ACCOUNT_ADMIN_PASSWORD is not defined');
  }
}

declare global {
  var _prisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NEXT_IS_BUILDING !== 'TRUE') {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
    createDefaultCustomCredentialUser(prisma, process.env.ACCOUNT_ADMIN_EMAIL, process.env.ACCOUNT_ADMIN_PASSWORD);
  } else {
    if (!global._prisma) {
      global._prisma = new PrismaClient();
      createDefaultCustomCredentialUser(
        global._prisma,
        process.env.ACCOUNT_ADMIN_EMAIL,
        process.env.ACCOUNT_ADMIN_PASSWORD
      );
    }
    prisma = global._prisma;
  }
}

export { prisma };
