import { Component, ComponentProps, createMemo, For } from 'solid-js';
import { passwordStrenght, passwordStrenghts } from '../../types';
import store from '../../stores/password';

import styles from './StrengthMeter.module.css';

type StengthMeterProps = Omit<ComponentProps<'div'>, 'class' | 'style'>;

const StengthMeter: Component<StengthMeterProps> = (props: StengthMeterProps) => {
  return (
    <div class={styles.bars} style={{ '--current-color': `var(--clr-strength-${store.password.strength})` }} {...props}>
      <For each={passwordStrenghts.slice(1)}>
        {(_, index) => <span classList={{ [styles.active]: index() < store.password.strength }}></span>}
      </For>
    </div>
  );
};

export default StengthMeter;
