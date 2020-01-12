<template>
   <v-navigation-drawer app v-model="isDrawer">
      <template v-slot:prepend>
         <v-list>
            <v-list-item>
               <img width="86" height="64" src="http://www.cystemarts.com/Images/logo.png"/>
               <!-- <v-list-item-avatar width="64" height="64"></v-list-item-avatar> -->
            </v-list-item>
            <v-list-item link two-line>
               <v-list-item-content>
                  <v-list-item-title class="title">{{user.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
               </v-list-item-content>
               <v-list-item-action>
                  <v-icon>mdi-menu-down</v-icon>
               </v-list-item-action>
            </v-list-item>
         </v-list>
      </template>
      <v-divider></v-divider>
      <v-list shaped dense>
         <v-list-item-group color="success">
            <v-list-item v-for="item in navItems" :key="item.text" exact router :to="item.route">
               <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
               </v-list-item-icon>
               <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
         </v-list-item-group>
      </v-list>
   </v-navigation-drawer>
</template>

<script>
export default {
   name: "navigation-drawer",
   props: {
      drawer: Boolean,
      user: Object
   },
   data() {
      return {
         isDrawer: this.drawer,
         navItems: [
            { text: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
            { text: "Users", icon: "mdi-account-group", route: "/users" },
            { text: "Checkins", icon: "mdi-check-circle", route: "/check-ins" }
         ]
      };
   },
   watch: {
      drawer(val) {
         this.isDrawer = val;
      },
      isDrawer(val) {
         this.$emit("drawer", val);
      }
   }
};
</script>
