const initialState = () => ({});

const actions = {};

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

const getters = {};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};
