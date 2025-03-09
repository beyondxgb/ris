# Router

> The following introduction is base on [standard](https://github.com/risjs/create-ris/tree/master/template/standard) scaffold.

We often use [react-router](https://github.com/ReactTraining/react-router) to create our application. Because we want to keep routes in redux store. There we use [connected-react-router](https://github.com/supasate/connected-react-router) to integrate redux to react router.

## Changing history type

By default, we use `hash history`. If you want to use `browser history`, you can change it in the `src/index.js`.

```js
- import createHistory from 'history/createHashHistory';
+ import createHistory from 'history/createBrowserHistory';
```

## Adding a route

To add a route, you can configure it in `src/routes.js`.

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

## Router navigating
There are many ways to navigate between pages.

### Link

```js
import Link from "react-router-dom";

export default () => (
   <Link to="/index">Index</Link>
);
```

### withRouter
You can get access to the `history` object's properties and the closest <Route>'s match via the `withRouter` higher-order component. `withRouter` will pass updated match, location, and history props to the wrapped component whenever it renders.

```js
import React from "react";
import { withRouter } from "react-router";

class Demo extends React.Component {
  render() {
    const { match, location, history } = this.props;

    return <div onClick={() => history.push('/index')}>index</div>;
  }
}
export default withRouter(Demo);
```

### dispatch
Application have deep integration of redux. So you can use `dispatch` to navigate pages in reducers.

```js
import xredux from 'xredux';
import { push } from 'connected-react-router';

const { actions } = xredux;

xredux.model({
  namespace: 'app',
  initialState: {
  },
  reducers: {

  },
  effects: {
    async submitForm(action, dispatch) {
      ...do submit
      // redirect to index
      dispatch(push('/'));
    },
  },
});
```

