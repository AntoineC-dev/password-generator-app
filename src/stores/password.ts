import { createStore } from 'solid-js/store';
import type { PasswordStore, RuleKey } from '../types';

const [store, setStore] = createStore<PasswordStore>({
  password: { value: '', copied: false },
  length: 0,
  rules: {},
});

export default store;

export const setStoreLength = (value: number) => setStore('length', value);

export const setStoreRule = (key: RuleKey, value: boolean) => setStore('rules', key, value);

// setStore((prev) => {
//   const rulesCount = Object.values(prev.rules).filter((rule) => rule).length;
//   return rulesCount > prev.length ? { length: rulesCount, [key]: value } : { [key]: value };
// });
