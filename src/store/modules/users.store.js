import db from "../../firebase/firebase.init";
import router from "../../router";

const initialState = () => ({
   users: [],
   usersTableHeaders: [
      { text: "Id number", value: "id" }, { text: "Full Name", value: "name" },
      { text: "Email Address", value: "email" }, { text: "Password", value: "password" },
      { text: "Roles", value: 'roles' }, { text: 'Edit', value: 'edit', sortable: false },
      { text: 'Delete', value: 'delete', sortable: false },
   ],
   signinLoading: false,
   signinError: false,
   saveUserLoading: false,
   updateUserLoading: false,
   confirmDeleteLoading: false,
   currentUser: {},
   checkedIn: false,
});

const state = initialState();

const getters = {
   users: state => state.users,
   currentUser: state => state.currentUser,
   checkedIn: state => state.checkedIn === false ? false : {
      ...state.checkedIn,
      checkedIn: new Date(state.checkedIn.checkedIn).toLocaleTimeString(),
      checkedOut: state.checkedIn.checkedOut && new Date(state.checkedIn.checkedOut).toLocaleTimeString()
   },
   signinLoading: state => state.signinLoading,
   signiError: state => state.signiError,
   saveUserLoading: state => state.saveUserLoading,
   usersTableHeaders: state => state.usersTableHeaders,
   updateUserLoading: state => state.updateUserLoading,
   confirmDeleteLoading: state => state.confirmDeleteLoading
};

const actions = {
   fetchUsers: async ({ commit }, select = "All") => {
      commit("Progress/setState", { usersTable: true }, { root: true })

      let ROLE = select === "Admins" ? "ADMIN" : select === "Users" ? "USER" : false
      let query = db.collection('users')
      query = ROLE ? query.where("roles", 'array-contains', ROLE) : query

      let snapshot = await query.get()

      let users = [];
      snapshot.forEach(doc => { users.push({ id: doc.id, ...doc.data() }) })

      commit("setState", { users })
      commit("Progress/setState", { usersTable: false }, { root: true })
   },
   deleteUser: async ({ commit }, payload) => {
      commit("setState", { confirmDeleteLoading: true })
      try {
         await db.collection('users').doc(payload.id).delete()
         commit('filterUser', payload)
      } catch (error) {
         console.log("Error while deleting")
      }
      commit("setState", { confirmDeleteLoading: false })
   },
   updateUser: async ({ commit, state }, payload) => {
      commit("setState", { updateUserLoading: true })
      try {
         await db.collection('users').doc(payload.id).update({
            name: payload.name,
            email: payload.email,
            password: payload.password,
            roles: payload.roles
         })
         commit("updateUser", { user: payload })
      } catch (error) {
         console.log(error)
      }
      commit("setState", { updateUserLoading: false })
   },
   saveNewUser: async ({ commit }, payload) => {
      commit("setState", { saveUserLoading: true })
      let response = await db.collection("users").add({
         name: payload.name,
         email: payload.email,
         password: payload.password,
         roles: payload.roles
      })
      if (response.id) {
         commit("pushUser", { ...payload, id: response.id })
      } else {
         console.log("Error happened")
      }
      commit("setState", { saveUserLoading: false })
   },
   signoutAdmin: ({ commit }) => {
      commit("setRootState", { isAuthenticated: false }, { root: true });
      commit("resetState"); router.push("/signin")
   },

   fetchUser: async ({ commit, dispatch }, payload) => {
      commit("setState", { signinLoading: true });
      let snapshot = await db
         .collection("users")
         .where("email", "==", payload.email)
         .where("password", "==", payload.password)
         .limit(1)
         .get();
      if (snapshot.empty) {
         commit("setState", { signinError: true })
      } else {
         let user = snapshot.docs[0].data();
         /** Authenticated Admin users */
         if (user.roles.includes("ADMIN")) {
            commit("setRootState", { isAuthenticated: true }, { root: true });
            router.replace("/");
         } else {
            console.log("Not a admin account");
         }
         let id = snapshot.docs[0].id
         commit("setState", {
            currentUser: {
               id, name: user.name,
               email: user.email,
               password: user.password,
               roles: user.roles
            }
         });
         dispatch("Checkins/fetchCheckIn", id, { root: true });
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
   },
   updateUser: (state, payload) => {
      state.users.forEach(user => {
         user.id === payload.id && Object.keys(payload).forEach(key => user[key] = payload[key])
      })
   },
   filterUser: (state, payload) => {
      state.users = state.users.filter(user => user.id !== payload.id)
   }
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};
