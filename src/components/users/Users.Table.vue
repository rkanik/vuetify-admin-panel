<template>
   <v-card elevation="1">
      <v-card-title>
         Users table
         <v-btn @click="$emit('refresh')" icon class="ml-4">
            <v-icon>mdi-refresh</v-icon>
         </v-btn>
         <v-spacer></v-spacer>
         <v-text-field
            v-model="searchKey"
            append-icon="search"
            label="Search"
            single-line
            hide-details
         />
      </v-card-title>
      <v-data-table :headers="headers" :items="users" :search="searchKey" :items-per-page="5">
         <template v-slot:item.edit="{ item }">
            <v-icon class="mr-2" @click="$emit('updateUser',item)">edit</v-icon>
         </template>
         <template v-slot:item.delete="{ item }">
            <v-icon @click="deleteItem(item)">delete</v-icon>
         </template>
      </v-data-table>
   </v-card>
</template>

<script>
export default {
   name: "users-table",
   props: ["users", "headers"],
   data() {
      return {
         searchKey: ""
      };
   }
};
</script>