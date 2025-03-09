# Enable And Disable DLL

By default, we enable the dll to speed up the build process during the `development` environment. It will put all third-party dependencies to the dll.


## Usage

You can confirgure it in `risrc.js`:

```js
module.exports = {
  dll: true,
  dllPlugin: {
    path: 'node_modules/ris-react-boilerplate-dlls',
    exclude: [],
    include: [],
    dlls: null,
  },
};
```

* `dll`: set ture to enable dll and false to disable dll.
* `dllPlugin`:
  * **path**: the directory dll configuration files.
  * **exclude**: configure which third-party dependencies do not enter dll.

    ```js
    module.exports = {
      dllPlugin: {
        path: 'node_modules/ris-react-boilerplate-dlls',
        exclude: ['react', 'react-dom'],
      },
    };
    ```

  * **include**: specify which third-party dependencies enter dll.

    ```js
    module.exports = {
      dllPlugin: {
        path: 'node_modules/ris-react-boilerplate-dlls',
        include: ['moment'],
      },
    };
    ```
  * **dlls**: configure the detailed dll, similar to the webpack entry configuration.

    ```js
    module.exports = {
      dllPlugin: {
        path: 'node_modules/ris-react-boilerplate-dlls',
        dlls: {
          vendor: ['react', 'react-dom'],
          common: ['..'] 
        }
      },
    };
    ```

## Attention
If you have any problem with dll, you can try delete `node_modules/aimake-react-boilerplate-dlls` and restart the app.

```js
rm -rf node_modules/aimake-react-boilerplate-dlls
```
