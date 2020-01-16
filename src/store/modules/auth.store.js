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
   checkIn: {},
   location: {},
   desLocation: {
      latitude: 23.7748,//23.774741
      longitude: 90.36542960000001,//90.36542960000001
      maxLocation() {
         return {
            latitude: this.latitude + 0.00004,
            longitude: this.longitude + 0.00001
         }
      }
   }
});

const state = initialState();

const getters = {
   authenticated: st => st.authenticated,
   isAdmin: st => st.isAdmin,
   currentUser: st => st.currentUser,
   location: st => st.location,
   validLocation: st => {
      if (!st.location.error) {
         let maxLocation = st.desLocation.maxLocation()
         console.log(maxLocation, st.location);
         if (st.location.latitude <= maxLocation.latitude && st.location.longitude <= maxLocation.longitude) {
            return true
         } else {
            return false
         }
      }
   }
};

const actions = {
   initialize: async ({ commit, dispatch }) => {
      console.log('initialize');
      commit("Progress/setState", { initializing: true }, { root: true })
      dispatch("getUserGeoLocation")
      let prevState = session.get("Auth")
      prevState !== null
         ? (
            commit('setState', prevState), !prevState.isAdmin && commit('UI/removeNavItem', ["/users"], { root: true }),
            await dispatch("Checkins/fetchCheckIn", prevState.currentUser.id, { root: true })
         )
         : hasCookie('user-token') &&
         await dispatch("fetchUserById", getCookie("user-token"))
      console.log("END initialize");
      commit("Progress/setState", { initializing: false }, { root: true })
   },
   getUserGeoLocation: async ({ commit }) => {
      commit("Progress/setState", { location: true }, { root: true })
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            response => {
               commit("setState", {
                  location: {
                     error: false,
                     latitude: response.coords.latitude,
                     longitude: response.coords.longitude,
                     accuracy: response.coords.accuracy
                  }
               })
               commit("Progress/setState", { location: false }, { root: true })
            },
            error => {
               commit('setState', { location: { error: true, message: error.message, code: error.code } });
               commit("Progress/setState", { location: false }, { root: true })
            }
         )
      } else {
         commit("setState", { location: { error: true, code: 9, message: "Browser Not Supported" } })
         commit("Progress/setState", { location: false }, { root: true })
      }

   },
   signOut: ({ commit }) => {
      commit("resetState"); sessionStorage.clear()
      setCookie('user-token', null, -1)
      commit("Progress/resetState", {}, { root: true })
      commit("Error/resetState", {}, { root: true })
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
         commit("Progress/setState", { signin: false }, { root: true });
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

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};
