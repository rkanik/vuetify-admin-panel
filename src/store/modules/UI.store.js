
const defNavItems = () => ([
   { text: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
   {
      text: "Users",
      icon: "mdi-account-group",
      route: "/users"
   },
   { text: "Checkins", icon: "mdi-check-circle", route: "/check-ins" }
])

const initialState = () => ({
   navItems: defNavItems()
});

const actions = {
};

const mutations = {
   setState: (state, payload) => {
      Object.keys(payload).forEach(key => (state[key] = payload[key]));
   },
   resetState: state => {
      let newState = initialState();
      Object.keys(newState).forEach(key => (state[key] = newState[key]));
   },
   removeNavItem: (state, payload) => {
      state.navItems = state.navItems.filter(item => !payload.includes(item.route))
   },
   resetNavItems: state => {
      state.navItems = defNavItems()
   }
};

const state = initialState();

const getters = {
   navItems: state => state.navItems
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};
