# webpack-blocks-copy

A [webpack-block](https://github.com/andywer/webpack-blocks) for [copy-webpack-plugin](https://github.com/kevlened/copy-webpack-plugin).

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/webpack-blocks-copy.svg)](https://www.npmjs.com/package/webpack-blocks-copy)

## Installation

```sh
yarn add --dev webpack-blocks-copy
```

or

```sh
npm install --save-dev webpack-blocks-copy
```

## Usage

The most basic way to use the plugin is to import `copy` and use it to define simple *from*, *to* pairs that are added to the list of patterns used when the plugin is instantiated.

```js
import {createConfig, entryPoint, setOutput} from '@webpack-blocks/webpack2'
import babel from '@webpack-blocks/babel6'
import {copy} from './src/webpack-block-copy'

export default createConfig([
  entryPoint(['babel-polyfill', './src/Main.js']),
  setOutput('./build/bundle.js'),
  babel(),
  copy('assets/robots.txt', 'robots.txt'),
  copy('assets/favicon.ico', 'favicon.ico'),
])
```

This would result in the following CopyPlugin config:

```js
new CopyWebpackPlugin([
  {from: 'assets/robots.txt', to: 'robots.txt'},
  {from: 'assets/favicon.ico', to: 'favicon.ico'},
])
```

### Advanced patterns

If you need to use more advanced patterns, described [here](https://github.com/kevlened/copy-webpack-plugin#pattern-properties), use the `copyPattern` function:

```js
import {createConfig} from '@webpack-blocks/webpack2'
import {copyPattern} from './src/webpack-block-copy'

export default createConfig([
  copyPattern({
    context: 'from/directory',
    from: '**/*',
    to: '/absolute/path',
  }),
])
```

### Options

If you need to set options, use the `copyOptions` function:

```js
import {createConfig} from '@webpack-blocks/webpack2'
import {copyOptions} from './src/webpack-block-copy'

export default createConfig([
  copyOptions({copyUnmodified: true}),
])
```

See the options list [here](https://github.com/kevlened/copy-webpack-plugin#available-options).

## License

This project is licensed under [MIT](https://github.com/ecliptic/webpack-blocks-html/blob/master/LICENSE).
