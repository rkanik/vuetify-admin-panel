<template>
   <div class="user-check-in position-relative mx-auto mt-5">
      <div v-if="loading" class="overlay position-absolute">
         <v-progress-circular class="position-absolute to-center" indeterminate color="green" />
      </div>
      <v-card :outlined="!loading" :elevation="loading?4:1">
         <v-list-item v-if="!loading" two-line>
            <v-list-item-content class="pb-0">
               <div class="overline mb-4">CHECK-IN</div>
               <v-list-item-title class="headline mb-4">My Check-In</v-list-item-title>
               <v-divider></v-divider>
               <template v-if="location.error">
                  <div class="py-6">
                     <p
                        v-if="location.code===1"
                     >Please allow location permission and reload your browser</p>
                     <a
                        href="https://support.google.com/chrome/answer/142065?hl=en"
                        target="_"
                     >How to allow location?</a>
                  </div>
               </template>
               <template v-else>
                  <div class="d-flex py-6">
                     <v-btn
                        :disabled="!checked.checkedIn"
                        rounded
                        outlined
                        class="mr-2"
                        color="green"
                     >
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
               </template>
            </v-list-item-content>
         </v-list-item>
         <v-card-actions v-if="!loading" class="pt-0 pb-6 pl-4">
            <v-btn
               v-if="!checked||checked.checkedOut||location.error||!validLocation"
               :disabled="checked.checkedOut||location.error||!validLocation"
               @click="$emit('checkin')"
               class="d-block success"
            >
               <v-icon left>check_circle</v-icon>
               <span v-if="!checked.checkedOut">Checkin now</span>
               <span v-else>Checked Out</span>
            </v-btn>
            <v-btn
               @click="$emit('checkout')"
               :disabled="!validLocation||checked.checkedOut"
               class="d-block red lighen-1 white--text"
            >
               <v-icon left>exit_to_app</v-icon>
               <span>Checkout</span>
            </v-btn>
         </v-card-actions>
      </v-card>
   </div>
</template>

<script>
export default {
   name: "check-in",
   props: {
      checked: undefined,
      loading: Boolean,
      location: Object,
      validLocation: Boolean
   }
};
</script>
<style >
.user-check-in {
   width: 512px;
   height: 250px;
}
.user-check-in,
.overlay {
   border-radius: 0.2rem;
}

.v-card,
.overlay {
   height: 100%;
}
.overlay {
   top: 0;
   left: 0;
   width: 100%;
   z-index: 10;
   background-color: rgba(255, 255, 255, 0.75);
}
</style>