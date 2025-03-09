# Code Splitting

> The following introduction is base on [standard](https://github.com/risjs/create-ris/tree/master/template/standard) scaffold.

For the application performance, we use [react-loadable](https://github.com/jamiebuilds/react-loadable) to load components dynamically.

## Usage

In the pages folder, we can see that `Demo` page has a `Loadable.js` file.

```js
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
```

You can customize `loading` as you need. Refer to the official [documentation](https://github.com/jamiebuilds/react-loadable) for more requirements.

In `routes.js` file, we can see that import `Loadable.js` not `index.js`. In this way, wepack will split different chunks for pages.

```js
import NotFoundPage from './pages/NotFoundPage/Loadable';
import Demo from './pages/Demo/Loadable';

export default [
  {
    path: '/',
    component: Demo,
    exact: true,
  },
  {
    path: '/demo',
    component: Demo,
    exact: true,
  },
  {
    component: NotFoundPage,
  },
];
```

## Notice
In `production` mode, you may should specify `publicPath` because webpack load chunks base on current url. If your assets is deployed in the server that is not the same as the current host, it will load assets error. So you should specify `publicPath` to tell webpack where your assets placed.

There are two ways to confirgure `publicPath`.

First, you can set it in `tools/webpack/prod.js`:

```js
module.exports = {
  output: {
    publicPath: 'https://xxx.xxx.xxx',
  },
};
```

Second, you can set it use env variable `CDN_PATH`:

`package.json`

```json
{
  "scripts": {
    "build": "CDN_PATH=https://xxx.xxx.xxx ris build"
  }
}
```

