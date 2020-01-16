<template>
   <v-app>
      <v-progress-linear v-if="initializing" indeterminate color="green" />
      <cv-appbar v-if="authenticated&&!initializing" />
      <v-content>
         <router-view v-if="!initializing" class="pa-4" />
      </v-content>
   </v-app>
</template>

<script>
import Appbar from "@/components/layouts/Appbar";
import { mapGetters } from "vuex";
export default {
   name: "App",
   components: {
      "cv-appbar": Appbar
   },
   computed: {
      ...mapGetters("Auth", ["authenticated"]),
      ...mapGetters("Progress", ["initializing"])
   },
   created() {
      this.$store.dispatch("Auth/initialize");
   }
};
</script>

<style >
.position-relative {
   position: relative;
}
.position-absolute {
   position: absolute;
}
.to-center {
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
}
.v-application {
   background-color: #e8f5e9 !important;
}
</style>
