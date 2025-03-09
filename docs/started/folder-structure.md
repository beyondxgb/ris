# Folder Structure

## Simple

```
├── README.md
├── package.json
├── src
│   ├── App.js
│   ├── App.scss
│   ├── index.html
│   └── index.js
└── tools
    ├── generators
    │   ├── component
    │   │   ├── class.js.hbs
    │   │   ├── index.js
    │   │   └── stateless.js.hbs
    │   ├── index.js
    │   └── utils
    │       └── componentExists.js
    ├── risrc.js
    ├── server
    │   └── index.js
    └── webpack
        ├── base.js
        ├── dev.js
        └── prod.js
```

## Standard

```
├── README.md
├── mock
│   └── rules.js
├── package.json
├── src
│   ├── assets
│   │   └── styles
│   │       ├── common.scss
│   │       ├── iconfont.scss
│   │       └── reset.scss
│   ├── components
│   │   └── Layout
│   │       ├── index.js
│   │       └── index.scss
│   ├── core
│   │   └── request
│   │       ├── index.js
│   │       └── interceptors.js
│   ├── index.html
│   ├── index.js
│   ├── pages
│   │   ├── Demo
│   │   │   ├── Loadable.js
│   │   │   ├── index.js
│   │   │   ├── index.scss
│   │   │   └── model.js
│   │   └── NotFoundPage
│   │       ├── Loadable.js
│   │       └── index.js
│   ├── routes.js
│   ├── services
│   │   └── api.js
│   ├── store
│   │   ├── index.js
│   │   ├── models
│   │   │   └── index.js
│   │   └── reducers
│   │       └── index.js
│   └── utils
│       └── index.js
└── tools
    ├── generators
    │   ├── component
    │   │   ├── class.js.hbs
    │   │   ├── index.js
    │   │   ├── index.scss
    │   │   └── stateless.js.hbs
    │   ├── index.js
    │   ├── page
    │   │   ├── Loadable.js
    │   │   ├── class.js.hbs
    │   │   ├── index.js
    │   │   ├── index.scss
    │   │   ├── model.js
    │   │   └── stateless.js.hbs
    │   └── utils
    │       └── componentExists.js
    ├── risrc.js
    ├── server
    │   └── index.js
    └── webpack
        ├── base.js
        ├── dev.js
        └── prod.js
```

## Detail

* `src/index.js`: the entry point of the application.
* `src/index.html`: the page template.
* `src/pages`: the page component folder.
* `src/assets`: the assets folder, can contain styles, images, fonts.
* `src/components`: the commone components of the application.
* `src/core`: the core of the application, such as request library.
* `src/routes.js`: the route config.
* `src/services`: configure the api interface for the views.
* `src/store`: confirgure the store.
* `src/utils`: utils for the application.
* `src/tools`: tools that to customize build configuration.



