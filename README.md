# RIS

[![npm version](https://img.shields.io/npm/v/@ris/cli.svg?colorB=007ec6&style=flat-square)](https://www.npmjs.com/package/@ris/cli)
[![npm downloads](https://img.shields.io/npm/dm/@ris/cli.svg?style=flat-square)](https://www.npmjs.com/package/@ris/cli)
[![license](https://img.shields.io/github/license/beyondxgb/xredux.svg?style=flat-square)](https://github.com/beyondxgb/xredux/blob/master/LICENSE)

RIS, React Integrated Solution. RIS's target is to provide a basic build solution that high scalability. Through this toolset we focus on output some best practice about react.

## Quick Start

```bash
npx create-ris ris-app
cd ris-app
npm start
```
> (npx comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))

## Features
- ✔︎ **Out of the box**, with empty application and standard application which built-in react, react-router, etc.
- ✔︎ **High scalability**, can highly customize your application and build configuration.
- ✔︎ **Ultimate development experience**, with dll to speed up build process, with tools to add component, pages quickly.
- ✔︎ **High performance**, code-splitting our app with [react-loadable](https://github.com/jamiebuilds/react-loadable).
- ✔︎ **Predictable state management**,built-in [xredux](https://github.com/beyondxgb/xredux) which well handle data flow problem.
- ✔︎ **Powerful data mock**, mock data in development conveniently.

## Getting Started

You’ll need to have **Node 8.9.0** or later on your local development machine. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

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

## Examples
Built-in [empty](https://github.com/risjs/create-ris/tree/master/template/simple) and [standard](https://github.com/risjs/create-ris/tree/master/template/standard) application. You can use [create-ris](https://github.com/risjs/create-ris) to create a applicatioin to experience.

More:

* [Enterprise](https://github.com/risjs/ris-example-enterprise), An enterprise-level appliction that built-in ant-design.
* [Mobile](https://github.com/risjs/ris-example-mobile), A mobile web appliction that integrate excellent solutions.

## Documentation
Learn more about the details and instructions, you can read about [UserGuide](https://github.com/risjs/ris/blob/master/docs/guide.md).

## Thanks
To create this tools, something is referenced [create-react-app](https://github.com/facebook/create-react-app) and [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate). Thanks a lot for many good ideas.

## LICENSE
MIT
