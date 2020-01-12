import db from "../../firebase/firebase.init";
import moment from "moment"
const initialState = () => ({
   checkIns: [],
   checkinsHeaders: [
      { text: "User ID", value: "userId" },
      { text: "Checked In", value: "checkedIn" },
      { text: "Checked out", value: "checkedOut" },
      { text: "Passed", value: "passed" }
   ],
   checkedIn: false
});

const actions = {
   fetchCheckIns: async ({ commit }) => {
      let today = new Date(new Date().toDateString()).getTime()
      let snapshot = await db.collection('check-ins').where("date", "==", today).get()
      let checkIns = []
      !snapshot.empty && snapshot.forEach(doc => {
         let data = doc.data()
         checkIns.push({
            userId: data.userId,
            checkedIn: moment(data.checkedIn).format('MMMM Do YYYY, h:mm:ss a'),
            checkedOut: data.checkedOut && moment(data.checkedOut).format('MMMM Do YYYY, h:mm:ss a'),
         })
      })
      commit("setState", { checkIns })
   },
   fetchCheckIn: async ({ commit }, payload) => {
      let today = new Date(new Date().toDateString()).getTime()
      let res = await db.collection('check-ins')
         .where("userId", "==", payload)
         .where("date", "==", today)
         .get()

      let data = res.docs[0] && res.docs[0].data()
      let state = res.empty ? { checkedIn: false } : {
         checkedIn: {
            userId: data.userId,
            checkedIn: moment(data.checkedIn).format('MMMM Do YYYY, h:mm:ss a'),
            checkedOut: data.checkedOut && moment(data.checkedOut).format('MMMM Do YYYY, h:mm:ss a'),
         }
      }
      commit('setState', state)
   },
   checkinUser: async ({ commit, rootState }) => {
      try {
         let data = {
            userId: rootState.Auth.currentUser.id,
            checkedIn: Date.now(),
            date: new Date(new Date().toDateString()).getTime()
         }
         await db.collection('check-ins').add(data)
         commit("setState", {
            checkedIn: {
               userid: data.userId,
               checkedIn: moment(data.checkedIn).format('MMMM Do YYYY, h:mm:ss a'),
               date: moment(data.date).format('MMMM Do YYYY, h:mm:ss a')
            }
         })
      } catch (error) {
         console.log("error check in", error);
      }
   },
   checkoutUser: async ({ commit, state, rootState }) => {
      try {
         let now = Date.now()
         let res = await db.collection('check-ins').where("userId", "==", rootState.Auth.currentUser.id).get()
         !res.empty && res.docs[0].ref.update({ checkedOut: now })
         commit("setState", {
            checkedIn: {
               ...state.checkedIn,
               checkedOut: moment(now).format('MMMM Do YYYY, h:mm:ss a')
            }
         })
      } catch (error) {
         console.log("Error while checking out", error);
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
   checkIns: state => (state.checkIns.map(c => ({
      userId: c.userId,
      checkedIn: c.checkedIn,
      checkedOut: c.checkedOut ? c.checkedOut : "Not Checked out yet!"
   }))),
   checkinsHeaders: state => state.checkinsHeaders,
   checkedIn: state => state.checkedIn
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};
