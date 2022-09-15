import { Component } from 'solid-js';
import store, { setStoreLength } from '../../stores/password';

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
          name="char-length"
          min={0}
          max={20}
          step={1}
          value={store.length}
          onInput={(e) => setStoreLength(e.currentTarget.valueAsNumber)}
        />
      </div>
    </form>
  );
};

export default Form;
