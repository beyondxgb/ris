# Fetching Data

> The following introduction is base on [standard](https://github.com/risjs/create-ris/tree/master/template/standard) scaffold.

Fetch data from remote server is an important part in our project. To separate the data and views, we have three core layers:

- `request`: request library, such as provide `get`, `post` method.
- `interceptors`: request interceptors, handle request error of our project.
- `services`: request interface, provide api interface to the views.

In our scaffold, you can find these three layers in `src/core/request/index.js`, `src/core/request/interceptors.js` and `src/services/api.js`.

There we use an excellent request library called [axios](https://github.com/axios/axios). I strongly recommand you to use this library and read its sourece code.

## Usage
Mostly you will simply add a api interface to the views. You can configure it in `src/services/api.js`;

```js
/**
 * services
 *
 * Put the apis to there so we can manage them conveniently
 *
 */

import { get, post } from '../core/request';

export async function getUserInfo(params) {
  return get('/user/get', params);
}

export async function updateUserInfo(params) {
  return post('/user/update', params);
}
```

`src/core/request` export `get`、`post`、`put` and `del` method. You can use it directly.

Following we introduce the detail of these three layers.

### request
In this file, we configure the `axios` and simply abstract out the `get`、`post`、`put` and `del` method.

You can change it as you like through documentation of axios.

### interceptors
We mostly use `axios.interceptors.response.use` to do handle the request error. In this way, we seperate the views's interaction and data request.

For example, if we receive a code that is session expired. we can redirect to the login page.

```js
axios.interceptors.response.use((response) => {
  const { status, data } = response;
  if (status === 200) {
    const { code, success } = data.data;
    if (success === true) {
      return data.data;
    }
    if (code === 'SESSION EXPIRED') {
      window.location.href = 'xxxxx';
      return new Promise(() => {});
    }
  }
  return Promise.reject(data);
});
```

And you can use any UI component to show request error. Such as we use ant design:

```js
import { message } from 'antd';
axios.interceptors.response.use((response) => {
  const { status, data, errmsg } = response;
  if (status === 200) {
    const { code, success } = data.data;
    if (success === true) {
      return data.data;
    }
    if (code === 'SESSION EXPIRED') {
      window.location.href = 'xxxxx';
      return new Promise(() => {});
    }
    message.error(errmsg);
  }
  return Promise.reject(data);
});
```

### services

In this folder, you can define the api interfaces of the project. By default, it contain `api.js`. You can create many files to classify the apis as you need.




