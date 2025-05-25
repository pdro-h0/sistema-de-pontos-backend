export interface IPasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, passwordHashed: string): Promise<boolean>;
}
