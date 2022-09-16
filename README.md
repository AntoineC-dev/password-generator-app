# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Contribution](#contribution)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

Bonus:

- Generate strict password (at least one character of each selected type)
- Toast notifications succes/error (copied to clipboard)

### Screenshot

- Tablet (768x1024)

![Fullpage Tablet](./fullpage-screenshots/fullpage-tablet.png)

- Mobile (375x934)

![Fullpage Mobile](./fullpage-screenshots/fullpage-mobile.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [https://password-generator-app-acdev.vercel.app/](https://password-generator-app-acdev.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Typescript](https://www.typescriptlang.org/)
- [SolidJs](https://www.solidjs.com/)
- [Postcss](https://postcss.org/)

### What I learned

#### Solid JS

As a second project with this stack I start to really feel good with the framework. It has a really nice DX and clear documentation.

#### Customize range input

It was really hard to create teh custom range input from the design and make it compatible in both Chromium and Firefox.

I tried going with a CSS-only approch but only firefox gives you the possibility to style the **progress track** with `::-moz-range-progress` so i used a dynamic linear gradient with a bit of JavaScript.

```jsx
const CustomSlider: Component<CustomSliderProps> = (props: CustomSliderProps) => {
  const gradientStop = createMemo(() => Math.floor((+props.value! / +props.max!) * 100));
  return <input type="range" class={styles.input} style={{ '--gradient-stop': `${gradientStop()}%` }} {...props} />;
};
```

```css
.input::-webkit-slider-runnable-track {
  /* ... properties */
  background-image: linear-gradient(
    to right,
    hsl(var(--clr-accent)) 0%,
    hsl(var(--clr-accent)) var(--gradient-stop),
    hsl(var(--clr-gray-900)) var(--gradient-stop),
    hsl(var(--clr-gray-900)) 100%
  );
}
```

#### Generate a strict password with predefined rules

I added a little bonus to the project. Any generated password must contain at least one character for each rule.

```ts
const generateRandomIndexes = (length: PasswordOptions['length'], pool: string) => {
  let indexes: number[] = [];
  while (indexes.length < length) {
    const index = Math.floor(Math.random() * pool.length);
    if (indexes.indexOf(index) === -1) indexes.push(index);
  }
  return indexes;
};

const generateStrictPassword = (options: PasswordOptions, pool: string): string => {
  // Generate unique indexes
  const indexes = generateRandomIndexes(options.length, pool);

  // Generate password
  let password = '';
  for (let i = 0; i < indexes.length; i++) {
    password += pool[indexes[i]];
  }

  // Check if password follows all rules
  const isStrict = STRICT_RULES.every((rule) => {
    if (!options.rules[rule.name]) return true;
    return rule.regexp.test(password);
  });

  // If not strict calls itself recursively
  if (!isStrict) return generateStrictPassword(options, pool);

  return password;
};

export const generatePassword = (options: PasswordOptions) => {
  let pool = '';
  if (options.rules.lowercase) pool += LOWERCASE_CHARS;
  if (options.rules.uppercase) pool += UPPERCASE_CHARS;
  if (options.rules.numbers) pool += NUMBERS;
  if (options.rules.symbols) pool += SYMBOLS;

  // Generate password
  const password = generateStrictPassword(options, pool);
  return password;
};
```

The way I generate unique indexes does not scale very well above 32 chars but that is enough for a password generator. If you need to go further you might want to use the JavaScript `Set` to check if the generated index is unique in the current Set.

#### Copy to clipboard

I used the new navigator.clipboard API.

```ts
export const copyToClipboard = async (str: string) => {
  if (!(navigator && navigator.clipboard && navigator.clipboard.writeText))
    return Promise.reject('The Clipboard API is not available.');
  return navigator.clipboard.writeText(str);
};
```

### Useful resources

- [Solidjs Documentation](https://www.solidjs.com/docs/latest/api) - Une bibliothèque JavaScript déclarative, efficace et flexible pour la création d'interfaces utilisateur.
- [Postcss Preset Env](https://preset-env.cssdb.org/) - Start using modern CSS today.
- [Cross-Browser Range Input](https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/) - Styling Cross-Browser Compatible Range Inputs with CSS

## Author

- Frontend Mentor - [@AntoineC-dev](https://www.frontendmentor.io/profile/AntoineC-dev)

## Contribution

You can use this project for whatever you want. Don't forget to leave a ⭐.

- Fork the project to add it to your githug repositories.
- Clone it on your local machine from you repositories.
- Install all the dependencies by running `npm install` or `yarn` or `pnpm` from a terminal located in the project.
- Open the project in your editor and start coding.
