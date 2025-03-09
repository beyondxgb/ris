# Available Scripts

Inside the application, you can run following scripts:

### `npm start`
Startup the application in development mode. You can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run add`
Add page and component quickly. You can highly customize the template of page and component in the `tools/generators`. For more details about this, you can read about [Adding Pages And Components](https://github.com/risjs/ris/blob/master/docs/development/generator.md).

### `npm run build`
Build the application in production mode. It will default build to the `build` folder.

### `npm run lint`
Run eslint for the application. Base on the rules of [@ris/eslint-config](https://github.com/risjs/ris/tree/master/packages/ris-eslint-config). You can run `npm run lint:fix` for auto fix the lint problem.

### `npm run stylelint`
Run stylelint for the application. Base on the rules of [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard). You can run `npm run stylelint:fix` for auto fix the lint problem.

### `npm run analyze`
Analyze the build performance of the application. For more details about this, you can read about [Analyzing the Bundle Size](https://github.com/risjs/ris/blob/master/docs/performance/analyzing.md).