import { Component } from 'solid-js';
import { Display, Header } from './components';

import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.container}>
      <Header title="Password Generator" />
      <Display password="" />
    </div>
  );
};

export default App;
