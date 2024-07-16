# tree-viewer

This is a hierarchy viewer made with D3 and Vue.js. You can try it on 
[Github Pages](https://lana-k.github.io/tree-viewer/).

Click the node to see the node details. Click the node again to deselect it. 
You can also deselect the node by clicking "X" button in the corresponding 
window with the node details.

The tree can be displayed from left to right or from top to bottom. 
Click "Toggle tree direction" to switch the direction. 
By default, the tree is rendered from left to right. The node selection state 
doesn't change during the tree direction switching.

Use the mouse wheel to zoom in/out. Drag to pan. On initial rendering, the tree 
is zoomed to fit the view box.

To change the tree data replace `tree.json` in `public` folder of the build. 

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run Unit Tests with coverage

```sh
npm run test:unit:coverage
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
