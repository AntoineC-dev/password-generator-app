export interface PasswordOptions {
  length: number;
  rules: {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  };
}

export interface PasswordStore extends PasswordOptions {
  password: {
    value: string;
    copied: boolean;
  };
}
