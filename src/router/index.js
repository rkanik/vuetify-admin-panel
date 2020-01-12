import Vue from "vue";
import VueRouter from "vue-router";
import views from "../views/_index";
import store from "../store";
import session from "../helpers/session"

Vue.use(VueRouter);

const routes = Object.keys(views).map(view => ({
   path: views[view].path,
   name: views[view].name,
   component: views[view]
}))

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes
});

router.beforeEach((to, from, next) => {
   let auth = session.get("Auth");
   let authenticated = (auth && auth.authenticated) || store.getters["Auth/authenticated"]
   if (to.path !== "/signin" && !authenticated) {
      next("/signin");
   } else if (to.path === "/signin" && authenticated) {
      next("/");
   } else {
      next();
   }
});

export default router;
