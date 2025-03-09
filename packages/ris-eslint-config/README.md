# @ris/esling-config

ESlint rules for [RIS](https://github.com/risjs/ris) with [ 'ES5', 'ES6', 'React' ] support. Based on [Airbnb](https://github.com/airbnb/javascript) JavaScript Style Guide.


## Usage

```bash
npm install --save-dev @ris/eslint-config
```

If you use some experimental features with Babel, you may also install [babel-eslint](https://github.com/babel/babel-eslint).


```bash
npm install --save-dev babel-eslint
```

### ES5 

```bash
{
  "extends": "@ris/eslint-config",
  "env": {
    "browser": true
  }
}
```

### ES6

```bash
{
  "extends": "@ris/eslint-config/es6",
  "env": {
    "browser": true
  }
}
```

### React

```bash
{
  "extends": "@ris/eslint-config/react",
  "env": {
    "browser": true
  }
}
```



