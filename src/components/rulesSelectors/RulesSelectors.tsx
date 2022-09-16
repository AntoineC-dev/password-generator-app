import { Component, For } from 'solid-js';
import { rules } from '../../types';
import { setStoreRule } from '../../stores/password';

import styles from './RulesSelectors.module.css';

const RulesSelectors: Component = () => {
  return (
    <div class={styles.container}>
      <For each={rules}>
        {(rule) => (
          <div class={styles.rule}>
            <input
              type="checkbox"
              class={styles.checkbox}
              id={`${rule}-rule`}
              onChange={(e) => setStoreRule(rule, e.currentTarget.checked)}
            />
            <label for={`${rule}-rule`} class={styles.label}>
              {rule === 'lowercase' || rule === 'uppercase' ? `Include ${rule} letters` : `include ${rule}`}
            </label>
          </div>
        )}
      </For>
    </div>
  );
};

export default RulesSelectors;
