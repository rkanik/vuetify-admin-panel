import db from "../../firebase/firebase.init";
import router from "../../router";

const initialState = () => ({
   users: [],
   signinLoading: false,
   currentUser: {}
});

const actions = {
   fetchUser: async ({ commit }, payload) => {
      commit("setState", { signinLoading: true });
      let snapshot = await db
         .collection("users")
         .where("email", "==", payload.email)
         .where("password", "==", payload.password)
         .limit(1)
         .get();
      if (snapshot.empty) {
         console.log("User not found");
      } else {
         let user = snapshot.docs[0].data();
         delete user.password;
         commit("setState", { currentUser: user });
         if (user.roles.includes("ADMIN")) {
            commit("setRootState", { isAuthenticated: true }, { root: true });
            router.replace("/");
         } else {
            console.log("Not a admin account");
         }
      }
      commit("setState", { signinLoading: false });
   }
};

const mutations = {
   setState: (state, payload) => {
      Object.keys(payload).forEach(key => (state[key] = payload[key]));
   },
   resetState: state => {
      let newState = initialState();
      Object.keys(newState).forEach(key => (state[key] = newState[key]));
   },
   pushUser: (state, payload) => {
      state.users.push(payload);
   }
};

const state = initialState();

const getters = {
   users: state => state.users,
   currentUser: state => state.currentUser,
   signinLoading: state => state.signinLoading
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};
