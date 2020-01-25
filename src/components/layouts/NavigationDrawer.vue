<template>
   <v-navigation-drawer app v-model="isDrawer">
      <template v-slot:prepend>
         <v-list>
            <v-list-item>
               <img width="86" height="86" :src="require('../../assets/images/logo.jpg')" />
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
            <template v-for="item in items">
               <v-list-item :key="item.text" exact router :to="item.route">
                  <v-list-item-icon>
                     <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
               </v-list-item>
            </template>
         </v-list-item-group>
      </v-list>
   </v-navigation-drawer>
</template>

<script>
export default {
   name: "navigation-drawer",
   props: {
      drawer: Boolean,
      user: Object,
      isAdmin: Boolean,
      items: Array
   },
   data() {
      return {
         isDrawer: this.drawer
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
