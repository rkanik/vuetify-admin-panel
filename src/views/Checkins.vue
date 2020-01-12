<template>
   <v-container>
      <v-card elevation="1">
         <v-card-title>
            Today's Check-Ins
            <!-- <v-btn @click="$emit('refresh')" icon class="ml-4">
               <v-icon>mdi-refresh</v-icon>
            </v-btn> -->
            <v-spacer></v-spacer>
            <v-text-field
               v-model="searchKey"
               append-icon="search"
               label="Search"
               single-line
               hide-details
            />
         </v-card-title>
         <v-data-table
            :headers="checkinsHeaders"
            :items="checkIns"
            :search="searchKey"
            :items-per-page="5"
         >
            <!-- <template v-slot:item.edit="{ item }">
               <v-icon class="mr-2" @click="$emit('updateUser',item)">edit</v-icon>
            </template>
            <template v-slot:item.delete="{ item }">
               <v-icon @click="$emit('deleteUser',item)">delete</v-icon>
            </template>-->
         </v-data-table>
      </v-card>

      <!-- <v-card elevation="1">
         <v-card-title>Today's Check-ins</v-card-title>
         <v-divider></v-divider>
         <v-list three-line>
            <template v-for="(item,key) in checkIns">
               <v-list-item :key="item.userId+key">
                  <v-list-item-content>
                     <v-list-item-title>USER ID: {{item.userId}}</v-list-item-title>
                     <v-list-item-subtitle>
                        <span>Checkin:</span>
                        <span>{{item.checkedIn}}</span>
                     </v-list-item-subtitle>
                     <v-list-item-subtitle>
                        <span>Checkout:</span>
                        <span
                           v-if="item.checkedOut"
                        >{{item.checkedOut}}</span>
                        <span v-else>Not checked out</span>
                     </v-list-item-subtitle>
                  </v-list-item-content>
               </v-list-item>
               <v-divider v-if="key !== checkIns.length-1" :key="key" />
            </template>
         </v-list>
      </v-card>-->
   </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
   name: "check-in",
   path: "/check-ins",
   data() {
      return {
         searchKey: ""
      };
   },
   created() {
      this.fetchCheckIns();
   },
   computed: {
      ...mapGetters("Checkins", ["checkIns", "checkinsHeaders"])
   },
   methods: {
      ...mapActions("Checkins", ["fetchCheckIns"])
   }
};
</script>
