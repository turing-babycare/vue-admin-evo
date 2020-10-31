// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
process.env.VUE_APP_BUILD_ID = new Date();
module.exports = {
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    // These are some necessary steps changing the default webpack config of the Vue CLI
    // that need to be changed in order for Typescript based components to generate their
    // declaration (.d.ts) files.
    //
    // Discussed here https://github.com/vuejs/vue-cli/issues/1081
    config.module.rule('ts').uses.delete('cache-loader');

    config.module
      .rule('ts')
      .use('ts-loader')
      .loader('ts-loader')
      .tap(opts => {
        opts.transpileOnly = false;
        opts.happyPackMode = false;
        return opts;
      });
  },
  parallel: false
};
