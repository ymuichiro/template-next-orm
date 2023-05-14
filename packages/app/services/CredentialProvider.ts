import prisma from '@/services/InitPrisma';
import CredentialsProvider, { CredentialInput, CredentialsConfig } from 'next-auth/providers/credentials';

async function generateCustomCredentialUser(name: string, image: string) {
  const user = await prisma.user.findUnique({ where: { email: `${name}@example.org` } });
  if (user) return user;

  const newUser = await prisma.user.create({ data: { email: `${name}@example.org`, name, image } });
  await prisma.account.create({
    data: {
      userId: newUser.id,
      providerAccountId: newUser.id,
      type: 'Credentials',
      provider: 'Credentials',
    },
  });
  return newUser;
}

interface CustomCredentialProviderResponse {
  name: string;
  credentialProvider: CredentialsConfig<Record<string, CredentialInput>>;
}

export default function CustomCredentialProvider(): CustomCredentialProviderResponse {
  const name: string = 'Credentials';
  const image: string = '/icons/icon-512-512.webp';
  const credentials: Record<string, CredentialInput> = {
    token: {
      label: 'token',
      type: 'text',
      placeholder: 'test user',
    },
  };

  const credentialProvider: CredentialsConfig<Record<string, CredentialInput>> = CredentialsProvider({
    name,
    credentials,
    async authorize(credentials) {
      if (credentials?.token === 'sample') {
        return await generateCustomCredentialUser('sample', image);
      }
      return null;
    },
  });

  return {
    name,
    credentialProvider,
  };
}
