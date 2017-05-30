'use strict'

exports.__esModule = true
exports.copy = copy
exports.copyPattern = copyPattern
exports.copyOptions = copyOptions

var _copyWebpackPlugin = require('copy-webpack-plugin')

var _copyWebpackPlugin2 = _interopRequireDefault(_copyWebpackPlugin)

var _deepmerge = require('deepmerge')

var _deepmerge2 = _interopRequireDefault(_deepmerge)

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/**
 * Adds a simple copy pattern to the list of patterns for the plugin.
 */

/**
 * Webpack block for copy-webpack-plugin
 *
 * @see https://github.com/kevlened/copy-webpack-plugin
 */
function copy (from, to) {
  return function (context) {
    return function (config) {
      // Merge the provided simple pattern into the config
      var options = {patterns: [{from: from, to: to}]}
      context.copyPlugin = (0, _deepmerge2.default)(
        context.copyPlugin || {},
        options,
        {
          clone: true,
        }
      )

      // Don't alter the config yet
      return config
    }
  }
}

copy.post = postConfig

/**
 * Adds an advanced pattern to the list of patterns for the plugin.
 */
function copyPattern (pattern) {
  return function (context) {
    return function (config) {
      var options = {patterns: [pattern]}
      context.copyPlugin = (0, _deepmerge2.default)(
        context.copyPlugin || {},
        options,
        {
          clone: true,
        }
      )

      // Don't alter the config yet
      return config
    }
  }
}

copyPattern.post = postConfig

/**
 * Sets options for the copy plugin.
 */
function copyOptions (options) {
  return function (context) {
    return function (config) {
      // Merge the provided copy plugin config into the context
      context.copyPlugin = (0, _deepmerge2.default)(
        context.copyPlugin || {},
        {options: options},
        {clone: true}
      )

      // Don't alter the config yet
      return config
    }
  }
}

copyOptions.post = postConfig

/**
 * Instantiate the copy plugin.
 */
function postConfig (context) {
  var _context$copyPlugin = context.copyPlugin,
    patterns = _context$copyPlugin.patterns,
    options = _context$copyPlugin.options

  var plugin = new _copyWebpackPlugin2.default(patterns, options)

  return {plugins: [plugin]}
}
