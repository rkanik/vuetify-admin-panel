import Vue from "vue";
import VueRouter from "vue-router";
import views from "../views/_index";
import store from "../store";

Vue.use(VueRouter);

const routes = [
   {
      path: "/",
      name: "dashboard",
      component: views.Dashboard
   },
   {
      path: "/signin",
      name: "signin",
      component: views.Signin
   },
   {
      path: "/users",
      name: "users",
      component: views.Users
   }
];

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes
});

router.beforeEach((to, from, next) => {
   if (to.path !== "/signin" && !store.state.isAuthenticated) {
      next("/signin");
   } else if (to.path === "/signin" && store.state.isAuthenticated) {
      next("/");
   } else {
      next();
   }
});

export default router;
