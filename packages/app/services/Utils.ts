import bcrypt from 'bcrypt';

export namespace Utils {
  export function textToEncryptHash(input: string): string {
    return bcrypt.hashSync(input, 10);
  }

  export function compareToEncryptedHash(input: string, hash: string): boolean {
    return bcrypt.compareSync(input, hash);
  }
}
