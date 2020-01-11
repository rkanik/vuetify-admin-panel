<template>
   <v-app>
      <cv-appbar v-if="isAuthenticated" />
      <!-- <cv-navigation-drawer class="mt-12"/> -->
      <v-content>
         <router-view class="pa-4" />
      </v-content>
   </v-app>
</template>

<script>
import Appbar from "@/components/layouts/Appbar";
import { mapGetters } from "vuex";
//import NavigationDrawer from "@/components/layouts/NavigationDrawer";
export default {
   name: "App",
   components: {
      "cv-appbar": Appbar
      //"cv-navigation-drawer": NavigationDrawer
   },
   computed: {
      ...mapGetters(["isAuthenticated"])
   }
};
</script>
