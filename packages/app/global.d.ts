/**
 * declare of environment variables
 */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly OAUTH_GITHUB_CLIENT_ID: string;
    readonly OAUTH_GITHUB_CLIENT_SECRET: string;
    readonly NEXTAUTH_SECRET: string;
    readonly NEXTAUTH_URL: string;
    readonly TZ: string;
  }
}
