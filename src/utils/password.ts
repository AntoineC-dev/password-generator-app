import type { PasswordOptions, PasswordStrenght } from '../types';

/**
 *
 * GENERAL RULES !!!
 *
 * Password lenght must be >= 1
 * Password must have at least 1 rule
 * Password lenght must be >= to the number of rules
 * Password must have at least 1 character type of each rule
 *
 **/

const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';

interface StrictRule {
  name: keyof PasswordOptions['rules'];
  regexp: RegExp;
}

const STRICT_RULES: StrictRule[] = [
  { name: 'lowercase', regexp: /[a-z]/ },
  { name: 'uppercase', regexp: /[A-Z]/ },
  { name: 'numbers', regexp: /[0-9]/ },
  { name: 'symbols', regexp: /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/ },
];

const generateRandomIndexes = (length: PasswordOptions['length'], pool: string) => {
  let indexes: number[] = [];
  while (indexes.length < length) {
    const index = Math.floor(Math.random() * pool.length);
    if (indexes.indexOf(index) === -1) indexes.push(index);
  }
  return indexes;
};

const generateStrictPassword = (options: PasswordOptions, pool: string): string => {
  // Generate unique indexes
  const indexes = generateRandomIndexes(options.length, pool);

  // Generate password
  let password = '';
  for (let i = 0; i < indexes.length; i++) {
    password += pool[indexes[i]];
  }

  // Check if password follows all rules
  const isStrict = STRICT_RULES.every((rule) => {
    if (!options.rules[rule.name]) return true;
    return rule.regexp.test(password);
  });

  // If not strict calls itself recursively
  if (!isStrict) return generateStrictPassword(options, pool);

  return password;
};

export const generatePassword = (options: PasswordOptions) => {
  let pool = '';
  if (options.rules.lowercase) pool += LOWERCASE_CHARS;
  if (options.rules.uppercase) pool += UPPERCASE_CHARS;
  if (options.rules.numbers) pool += NUMBERS;
  if (options.rules.symbols) pool += SYMBOLS;

  // Generate password
  const password = generateStrictPassword(options, pool);
  return password;
};

/**
 * PASSWORD STRENGHT
 *
 * Too Weak! => length < 6 || rules count < 2
 * Weak => length < 8 || rules count < 3
 * Medium => length < 12 || rules count < 4
 * STRONG => lenght > 12 && rules count === 4
 */

const getMinStrictLenght = (rules: PasswordOptions['rules']) => {
  return Object.values(rules).filter((rule) => rule).length;
};

const getPasswordErrorMsg = (length: PasswordOptions['length'], minStrictLenght: number) => {
  if (length === 0) return "Password length can't be zero";
  if (minStrictLenght === 0) return 'You must select at least one rule';
  if (minStrictLenght > length) return 'Password length must correlate with number of rules';
  return undefined;
};

const checkPasswordStrength = (length: PasswordOptions['length'], minStrictLenght: number) => {
  if (!length || !minStrictLenght) return 0;
  if (length < 6 || minStrictLenght < 2) return 1;
  if (length < 8 || minStrictLenght < 3) return 2;
  if (length < 12 || minStrictLenght < 4) return 3;
  return 4;
};

export const checkOptionsValidity = (options: PasswordOptions) => {
  const minStrictLength = getMinStrictLenght(options.rules);
  const strength = checkPasswordStrength(options.length, minStrictLength) as PasswordStrenght;
  const errorMsg = getPasswordErrorMsg(options.length, minStrictLength);
  return { strength, errorMsg };
};

export const displayPasswordStrength = (current: PasswordStrenght) => {
  switch (current) {
    case 1:
      return 'too weak!';
    case 2:
      return 'weak';
    case 3:
      return 'medium';
    default:
      return 'strong';
  }
};
