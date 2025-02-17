# Flag memorization game
Game has two stages - first is to select the correct outline, second is to color flags right
This ensures we learn both what the flag looks like and how it is colored

## TODO:
1) Fix flag definitions - currently generated SVGs for some flags are not optimal
2) Ensure accurate flag colors by swapping the generic red, blue etc. with the specific colors to the flag - if a flag has a lighter shade of blue, the color palette should swap the defualt blue with that specific flag blue so that end end result looks right
3) Fix shuffling, and ensure more complex and nuanced variations for the flag outline selections. Right now, the correct option seems obvious
4) Allow for additional complex SVG segments that may not need to be colored in, for complex emblems like Mexico or egypt's eagle
5) Potential refactor to allow for very complex SVGs, and the 'regions' to be colored would be identified by ids instead - this could make the entire app very simple, except for the cases where a thick stroke or other non-polygon area is used to denote a part of the flag

## Similar apps:
1) [Paint the flag](https://www.crazygames.com/game/paint-the-flag): Does not have the flag outline selection step, does not have large color palette but rather only the colors of the flag being painted

## Other Flag knowledge apps:
1) [World flags](https://www.sporcle.com/games/g/worldflags): Let's you type country names to verify if you know the name of the country that corresponds to the flag

# About this app
The app was generated using Vite, see the below section for details:

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
