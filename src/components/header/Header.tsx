import { Component } from 'solid-js';

import styles from './Header.module.css';

interface HeaderProps {
  title: string;
}

const Header: Component<HeaderProps> = (props: HeaderProps) => {
  return (
    <header class={styles.container}>
      <h1>{props.title}</h1>
    </header>
  );
};

export default Header;
