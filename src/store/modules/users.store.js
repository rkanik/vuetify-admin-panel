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
   saveUserLoading: false,
   updateUserLoading: false,
   confirmDeleteLoading: false,
   currentUser: {}
});

const actions = {
   fetchUsers: async ({ commit }) => {
      let snapshot = await db.collection('users').get()
      let users = []; snapshot.forEach(doc => {
         users.push({
            id: doc.id,
            ...doc.data()
         })
      })
      commit("setState", { users })
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

const state = initialState();

const getters = {
   users: state => state.users,
   currentUser: state => state.currentUser,
   signinLoading: state => state.signinLoading,
   saveUserLoading: state => state.saveUserLoading,
   usersTableHeaders: state => state.usersTableHeaders,
   updateUserLoading: state => state.updateUserLoading,
   confirmDeleteLoading: state => state.confirmDeleteLoading
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};
