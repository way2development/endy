const path = require('path')
const toPath = (filePath) => path.join(process.cwd(), filePath)

module.exports = {
  features: {
    previewMdx2: true
  },
  stories: [
    '../docs/*.stories.@(js|jsx|ts|tsx|md|mdx)',
    '../components/*/*.stories.@(js|jsx|ts|tsx|md|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-postcss',
    'storybook-addon-next-router'
  ],
  framework: '@storybook/react',
  //Added the mjs rule to the webpackFinal config to make framer-motion compatiable with storybook
  //source: https://github.com/framer/motion/issues/1307#issuecomment-979751883
  webpackFinal: async (config, { configType }) => {
    // babel-loader to handle parsing /node_modules\/plyr/ files
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules\/plyr/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    })

    config.module.rules.push({
      type: 'javascript/auto',
      test: /\.mjs$/,
      include: /node_modules/,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react')
        }
      }
    })

    // Fix for Cannot resolve 'fs' error fix after upgrading to Storybook 6.5 (upgraded to 6.5 due to React 18 upgrade)
    // source: https://github.com/storybookjs/storybook/issues/16833#issuecomment-1060655174
    config.node = { fs: 'empty' }

    return config
  }
}
