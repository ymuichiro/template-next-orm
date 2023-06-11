import crypto from 'crypto';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const nonce = crypto.randomBytes(128).toString('base64');
  const unsafeEval = process.env.NODE_ENV === 'production' ? '' : " 'unsafe-eval' ";
  let csp: string = '';
  csp += "default-src 'self';";
  csp += "object-src 'none';";
  csp += `script-src 'self' 'nonce-${nonce}' ${unsafeEval} 'strict-dynamic' https: http:;`;
  csp += "style-src 'self' 'unsafe-inline';";

  return (
    <Html lang='en'>
      <Head nonce={nonce}>
        <meta httpEquiv='Content-Security-Policy' content={csp} />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
}
