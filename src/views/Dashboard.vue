<template>
   <div class="dashboard">
      <h1 class="headline">DASHBOARD</h1>
      {{currentUser}}
   </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   name: "dashboard",
   path: "/",
   components: {},
   computed: {
      ...mapGetters("Users", ["currentUser"])
   }
};
</script>
