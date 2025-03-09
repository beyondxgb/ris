# Quick Start

## Prepare
You’ll need to have **Node 8.9.0** or later on your local development machine. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

## Started
RIS provides scaffolding through [create-ris](https://github.com/risjs/create-ris).

There are currently two scaffolds built-in, [empty](https://github.com/risjs/create-ris/tree/master/template/simple) and [standard](https://github.com/risjs/create-ris/tree/master/template/standard).

You can init a application as following ways:

### npx
```bash
npx create-ris <appName>
```
> (npx comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))

### npm
```bash
npm init ris <appName>
```
> `npm init` <initializer> is available in npm 6+

### yarn
```bash
yarn create ris <appName>
```
> `yarn create` is available in Yarn 0.25+

Inside the application, you can run following scripts:

### `npm start`
Startup the application in development mode. You can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run add`
Add page and component quickly. You can highly customize the template of page and component in the `tools/generators`.

### `npm run build`
Build the application in production mode. It will default build to the `build` folder.

More scripts can be found [here]().

<img src="https://img.alicdn.com/tfs/TB1G7xdwSzqK1RjSZFpXXakSXXa-743-425.gif" />

Now You can happy coding.


