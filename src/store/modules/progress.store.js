
const initialState = () => ({
   signin: false,
   usersTable: false,
   deleteUser: false,
   updateUser: false,
   initializing: false,
   checkinsTable: false,
   location: false,
   checkIn: false,
});

const state = initialState();

const getters = {
   progSignin: state => state.signin,
   progCheckinsTable: state => state.checkinsTable,
   progUsersTable: state => state.usersTable,
   initializing: state => state.initializing,
   progLocation: state => state.location,
   progCheckin: state => state.checkIn,
};


const actions = {

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
