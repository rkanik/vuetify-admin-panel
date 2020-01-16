<template>
   <div class="dashboard">
      <c-checkin
         @checkin="checkinUser"
         @checkout="checkoutUser"
         :checked="checkedIn"
         :loading="progLocation||progCheckin"
         :location="location"
         :validLocation="validLocation"
      />
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
      ...mapGetters("Auth", ["location", "validLocation"]),
      ...mapGetters("Users", ["currentUser"]),
      ...mapGetters("Checkins", ["checkedIn"]),
      ...mapGetters("Progress", ["progLocation", "progCheckin"])
   },
   methods: {
      ...mapActions("Checkins", ["checkinUser", "checkoutUser"])
   }
};
</script>
