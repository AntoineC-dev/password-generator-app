import { Component, createMemo } from 'solid-js';
import store, { copyPasswordToClipboard } from '../../stores/password';

import styles from './Display.module.css';

const Display: Component = () => {
  const empty = createMemo(() => store.password.value.length === 0);
  return (
    <div class={styles.container}>
      <span classList={{ [styles.password]: true, [styles.empty]: empty() }}>
        {store.password.value || 'P4$5W0rD!'}
      </span>
      <button
        aria-disabled={empty()}
        onClick={copyPasswordToClipboard}
        classList={{ tooltip: true, [styles.copy]: true, [styles.copied]: store.password.copied }}>
        <span class="sr-only">Copy password to clipboard</span>
        <span class={`${styles.copytxt} uppercase`}>Copied</span>
        <svg class={styles.copysvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 24">
          <path
            d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281h4.97v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};

export default Display;
