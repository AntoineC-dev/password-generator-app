import { Component, ComponentProps, createMemo, For } from 'solid-js';
import { passwordStrenght, passwordStrenghts } from '../../types';
import store from '../../stores/password';

import styles from './StrengthMeter.module.css';

type StengthMeterProps = Omit<ComponentProps<'div'>, 'class' | 'style'>;

const StengthMeter: Component<StengthMeterProps> = (props: StengthMeterProps) => {
  const currentStrength = createMemo(() => passwordStrenghts.findIndex((val) => val === store.password.strength) + 1);
  return (
    <div class={styles.bars} style={{ '--current-color': `var(--clr-strength-${currentStrength()})` }} {...props}>
      <For each={passwordStrenghts}>
        {(_, index) => <span classList={{ [styles.active]: index() < currentStrength() }}></span>}
      </For>
    </div>
  );
};

export default StengthMeter;
