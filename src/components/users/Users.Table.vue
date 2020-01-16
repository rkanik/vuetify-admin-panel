<template>
   <v-card elevation="1">
      <v-container class="d-flex pb-0">
         <v-card-title>Users</v-card-title>
         <!-- <v-btn @click="$emit('refresh')" icon class="ml-4">
            <v-icon>mdi-refresh</v-icon>
         </v-btn>-->
         <v-spacer></v-spacer>
         <v-form ref="form" class="d-flex mr-4">
            <v-select
               class="mr-4"
               :value="select"
               @change="val=>$emit('select',val)"
               :items="['All','Users','Admins']"
            ></v-select>
            <v-text-field
               v-model="searchKey"
               append-icon="search"
               label="Search"
               single-line
               hide-details
            />
         </v-form>
      </v-container>
      <v-progress-linear v-if="progress" indeterminate color="green"></v-progress-linear>
      <v-data-table :headers="headers" :items="users" :search="searchKey" :items-per-page="5">
         <template v-slot:item.edit="{ item }">
            <v-icon class="mr-2" @click="$emit('updateUser',item)">edit</v-icon>
         </template>
         <template v-slot:item.delete="{ item }">
            <v-icon v-if="!item.roles.includes('ADMIN')" @click="$emit('deleteUser',item)">delete</v-icon>
         </template>
      </v-data-table>
   </v-card>
</template>

<script>
export default {
   name: "users-table",
   props: ["users", "headers", "select", "progress"],
   data() {
      return {
         searchKey: ""
      };
   }
};
</script>