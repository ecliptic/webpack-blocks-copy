/**
 * Webpack block for copy-webpack-plugin
 *
 * @see https://github.com/kevlened/copy-webpack-plugin
 */

import CopyWebpackPlugin from 'copy-webpack-plugin'
import merge from 'deepmerge'

/**
 * Adds a simple copy pattern to the list of patterns for the plugin.
 * @param {string} from
 * @param {string} to
 * @return {Function}
 */
export function copy (from, to) {
  return Object.assign(context => {
    // Merge the provided simple pattern into the config
    const config = {patterns: [{from, to}]}
    context.copyPlugin = merge(context.copyPlugin, config, {clone: true})  // eslint-disable-line fp/no-mutation

    return {}
  }, {post: postConfig})
}

/**
 * Adds an advanced pattern to the list of patterns for the plugin.
 * @param {Object} pattern
 * @return {Function}
 */
export function copyPattern (pattern) {
  return Object.assign(context => {
    // Merge the provided advanced pattern into the config
    const config = {patterns: [pattern]}
    context.copyPlugin = merge(context.copyPlugin, config, {clone: true})  // eslint-disable-line fp/no-mutation

    return {}
  }, {post: postConfig})
}

/**
 * Sets options for the copy plugin.
 * @param {Object} options
 * @return {Function}
 */
export function copyOptions (options) {
  return Object.assign(context => {
    // Merge the provided copy plugin config into the context
    context.copyPlugin = merge(context.copyPlugin, {options}, {clone: true})  // eslint-disable-line fp/no-mutation

    return {}
  }, {post: postConfig})
}

/**
 * Instantiate the copy plugin.
 * @param {Object} context
 * @return {Object}
 */
function postConfig (context) {
  const {patterns, options} = context.copyPlugin

  const plugin = new CopyWebpackPlugin(patterns, options)  // eslint-disable-line better/no-new

  return {plugins: [plugin]}
}
