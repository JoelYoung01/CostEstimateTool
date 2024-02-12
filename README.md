# Cost Estimate Tool

This is a tool that helps users estimate the cost of a sod installation. It is built with Vue 3 and Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + Takeover mode (see below)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e --project=chromium
# Runs the tests of a specific file
pnpm test:e2e tests/example.spec.ts
# Runs the tests in debug mode
pnpm test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## AWS setup

This project pushes the built files to an S3 bucket. To test this locally, you need to set up aws cli locally. See their docs on that here: [link](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

## Demo

Navigate to [SodSmith](https://sodsmith.com) and paste the following js function into your browser console to see the demo:

```js
function demo() {
  var mountPoint = document.querySelector('.hide-on-mobile .nj-lead');
  mountPoint.outerHTML = '<div id="cost-estimation-tool-mount-point" class="pr-4"></div>';

  var mdiIcons = document.createElement('link');
  mdiIcons.rel = "stylesheet";
  mdiIcons.href = "https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css";
  document.head.appendChild(mdiIcons);

  var script = document.createElement('script');
  script.src = "https://d3o7bndcxbs47b.cloudfront.net/cost-estimate-tool/index.js";
  document.body.appendChild(script);
};

demo();
```
