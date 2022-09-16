import { Component } from 'solid-js';
import { setStorePassword } from './stores/password';

import { Display, GenerateButton, Header, LengthSlider, RulesSelectors, StrengthMeter, Toast } from './components';

import styles from './App.module.css';

const App: Component = () => {
  const onSubmit = (e: Event) => {
    e.preventDefault();
    setStorePassword();
  };
  return (
    <div class={styles.container}>
      <Header title="Password Generator" />
      <main class={styles.main}>
        <Display />
        <form class={styles.form} onSubmit={onSubmit}>
          <LengthSlider />
          <RulesSelectors />
          <StrengthMeter />
          <GenerateButton />
        </form>
      </main>
      <Toast />
    </div>
  );
};

export default App;
