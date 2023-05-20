import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { UrlObject } from 'url';

export interface LinkProps {
  href: string | UrlObject;
  children: React.ReactNode;
  target?: '_blank' | '_self' | '_parent' | '_top';
  style?: React.CSSProperties;
}

export function Link(props: LinkProps): JSX.Element {
  return (
    <NextLink
      href={props.href}
      passHref
      target={props.target}
      rel={props.target ? 'noopener noreferrer' : undefined}
      style={{ ...props.style, textDecoration: 'none' }}
    >
      <MuiLink component={'span'}>{props.children}</MuiLink>
    </NextLink>
  );
}
