<template>
   <v-app>
      <cv-appbar />
      <cv-navigation-drawer class="mt-12"/>
      <v-content>
         <router-view class="pa-4" />
      </v-content>
   </v-app>
</template>

<script>
import Appbar from "@/components/layouts/Appbar";
import NavigationDrawer from "@/components/layouts/NavigationDrawer";
export default {
   name: "App",
   components: {
      "cv-appbar": Appbar,
      "cv-navigation-drawer": NavigationDrawer
   }
};
</script>
