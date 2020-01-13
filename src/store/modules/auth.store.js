import db from "../../firebase/firebase.init";
import router from "../../router"
import { setCookie, getCookie, hasCookie } from "../../helpers/cookies"
import session from "../../helpers/session"
const initialState = () => ({
   /** Booleans */
   authenticated: false,
   isAdmin: false,
   checkedIn: false,
   /** Objects */
   currentUser: {},
   checkIn: {}
});

const actions = {
   initialize: async ({ commit, dispatch }) => {
      commit("Progress/setState", { initializing: true }, { root: true })
      let prevState = session.get("Auth")
      prevState !== null
         ? (
            commit('setState', prevState), !prevState.isAdmin && commit('UI/removeNavItem', ["/users"], { root: true }),
            await dispatch("Checkins/fetchCheckIn", prevState.currentUser.id, { root: true })
         )
         : hasCookie('user-token') &&
         await dispatch("fetchUserById", getCookie("user-token"))
      commit("Progress/setState", { initializing: false }, { root: true })
   },
   signOut: ({ commit }) => {
      commit("resetState"); sessionStorage.clear()
      setCookie('user-token', null, -1)
      commit("Progress/resetState", {}, { root: true })
      router.replace("/signin")
   },
   onSignin: async ({ commit, dispatch }, { doc, remember }) => {
      let user = { id: doc.id, ...doc.data() };
      delete user.password;
      let authState = { authenticated: true, isAdmin: user.roles.includes("ADMIN"), currentUser: user }
      /** Fixing Navigation drawer itemBased on user roles */
      if (!authState.isAdmin) {
         commit('UI/removeNavItem', ["/users"], { root: true })
      } else {
         commit('UI/resetNavItems', null, { root: true })
      }
      commit('setState', authState); session.set({ Auth: authState })
      remember && setCookie("user-token", user.id, 7)
      await dispatch("Checkins/fetchCheckIn", user.id, { root: true })
      router.replace("/")
      commit("Progress/setState", { initializing: false }, { root: true })
   },
   fetchUserById: async ({ dispatch }, id) => {
      let snapshot = await db.collection('users').doc(id).get()
      await dispatch("onSignin", { doc: snapshot, remember: true })
   },
   fetchUserByEmailPass: async ({ commit, dispatch }, payload) => {
      commit("Progress/setState", { signin: true }, { root: true });
      let snapshot = await db
         .collection("users")
         .where("email", "==", payload.email)
         .where("password", "==", payload.password)
         .get()
      if (snapshot.empty) {
         commit("Error/setState", { signin: true }, { root: true })
      } else {
         await dispatch("onSignin", { doc: snapshot.docs[0], remember: payload.remember })
      }
   }
};

const mutations = {
   setState: (state, payload) => {
      Object.keys(payload).forEach(key => (state[key] = payload[key]));
   },
   resetState: state => {
      let newState = initialState();
      Object.keys(newState).forEach(key => (state[key] = newState[key]));
   }
};

const state = initialState();

const getters = {
   authenticated: st => st.authenticated,
   isAdmin: st => st.isAdmin,
   currentUser: st => st.currentUser
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};
