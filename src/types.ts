export interface PasswordOptions {
  length: number;
  rules: {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  };
}
