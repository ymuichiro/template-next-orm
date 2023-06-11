import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { ChangeEvent, useState } from 'react';

interface P {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | never[];
  onClickProvider: (providerId: string) => Promise<void>;
  onClickCustomProvider: (providerId: string, email: string, password: string) => Promise<void>;
}

interface P2 {
  provider: ClientSafeProvider;
  onClickProvider: (providerId: string) => Promise<void>;
  onClickCustomProvider: (providerId: string, email: string, password: string) => Promise<void>;
}

function ProviderListItem(props: P2): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.currentTarget.value);
  };

  if (props.provider.name === 'Credentials') {
    return (
      <form
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '0.8rem' }}
        onSubmit={(e) => {
          e.preventDefault();
          [setEmail, setPassword].map((fn) => fn(''));
          props.onClickCustomProvider(props.provider.id, email, password);
        }}
      >
        <Divider />
        <TextField
          variant='outlined'
          type='text'
          size='small'
          label='email'
          placeholder='email'
          value={email}
          onChange={handleOnChangeEmail}
        />
        <TextField
          variant='outlined'
          type='password'
          size='small'
          label='password'
          placeholder='password'
          value={password}
          onChange={handleOnChangePassword}
        />
        <Button
          type='submit'
          key={props.provider.id}
          fullWidth
          style={{ justifyContent: 'flex-start' }}
          color='secondary'
        >
          Sign in with Email
        </Button>
      </form>
    );
  }
  return (
    <Button
      key={props.provider.id}
      fullWidth
      style={{ justifyContent: 'flex-start' }}
      color='secondary'
      onClick={() => props.onClickProvider(props.provider.id)}
    >{`Sign in with ${props.provider.name}`}</Button>
  );
}

export default function ProviderList(props: P): JSX.Element {
  return (
    <>
      {Object.values(props.providers).map((provider) => {
        return (
          <ProviderListItem
            key={provider.id}
            provider={provider}
            onClickProvider={props.onClickProvider}
            onClickCustomProvider={props.onClickCustomProvider}
          />
        );
      })}
    </>
  );
}
