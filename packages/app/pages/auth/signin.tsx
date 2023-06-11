import AppLogo from '@/assets/logo/white.png';
import { paths } from '@/services/Navigaion';
import ProviderList from '@/stories/molecules/ProviderList';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types';

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleSignin = async (providerId: string): Promise<void> => {
    const res = await signIn(providerId, { redirect: false });
    if (res && res.ok) {
      router.push(paths.root.index.href);
    } else {
      alert('incorrect value');
    }
  };

  const handleCustomProviderSignin = async (providerId: string, email: string, password: string): Promise<void> => {
    console.log(email, password);

    const res = await signIn(providerId, { redirect: false, email, password });
    if (res && res.ok) {
      router.push(paths.root.index.href);
    } else {
      alert('incorrect value');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70svh',
        flexDirection: 'column',
        marginTop: '10svh',
        gap: '3rem',
      }}
    >
      <Fade in={true} timeout={{ enter: 3000 }}>
        <Image src={AppLogo} alt='Application Logo' width={200} height={200} style={{ borderRadius: '100%' }} />
      </Fade>
      {
        <Card elevation={1} style={{ width: '90%', maxWidth: '250px' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Typography variant='h6' align='center'>
              SignIn
            </Typography>
            <Divider style={{ width: '100%' }} />
            <ProviderList
              providers={providers}
              onClickProvider={handleSignin}
              onClickCustomProvider={handleCustomProviderSignin}
            />
          </CardContent>
        </Card>
      }
    </div>
  );
}

export async function getServerSideProps(_: GetServerSidePropsContext) {
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
