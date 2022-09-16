import { Component } from 'solid-js';
import { Toaster } from 'solid-toast';

const Toast: Component = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 4500,
        ariaProps: { role: 'alert', 'aria-live': 'polite' },
      }}
    />
  );
};

export default Toast;
