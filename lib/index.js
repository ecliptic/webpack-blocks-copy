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
    // Merge the provided simple pattern into the config
    var config = {patterns: [{from: from, to: to}]}
    context.copyPlugin = (0, _deepmerge2.default)(
      context.copyPlugin || {},
      config,
      {
        clone: true,
      }
    )

    return {}
  }
}

copy.post = postConfig

/**
 * Adds an advanced pattern to the list of patterns for the plugin.
 */
function copyPattern (pattern) {}

// export function copyPattern (pattern: Pattern) {
//   return Object.assign(
//     context => {
//       // Merge the provided advanced pattern into the config
//       const config = {patterns: [pattern]}
//       context.copyPlugin = merge(context.copyPlugin || {}, config, {
//         clone: true,
//       })
//
//       return {}
//     },
//     {post: postConfig}
//   )
// }

/**
 * Sets options for the copy plugin.
 * @param {Object} options
 * @return {Function}
 */
function copyOptions (options) {
  return Object.assign(
    function (context) {
      // Merge the provided copy plugin config into the context
      context.copyPlugin = (0, _deepmerge2.default)(
        context.copyPlugin || {},
        {options: options},
        {clone: true}
      )

      return {}
    },
    {post: postConfig}
  )
}

/**
 * Instantiate the copy plugin.
 * @param {Object} context
 * @return {Object}
 */
function postConfig (context) {
  var _context$copyPlugin = context.copyPlugin,
    patterns = _context$copyPlugin.patterns,
    options = _context$copyPlugin.options

  var plugin = new _copyWebpackPlugin2.default(patterns, options)

  return {plugins: [plugin]}
}
