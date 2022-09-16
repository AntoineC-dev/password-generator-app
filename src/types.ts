export const rules = ['uppercase', 'lowercase', 'numbers', 'symbols'] as const;
export type RuleKey = typeof rules[number];

export interface PasswordOptions {
  length: number;
  rules: {
    [key in RuleKey]?: boolean;
  };
}

export const passwordStrenghts = [0, 1, 2, 3, 4] as const;
export type PasswordStrenght = typeof passwordStrenghts[number];

export interface PasswordStore extends PasswordOptions {
  password: {
    value: string;
    copied: boolean;
    strength: PasswordStrenght;
  };
  errorMsg?: string;
}
