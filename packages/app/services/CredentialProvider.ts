import { prisma } from '@/services/InitPrisma';
import { Logger } from '@/services/Logger';
import { Utils } from '@/services/Utils';
import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';
import CredentialsProvider, { CredentialInput, CredentialsConfig } from 'next-auth/providers/credentials';

const CREDENTIAL_NAME: 'Credentials' = 'Credentials';
type CustomCredentialInput = Record<'email' | 'password', CredentialInput>;
const DEFAULT_USER_PROFILE: string = '/icons/icon-512-512.webp';

interface CustomCredentialProviderResponse {
  name: string;
  credentialProvider: CredentialsConfig<CustomCredentialInput>;
}

export async function createDefaultCustomCredentialUser(
  _prisma: PrismaClient,
  email: string,
  password: string
): Promise<User> {
  const user = await _prisma.user.findUnique({ where: { email } });

  if (user) {
    Logger._info('Specified user already exists');
    return user;
  }

  const newUser: User = await _prisma.user.create({
    data: {
      name: 'admin',
      email,
      image: DEFAULT_USER_PROFILE,
      customCredentialPassword: { create: { password: Utils.textToEncryptHash(password) } },
    },
  });
  await _prisma.account.create({
    data: {
      userId: newUser.id,
      providerAccountId: newUser.id,
      type: CREDENTIAL_NAME,
      provider: CREDENTIAL_NAME,
    },
  });
  Logger._info('Created new user');
  return newUser;
}

export async function createNewCustomCredentialUser(name: string, email: string, password: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    Logger._info('Specified user already exists');
    return user;
  }

  const newUser: User = await prisma.user.create({
    data: {
      name,
      email,
      image: DEFAULT_USER_PROFILE,
      customCredentialPassword: { create: { password } },
    },
  });
  await prisma.account.create({
    data: {
      userId: newUser.id,
      providerAccountId: newUser.id,
      type: CREDENTIAL_NAME,
      provider: CREDENTIAL_NAME,
    },
  });
  Logger._info('Created new user');
  return newUser;
}

export default function CustomCredentialProvider(): CustomCredentialProviderResponse {
  return {
    name: CREDENTIAL_NAME,
    credentialProvider: CredentialsProvider<CustomCredentialInput>({
      name: CREDENTIAL_NAME,
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'password',
        },
      },
      authorize: async (credentials): Promise<User | null> => {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            customCredentialPassword: true,
          },
        });
        if (user === null || !user.customCredentialPassword) return null;
        if (!Utils.compareToEncryptedHash(credentials.password, user.customCredentialPassword.password)) return null;
        return user;
      },
    }),
  };
}
