<template>
   <div class="dashboard">
      <c-checkin @checkin="checkinUser" @checkout="checkoutUser" :checked="checkedIn" />
   </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
/** Components */
import Checkin from "../components/users/User.Checkin";
export default {
   name: "dashboard",
   path: "/",
   components: {
      "c-checkin": Checkin
   },
   computed: {
      ...mapGetters("Users", ["currentUser"]),
      ...mapGetters("Checkins", ["checkedIn"])
   },
   methods: {
      ...mapActions("Checkins", ["checkinUser", "checkoutUser"])
   }
};
</script>
