import { Component, ComponentProps, createMemo, For, Show } from 'solid-js';
import { passwordStrenghts } from '../../types';
import { displayPasswordStrength } from '../../utils/password';
import store from '../../stores/password';

import styles from './StrengthMeter.module.css';

type StengthMeterProps = Omit<ComponentProps<'div'>, 'class' | 'style'>;

const StengthMeter: Component<StengthMeterProps> = (props: StengthMeterProps) => {
  return (
    <div class={styles.container}>
      <span class={styles.label}>Strength</span>
      <Show when={store.password.strength !== 0}>
        <span class={styles.strengthLabel}>{displayPasswordStrength(store.password.strength)}</span>
      </Show>
      <div
        class={styles.bars}
        style={{ '--current-color': `var(--clr-strength-${store.password.strength})` }}
        {...props}>
        <For each={passwordStrenghts.slice(1)}>
          {(_, index) => <span classList={{ [styles.active]: index() < store.password.strength }}></span>}
        </For>
      </div>
    </div>
  );
};

export default StengthMeter;
