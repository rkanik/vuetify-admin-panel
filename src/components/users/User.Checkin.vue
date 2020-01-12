<template>
   <v-card max-width="320">
      <v-card-title>CHECKIN</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
         <div>
            <p class="subtitle-1 mb-1">Your Checkin</p>
            <p class="mb-0">
               Checkin:
               <span v-if="checked.checkedIn">{{checked.checkedIn}}</span>
               <span v-else>Not Checked in yet</span>
            </p>
            <p class="mb-0">
               Checkout:
               <span v-if="checked.checkedOut">{{checked.checkedOut}}</span>
               <span v-else>Not checked out</span>
            </p>
         </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pb-4 pl-4 pt-4">
         <v-btn
            v-if="!checked||checked.checkedOut"
            :disabled="checked.checkedOut?true:false"
            @click="$emit('checkin')"
            class="d-block success"
         >
            <v-icon left>check_circle</v-icon>
            <span>Checkin now</span>
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