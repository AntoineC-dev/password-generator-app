import { Component, ComponentProps } from 'solid-js';

import styles from './CustomCheckbox.module.css';

type CustomCheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'class' | 'style'>;
const CustomCheckbox: Component<CustomCheckboxProps> = (props: CustomCheckboxProps) => {
  return <input type="checkbox" class={styles.checkbox} {...props} />;
};

export default CustomCheckbox;
