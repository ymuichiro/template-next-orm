import CustomCredentialProvider from '@/services/CredentialProvider';
import { prisma } from '@/services/InitPrisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Cookies from 'cookies';
import { randomUUID } from 'crypto';
import NextAuth, { type AuthOptions, type ISODateString } from 'next-auth';
import type { OAuthConfig } from 'next-auth/providers';
import GithubProvider, { type GithubProfile } from 'next-auth/providers/github';
import type { NextApiRequest, NextApiResponse } from 'next/types';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: ISODateString;
  }
}

const prismaAdapter = PrismaAdapter(prisma);
const customCredentialProvider = CustomCredentialProvider();
const githubProvider: OAuthConfig<GithubProfile> = GithubProvider({
  clientId: process.env.OAUTH_GITHUB_CLIENT_ID,
  clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
});

export const authOptions: AuthOptions = {
  providers: [githubProvider, customCredentialProvider.credentialProvider],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signOut',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: prismaAdapter,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    ...authOptions,
    callbacks: {
      ...authOptions.callbacks,
      signIn: async ({ user }) => {
        if (
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth.includes('Credentials') &&
          req.method === 'POST'
        ) {
          if (user) {
            const expiresDate = Date.now();
            const sessionToken = randomUUID();
            const expires = new Date(expiresDate + 1000 * 60 * 60 * 3);
            await prismaAdapter.createSession({ sessionToken, userId: user.id, expires });
            const cookies = new Cookies(req, res);
            cookies.set('next-auth.session-token', sessionToken, { expires });
          }
        }
        return true;
      },
    },
  });
}
