import { Component } from 'solid-js';
import store, { setStoreLength } from '../../stores/password';

import CustomSlider from './CustomSlider';

import styles from './LengthSlider.module.css';

const LengthSlider: Component = () => {
  return (
    <div class={styles.container}>
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
  );
};

export default LengthSlider;
