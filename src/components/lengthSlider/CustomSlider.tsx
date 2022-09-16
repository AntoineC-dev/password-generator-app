import { Component, ComponentProps, createMemo } from 'solid-js';

import styles from './CustomSlider.module.css';

type CustomSliderProps = Omit<ComponentProps<'input'>, 'type' | 'class' | 'style'>;

const CustomSlider: Component<CustomSliderProps> = (props: CustomSliderProps) => {
  const gradientStop = createMemo(() => Math.floor((+props.value! / +props.max!) * 100));
  return <input type="range" class={styles.input} style={{ '--gradient-stop': `${gradientStop()}%` }} {...props} />;
};

export default CustomSlider;
