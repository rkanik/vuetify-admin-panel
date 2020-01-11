<template>
   <v-app-bar class="elevation-2" app color="success px-6" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title
         ><span class="font-weight-light">Admin</span> Panel</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn text>
         <span>{{ currentUser.name }}</span>
         <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <!-- <cv-navigation-drawer /> -->
   </v-app-bar>
</template>

<script>
//import NavigationDrawer from "@/components/layouts/NavigationDrawer";
import { mapGetters } from "vuex";
export default {
   name: "appbar",
   components: {
      //"cv-navigation-drawer": NavigationDrawer
   },
   computed: {
      ...mapGetters("Users", ["currentUser"])
   }
};
</script>
