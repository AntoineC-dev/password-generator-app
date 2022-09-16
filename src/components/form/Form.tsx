import { Component, For } from 'solid-js';
import store, { setStoreLength, setStorePassword, setStoreRule } from '../../stores/password';
import { rules } from '../../types';

import CustomCheckbox from './CustomCheckbox';
import CustomSlider from './CustomSlider';
import StrengthMeter from './StrengthMeter';

import styles from './Form.module.css';

const Form: Component = () => {
  const onSubmit = (e: Event) => {
    e.preventDefault();
    setStorePassword();
  };

  return (
    <form class={styles.form} onSubmit={onSubmit}>
      <div class={styles.charlength}>
        <label for="char-length">Character Length</label>
        <span>{store.length}</span>
        <CustomSlider
          id="char-length"
          min={0}
          max={20}
          step={1}
          value={store.length}
          onInput={(e) => setStoreLength(e.currentTarget.valueAsNumber)}
        />
      </div>
      <div class={styles.rules}>
        <For each={rules}>
          {(rule) => (
            <div class={styles.rule}>
              <CustomCheckbox id={`${rule}-rule`} onChange={(e) => setStoreRule(rule, e.currentTarget.checked)} />
              <label for={`${rule}-rule`}>
                {rule === 'lowercase' || rule === 'uppercase' ? `Include ${rule} letters` : `include ${rule}`}
              </label>
            </div>
          )}
        </For>
      </div>
      <StrengthMeter />
      <button class={styles.generate} data-tooltip={store.errorMsg} aria-disabled={!!store.errorMsg}>
        <span>Generate</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
          <path fill="currentColor" d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" />
        </svg>
      </button>
    </form>
  );
};

export default Form;
