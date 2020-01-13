<template>
   <v-container>
      <v-card elevation="1">
         <v-container class="pb-0">
            <div class="d-flex">
               <v-card-title>Check-ins</v-card-title>
               <v-spacer></v-spacer>
               <v-form ref="form" class="d-flex pr-6">
                  <v-select
                     class="mr-4"
                     :value="checkinsOf"
                     @change="fetchCheckInsOf"
                     :items="['Today','Yesterday','Last week','Last month']"
                  ></v-select>
                  <v-text-field
                     v-model="searchKey"
                     append-icon="search"
                     label="Search"
                     single-line
                     hide-details
                  />
               </v-form>
            </div>
         </v-container>
         <v-progress-linear v-if="progCheckinsTable" indeterminate color="green"></v-progress-linear>
         <v-data-table
            :headers="checkinsHeaders"
            :items="checkIns"
            :search="searchKey"
            :items-per-page="5"
         ></v-data-table>
      </v-card>
   </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
   name: "check-in",
   path: "/check-ins",
   data() {
      return {
         searchKey: "",
         TIME_IN_A_DAY: 1000 * 60 * 60 * 24, //86400000‬
         TIME_OF_TODAY: new Date(new Date().toDateString()).getTime()
      };
   },
   created() {
      this.fetchCheckInsOf(this.checkinsOf);
   },
   computed: {
      ...mapGetters("Checkins", ["checkIns", "checkinsHeaders", "checkinsOf"]),
      ...mapGetters("Progress", ["progCheckinsTable"])
   },
   methods: {
      ...mapActions("Checkins", ["fetchCheckIns"]),
      ...mapMutations("Checkins", ["setState"]),
      fetchCheckInsOf(checkinsOf) {
         this.setState({ checkinsOf });
         checkinsOf === "Today"
            ? this.fetchCheckIns(this.TIME_OF_TODAY)
            : checkinsOf === "Yesterday"
            ? this.fetchCheckIns(this.TIME_OF_TODAY - this.TIME_IN_A_DAY * 1)
            : checkinsOf === "Last week"
            ? this.fetchCheckIns(this.TIME_OF_TODAY - this.TIME_IN_A_DAY * 7)
            : checkinsOf === "Last month"
            ? this.fetchCheckIns(this.TIME_OF_TODAY - this.TIME_IN_A_DAY * 30)
            : false;
      }
   }
};
</script>
