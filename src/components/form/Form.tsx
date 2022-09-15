import { Component, For, Show } from 'solid-js';
import store, { setStoreLength, setStoreRule } from '../../stores/password';
import { rules } from '../../types';

import CustomCheckbox from './CustomCheckbox';
import CustomSlider from './CustomSlider';

import styles from './Form.module.css';

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
      <div class={styles.strength}>
        <span>Strength</span>
        <Show when={store.password.strength}>
          <span>{store.password.strength}</span>
        </Show>
        <div data-strength={store.password.strength} class={styles.strengthBars}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </form>
  );
};

export default Form;
