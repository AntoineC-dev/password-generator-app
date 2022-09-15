export const rules = ['uppercase', 'lowercase', 'numbers', 'symbols'] as const;
export type RuleKey = typeof rules[number];

export interface PasswordOptions {
  length: number;
  rules: {
    [key in RuleKey]?: boolean;
  };
}

export interface PasswordStore extends PasswordOptions {
  password: {
    value: string;
    copied: boolean;
  };
}
