const requireModule = require.context(".", false, /\.store\.js$/);
const modules = {};
requireModule.keys().forEach(filename => {
   const moduleName = filename
      .replace(/(\.\/|\.store\.js)/g, "")
      .replace(/^\w/, fl => fl.toUpperCase());
   //.toUpperCase()

   modules[moduleName] =
      requireModule(filename).default || requireModule(filename);
});

export default modules;
