import { createStore, produce } from 'solid-js/store';
import type { PasswordStore, RuleKey } from '../types';

/**
 * PASSWORD STRENGHT
 *
 * Weak => length >= 6 && rules.length >= 2
 * Medium => 8 <= length < 12 && 3 <= rules.length <= 4
 * STRONG => lenght >=12 && rules.length === 4
 */

const [store, setStore] = createStore<PasswordStore>({
  password: { value: '', copied: false },
  length: 0,
  rules: {},
});

export default store;

const checkPasswordStrength = (length: number, rules: PasswordStore['rules']) => {
  const nbOfRules = Object.values(rules).filter((rule) => rule).length;
  if (length < 6 || nbOfRules < 2) return 'too weak!';
  if (length < 8 || nbOfRules < 3) return 'weak';
  if (length < 12 || nbOfRules < 4) return 'medium';
  return 'strong';
};

export const setStoreLength = (value: number) =>
  setStore(
    produce((store) => {
      const strength = checkPasswordStrength(value, store.rules);
      store.length = value;
      store.password.strength = strength;
    })
  );

export const setStoreRule = (key: RuleKey, value: boolean) =>
  setStore(
    produce((store) => {
      let newRules = store.rules;
      newRules[key] = value;
      const strength = checkPasswordStrength(store.length, newRules);
      store.rules[key] = value;
      store.password.strength = strength;
    })
  );
