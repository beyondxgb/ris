# Adding Pages And Components

We usually add a new page or a new component through copy files. This is inefficient and inflexible. So `RIS` provide template generator to add pages and components quickly.

> The following introduction is base on [standard](https://github.com/risjs/create-ris/tree/master/template/standard) scaffold.

## Usage

To create a page or a component, you can run `add` scripts:

```bash
npm run add
```

Then you can see there are two selects, component and page.

![kk](https://gw.alicdn.com/tfs/TB1cZqZw4TpK1RjSZFGXXcHqFXa-1490-856.jpg)

And you can select the component type, `React.Component` 、`React.PureComponent` and `Stateless Function`.

![kk](https://gw.alicdn.com/tfs/TB11tW6w7zoK1RjSZFlXXai4VXa-1490-856.jpg)

* **React.Component**: normal component
* **React.PureComponent**: pure component that will help you complete the `shouldComponentUpdate` automatically through shallow comparison.
* **Stateless Function**: stateless component, often used for pure UI presentation

It is recommended that you select the appropriate component type.

Next follow the instructions to select as you need.

1. Select the directory you want to place it.
2. Name the component.

![kk](https://gw.alicdn.com/tfs/TB1m4fqw4naK1RjSZFtXXbC2VXa-1490-856.jpg)

Finallay generator will generate files according your selects.

![kk](https://gw.alicdn.com/tfs/TB17Ee_wVzqK1RjSZFCXXbbxVXa-1490-856.jpg)

## Customization

In the process of using, you may encounter some problems, such as the generated directory structure or generated code does not fit for me. This is not a problem, it can be customized.

You can see the page and component generator template in `tools/generators` folder.

![kk](https://gw.alicdn.com/tfs/TB1PtmZw9rqK1RjSZK9XXXyypXa-588-1030.jpg)

We use a micro-generator called [plop](https://www.npmjs.com/package/plop) to complete this work. You can learn about it to customize your template.

For example, page template:

`tools/generators/page/class.js.hbs`

```js
import React from 'react';
import { connect } from 'react-redux';
import xredux from 'xredux';
import './model.js';
import './index.scss';

// Page actions
const actions = xredux.actions.{{ camelCase name }};

// Get state from store
const mapStateToProps = ({ {{ camelCase name }} }) => ({
});

@connect(mapStateToProps)
export default class {{ properCase name }} extends {{{ type }}} {
  render() {
    return (
      <div className="{{ dashCase name}}-container">
        {{ properCase name}}Container
      </div>
    );
  }
}
```

We use `properCase name` and `camelCase name` to set component names dynamically. This file's content you can change as you like.

Following is the file that control the interaction and where the files to place.

`tools/generators/page/index.js`
```js
const fs = require('fs');
const path = require('path');

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the base component type:',
    default: 'React.Component',
    choices: () => ['React.Component', 'React.PureComponent', 'Stateless Function'],
  }, {
    type: 'input',
    name: 'path',
    message: 'Which directory should it be placed?',
    default: 'src/pages',
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value, answer) => {
      const pageContainers = fs.readdirSync(path.join(process.cwd(), answer.path));
      if ((/.+/).test(value)) {
        return pageContainers.indexOf(value) >= 0 ? 'A page with this name already exists' : true;
      }

      return 'The name is required';
    },
  }],
  actions: (data) => {
    // Generate index.js
    let componentTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './page/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './page/class.js.hbs';
      }
    }

    const containerDir = path.join(process.cwd(), data.path, '{{properCase name}}');
    const resolveApp = relativePath => path.join(containerDir, relativePath);

    const actions = [{
      type: 'add',
      path: resolveApp('index.js'),
      templateFile: componentTemplate,
      abortOnFail: true,
    }, {
      type: 'add',
      path: resolveApp('model.js'),
      templateFile: './page/model.js',
      abortOnFail: true,
    }, {
      type: 'add',
      path: resolveApp('Loadable.js'),
      templateFile: './page/Loadable.js',
      abortOnFail: true,
    }, {
      type: 'add',
      path: resolveApp('index.scss'),
      templateFile: './page/index.scss',
      abortOnFail: true,
    }];

    return actions;
  },
};

```


