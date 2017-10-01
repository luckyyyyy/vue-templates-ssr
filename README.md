# vue (SSR)

> This repo is a boilerplate for vue-mobile project. You could use it as a base to build your own web app.

 * vue: https://vuejs.org
 * vue-ssr: https://ssr.vuejs.org
 * vuex: https://vuex.vuejs.org
 * vue-router: https://router.vuejs.org

## Features
 * Equip with Vue, ES6 & Babel 6.
 * Lint with ESlint and Airbnb's style sheet.
 * Build with Webpack 2 (support Webpack 2 & Webpack 3).
 * Support hot module replacement
 * Auto Open a new browser tab when Webpack loads, and reload the page when you modified the code.
 * Support Vue Server Renderer
 * Support Postcss
 * Support express http proxy

## How to use

First, clone the repo.

```bash

git clone https://github.com/luckyyyyy/vue-example.git <yourAppName>
cd <yourAppName>

# Second, delete the old .git history and initialize new history.
rm -rf .git
git init

# If you are in China, please modify the npm registry
npm config set registry https://registry.npm.taobao.org

# Third, install the dependencies.
npm install

# Then, launch the boilerplate app.
PROXY=https://event.chaping.tv npm run dev
```
