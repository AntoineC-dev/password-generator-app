import { Component } from 'solid-js';
import { Display, Form, Header } from './components';

import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.container}>
      <Header title="Password Generator" />
      <main>
        <Display />
        <Form />
      </main>
    </div>
  );
};

export default App;
