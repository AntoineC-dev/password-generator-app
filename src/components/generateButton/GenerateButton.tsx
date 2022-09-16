import { Component } from 'solid-js';
import store from '../../stores/password';

import styles from './GenerateButton.module.css';

const GenerateButton: Component = () => {
  return (
    <button
      classList={{ [styles.generate]: true, tooltip: true }}
      data-tooltip={store.errorMsg}
      aria-disabled={!!store.errorMsg}>
      <span>Generate</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
        <path fill="currentColor" d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" />
      </svg>
    </button>
  );
};

export default GenerateButton;
