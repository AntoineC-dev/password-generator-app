import type { PasswordOptions } from '../types';

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

const generatePool = (props: PasswordOptions['rules']) => {
  let pool = '';
  if (props.lowercase) pool += LOWERCASE_CHARS;
  if (props.uppercase) pool += UPPERCASE_CHARS;
  if (props.numbers) pool += NUMBERS;
  if (props.symbols) pool += SYMBOLS;
  return pool;
};

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

const getMinStrictLenght = (rules: PasswordOptions['rules']) => {
  return Object.values(rules).filter((rule) => rule).length;
};

export const generatePassword = (options: PasswordOptions) => {
  // Validate lenght
  if (options.length === 0) throw new Error("Password length can't be zero");

  // Validate min strict rules
  const minStrictLenght = getMinStrictLenght(options.rules);
  if (minStrictLenght === 0) throw new Error('You must select at least one rule');
  if (minStrictLenght > options.length)
    throw new Error('Password length must at least be equal to the number of checked rules');

  // Generate pool
  const pool = generatePool(options.rules);

  // Generate password
  const password = generateStrictPassword(options, pool);
  return password;
};
