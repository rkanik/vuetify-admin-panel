<template>
   <v-card class="mx-auto mt-5" max-width="450" outlined>
      <v-list-item two-line>
         <v-list-item-content class="pb-0">
            <div class="overline mb-4">CHECK-IN</div>
            <v-list-item-title class="headline mb-4">My Check-In</v-list-item-title>
            <v-divider></v-divider>
            <div class="d-flex py-6">
               <v-btn :disabled="!checked.checkedIn" rounded outlined class="mr-2" color="green">
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  <span v-if="checked.checkedIn">{{checked.checkedIn}}</span>
                  <span v-else>Not Checked in</span>
               </v-btn>

               <v-btn
                  :disabled="!checked.checkedOut"
                  rounded
                  outlined
                  class="mr-2"
                  color="red lighten-1"
               >
                  <v-icon left>mdi-location-exit</v-icon>
                  <span v-if="checked.checkedOut">{{checked.checkedOut}}</span>
                  <span v-else>Not checked out</span>
               </v-btn>
            </div>
         </v-list-item-content>
      </v-list-item>
      <v-card-actions class="pt-0 pb-6 pl-4">
         <v-btn
            v-if="!checked||checked.checkedOut"
            :disabled="checked.checkedOut?true:false"
            @click="$emit('checkin')"
            class="d-block success"
         >
            <v-icon left>check_circle</v-icon>
            <span v-if="!checked.checkedOut">Checkin now</span>
            <span v-else>Checked Out</span>
         </v-btn>
         <v-btn v-else @click="$emit('checkout')" dark class="d-block red lighen-1">
            <v-icon left>exit_to_app</v-icon>
            <span>Checkout</span>
         </v-btn>
      </v-card-actions>
   </v-card>
</template>

<script>
export default {
   name: "check-in",
   props: ["checked"]
};
</script>