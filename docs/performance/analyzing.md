# Analyzing the Bundle Size

If you want to analyze the build performance of the project, ris provide `analyze` script to create `stats.json`. And then we can analyze the build performance with some tools such as [webpack-analyse](http://webpack.github.io/analyse/)、[webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) and [webpack-chart](http://alexkuz.github.io/webpack-chart/).

In the project root folder, we excute:

```bash
npm run analyze
```

![kk](https://gw.alicdn.com/tfs/TB1n94eASzqK1RjSZFjXXblCFXa-1490-906.jpg)

After the command is executed, the `stats.json` file is generated in the root directory and then you can use it to analyze the build performance with some tools.

## webpack-analyse

[webpack-analyse](http://webpack.github.io/analyse/) is the tool of wepback built in and it is recommanded in the scripts.

Upload the `stats.json`, and you can see the details about the buildment.

![kk](https://gw.alicdn.com/tfs/TB1a8XvANjaK1RjSZFAXXbdLFXa-2880-1028.jpg)

## webpack-bundle-analyzer

Install [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

```bash
npm install -g webpack-bundle-analyzer
```

Run the following command in the project root folder:

```bash
webpack-bundle-analyzer stats.json
```

And you can see the details about the buildment.

![kk](https://gw.alicdn.com/tfs/TB1prllAHvpK1RjSZFqXXcXUVXa-2806-1462.png)

## webpack-chart

[webpack-chart](http://alexkuz.github.io/webpack-chart/) is similar to `webpack-analyse`. Open the website and upload the `stats.json`. And you can see the details about the buildment.

![kk](https://gw.alicdn.com/tfs/TB1Np4lASzqK1RjSZFpXXakSXXa-2880-1470.png)


