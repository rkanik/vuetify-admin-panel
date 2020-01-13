<template>
   <nav>
      <v-app-bar class="elevation-2" app color="success px-6" dark>
         <v-app-bar-nav-icon @click="drawerExpanded=!drawerExpanded"></v-app-bar-nav-icon>
         <v-toolbar-title>
            <span class="font-weight-light">Admin</span> Panel
         </v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn text @click="signOut">
            <span>{{ currentUser.name }}</span>
            <v-icon right>exit_to_app</v-icon>
         </v-btn>
      </v-app-bar>
      <cv-navigation-drawer
         @drawer="a=>drawerExpanded=a"
         :drawer="drawerExpanded"
         :user="currentUser"
         :isAdmin="isAdmin"
         :items="navItems"
      />
   </nav>
</template>

<script>
import NavigationDrawer from "@/components/layouts/NavigationDrawer";
import { mapGetters, mapActions } from "vuex";
export default {
   name: "appbar",
   data: () => ({
      drawerExpanded: true
   }),
   components: {
      "cv-navigation-drawer": NavigationDrawer
   },
   computed: {
      ...mapGetters("Auth", ["currentUser", "isAdmin"]),
      ...mapGetters("UI", ["navItems"])
   },
   methods: {
      ...mapActions("Auth", ["signOut"])
   }
};
</script>
