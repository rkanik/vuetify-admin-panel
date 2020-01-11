const requireViews = require.context(".", false, /\.vue$/);
const views = {};

requireViews.keys().forEach(compName => {
   let viewName = compName.replace(/(\.\/|\.vue)/g, "");
   views[viewName] = requireViews(compName).default || requireViews(compName);
});

export default views;
