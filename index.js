// @flow
/**
 * Webpack block for copy-webpack-plugin
 *
 * @see https://github.com/kevlened/copy-webpack-plugin
 */
import CopyWebpackPlugin from 'copy-webpack-plugin'
import merge from 'deepmerge'

export type Pattern = {
  from: string | Object,
  to?: string,
  toType?: "file" | "dir" | "template",
  context?: string,
  flatten?: boolean,
  ignore?: Array<string>,
  transform?: (content: string, path: string) => string,
  force?: boolean
};

export type Options = {
  ignore?: Array<string>,
  copyUnmodified?: boolean,
  debug?: "warning" | "info" | "debug"
};

/**
 * Adds a simple copy pattern to the list of patterns for the plugin.
 */
export function copy (from: string, to: string) {
  return (context: Object) => (config: Object) => {
    // Merge the provided simple pattern into the config
    const options = {patterns: [{from, to}]}
    context.copyPlugin = merge(context.copyPlugin || {}, options, {
      clone: true,
    })

    // Don't alter the config yet
    return config
  }
}

copy.post = postConfig

/**
 * Adds an advanced pattern to the list of patterns for the plugin.
 */
export function copyPattern (pattern: Pattern) {
  return (context: Object) => (config: Object) => {
    const options = {patterns: [pattern]}
    context.copyPlugin = merge(context.copyPlugin || {}, options, {
      clone: true,
    })

    // Don't alter the config yet
    return config
  }
}

copyPattern.post = postConfig

/**
 * Sets options for the copy plugin.
 */
export function copyOptions (options: Options) {
  return (context: Object) => (config: Object) => {
    // Merge the provided copy plugin config into the context
    context.copyPlugin = merge(
      context.copyPlugin || {},
      {options},
      {clone: true}
    )

    // Don't alter the config yet
    return config
  }
}

copyOptions.post = postConfig

/**
 * Instantiate the copy plugin.
 */
function postConfig (context: Object) {
  const {patterns, options} = context.copyPlugin

  const plugin = new CopyWebpackPlugin(patterns, options)

  return {plugins: [plugin]}
}
