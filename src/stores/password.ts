import { createStore, produce } from 'solid-js/store';
import type { PasswordStore, RuleKey } from '../types';
import { checkOptionsValidity, generatePassword } from '../utils/password';
import notify from 'solid-toast';

const [store, setStore] = createStore<PasswordStore>({
  password: { value: '', copied: false, strength: 0 },
  length: 0,
  rules: {},
});

export default store;

export const setStoreLength = (value: number) =>
  setStore(
    produce((store) => {
      const { strength, errorMsg } = checkOptionsValidity({ length: value, rules: store.rules });
      store.length = value;
      store.password.strength = strength;
      store.errorMsg = errorMsg;
    })
  );

export const setStoreRule = (key: RuleKey, value: boolean) =>
  setStore(
    produce((store) => {
      let newRules = store.rules;
      newRules[key] = value;
      const { errorMsg, strength } = checkOptionsValidity({ length: store.length, rules: newRules });
      store.rules[key] = value;
      store.password.strength = strength;
      store.errorMsg = errorMsg;
    })
  );

export const setStorePassword = () =>
  setStore(
    produce((store) => {
      const { errorMsg } = checkOptionsValidity({ length: store.length, rules: store.rules });
      if (errorMsg) {
        notify.error(errorMsg);
      } else {
        const password = generatePassword({ length: store.length, rules: store.rules });
        store.password.value = password;
      }
    })
  );
