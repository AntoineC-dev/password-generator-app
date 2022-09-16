import { createStore, produce } from 'solid-js/store';
import type { PasswordStore, RuleKey } from '../types';
import { generatePassword } from '../utils/password';
import notify from 'solid-toast';
import { formatErrorMessage } from '../utils/errors';

/**
 * PASSWORD STRENGHT
 *
 * Too Weak! => length < 6 || rules count < 2
 * Weak => length < 8 || rules count < 3
 * Medium => length < 12 || rules count < 4
 * STRONG => lenght > 12 && rules count === 4
 */

const [store, setStore] = createStore<PasswordStore>({
  password: { value: '', copied: false, strength: 0 },
  length: 0,
  rules: {},
});

export default store;

const checkPasswordStrength = (length: number, rules: PasswordStore['rules']) => {
  const nbOfRules = Object.values(rules).filter((rule) => rule).length;
  if (!length || !nbOfRules) return 0;
  if (length < 6 || nbOfRules < 2) return 1;
  if (length < 8 || nbOfRules < 3) return 2;
  if (length < 12 || nbOfRules < 4) return 3;
  return 4;
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

export const setStorePassword = () =>
  setStore(
    produce((store) => {
      try {
        const password = generatePassword({ length: store.length, rules: store.rules });
        store.password.value = password;
      } catch (error) {
        notify.error(formatErrorMessage(error));
      }
    })
  );
