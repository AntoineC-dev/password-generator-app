import { Component } from 'solid-js';
import { Display, Form, Header, Toast } from './components';

import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.container}>
      <Header title="Password Generator" />
      <main>
        <Display />
        <Form />
      </main>
      <Toast />
    </div>
  );
};

export default App;
