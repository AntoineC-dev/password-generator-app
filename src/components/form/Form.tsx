import { Component, createSignal } from 'solid-js';

import CustomSlider from './CustomSlider';

import styles from './Form.module.css';

const Form: Component = () => {
  const [length, setLength] = createSignal(0);
  return (
    <form class={styles.form}>
      <div class={styles.charlength}>
        <label for="char-length">Character Length</label>
        <span>{length()}</span>
        <CustomSlider
          id="char-length"
          name="char-length"
          min={0}
          max={20}
          step={1}
          value={length()}
          onInput={(e) => setLength(e.currentTarget.valueAsNumber)}
        />
      </div>
    </form>
  );
};

export default Form;
