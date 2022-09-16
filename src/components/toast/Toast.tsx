import { Component } from 'solid-js';
import { Toaster } from 'solid-toast';

const Toast: Component = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: 'custom-toast',
        duration: 5000,
        ariaProps: { role: 'alert', 'aria-live': 'polite' },
        style: {
          'background-color': 'hsl(var(--clr-gray-700))',
          'font-size': '1rem',
          'max-width': '420px',
          color: 'hsl(var(--clr-light))',
          padding: '0.5rem 1rem',
          border: '4px dotted hsl(var(--clr-light))',
        },
      }}
    />
  );
};

export default Toast;
