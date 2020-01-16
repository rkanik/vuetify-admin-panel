import db from "../../firebase/firebase.init";
import moment from "moment"
const initialState = () => ({
   checkIns: [],
   checkinsHeaders: [
      { text: "User ID", value: "userId" },
      { text: "Date", value: "date" },
      { text: "Checked In", value: "checkedIn" },
      { text: "Checked out", value: "checkedOut" },
      { text: "Passed", value: "passed" }
   ],
   checkedIn: false,
   checkinsOf: "Today"
});

const state = initialState();

const getters = {
   checkinsOf: state => state.checkinsOf,
   checkIns: state => (state.checkIns.map(c => ({
      ...c,
      date: moment(c.date).format("L"),
      checkedIn: moment(c.checkedIn).format('LTS'),
      checkedOut: c.checkedOut ? moment(c.checkedOut).format('LTS') : "Not Checked out yet!",
   }))),
   checkinsHeaders: state => state.checkinsHeaders,
   checkedIn: state => state.checkedIn && ({
      userId: state.checkedIn.userId,
      checkedIn: moment(state.checkedIn.checkedIn).format('LTS'),
      checkedOut: state.checkedIn.checkedOut && moment(state.checkedIn.checkedOut).format('LTS')
   })
};

const actions = {
   fetchCheckIns: async ({ commit, rootState }, TIME) => {

      commit("Progress/setState", { checkinsTable: true }, { root: true })
      let query = db.collection('check-ins')
      rootState.Auth.isAdmin
         ? query = query
            .where("date", ">=", TIME)
            .orderBy("date", "desc")
         : query = query.where("userId", "==", rootState.Auth.currentUser.id)

      let snapshot = await query.get()
      let checkIns = []
      !snapshot.empty && snapshot.forEach(doc => {
         let data = doc.data()
         let inMinute, inHour = 0, passed = ""
         data.checkedOut
            ? (inMinute = Math.round((data.checkedOut - data.checkedIn) / (1000 * 60)),
               inHour = Math.floor(inMinute / 60),
               passed = `${inHour !== 0 ? inHour + " hour " : ""}${inMinute - (inHour * 60)} minutes`
            ) : passed = ""
         checkIns.push({ ...data, passed })
      })

      console.log(checkIns);

      commit("setState", { checkIns })
      commit("Progress/setState", { checkinsTable: false }, { root: true })
   },
   fetchCheckIn: async ({ commit }, payload) => {
      commit("Progress/setState", { checkIn: true }, { root: true })
      let today = new Date(new Date().toDateString()).getTime()

      let res = await db.collection('check-ins')
         .where("userId", "==", payload)
         .where("date", "==", today)
         .get()

      let data = res.docs[0] && res.docs[0].data()
      let state = res.empty ? { checkedIn: false } : { checkedIn: data }
      setTimeout(() => {
         commit('setState', state)
         commit("Progress/setState", { checkIn: false }, { root: true })
      }, 500);

   },
   checkinUser: async ({ commit, rootState }) => {
      try {
         let data = {
            userId: rootState.Auth.currentUser.id,
            checkedIn: Date.now(),
            date: new Date(new Date().toDateString()).getTime()
         }
         await db.collection('check-ins').add(data)
         commit("setState", { checkedIn: data })
      } catch (error) {
         console.log("error check in", error);
      }
   },
   checkoutUser: async ({ commit, state, rootState }) => {
      try {
         let now = Date.now()
         let today = new Date(new Date().toDateString()).getTime()
         let res = await db.collection('check-ins')
            .where("userId", "==", rootState.Auth.currentUser.id)
            .where("date", "==", today)
            .get()
         !res.empty && res.docs[0].ref.update({ checkedOut: now })
         commit("setState", {
            checkedIn: {
               ...state.checkedIn, checkedOut: now
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

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};
