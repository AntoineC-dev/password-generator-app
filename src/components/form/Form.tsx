import { Component, For, Show } from 'solid-js';
import store, { setStoreLength, setStoreRule } from '../../stores/password';
import { rules } from '../../types';

import CustomCheckbox from './CustomCheckbox';
import CustomSlider from './CustomSlider';
import StrengthMeter from './StrengthMeter';

import styles from './Form.module.css';
import { displayPasswordStrength } from '../../utils/password';

const Form: Component = () => {
  return (
    <form class={styles.form}>
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
    </form>
  );
};

export default Form;
