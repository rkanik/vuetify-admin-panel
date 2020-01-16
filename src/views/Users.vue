<template>
   <div class="users">
      <v-container>
         <cv-users-table
            @refresh="fetchUsers"
            @updateUser="onUpdateUser"
            @deleteUser="onDeleteUser"
            @select="fetchUsers"
            :users="users"
            :headers="usersTableHeaders"
            :select="'All'"
            :progress="progUsersTable"
         />
      </v-container>
      <v-container>
         <v-btn @click="addUserDialog=true" fab color="success fab-add-user">
            <v-icon>mdi-plus</v-icon>
         </v-btn>
      </v-container>
      <v-dialog class="elevation-1" v-model="addUserDialog" persistent max-width="512">
         <c-user-form
            @save="saveNewUser"
            @close="addUserDialog=false"
            :type="'SAVE'"
            :msg="'Add a new'"
            :loading="saveUserLoading"
            :reset="addUserDialog"
         />
      </v-dialog>
      <v-dialog class="elevation-1" v-model="updateUserDialog" persistent max-width="512">
         <c-user-form
            v-if="updateUserDialog"
            @update="updateUser"
            @close="updateUserDialog=false"
            :type="'UPDATE'"
            :msg="'Update'"
            :data="selectedUser"
            :loading="updateUserLoading"
            :reset="updateUserDialog"
         />
      </v-dialog>
      <v-dialog v-model="deleteConfirm" persistent max-width="512">
         <v-card>
            <v-card-title class="red lighten-5">Confirm delete</v-card-title>
            <v-progress-linear v-if="confirmDeleteLoading" indeterminate color="red"></v-progress-linear>
            <v-card-actions class="px-6 py-4">
               <v-spacer></v-spacer>
               <v-btn @click="(deleteConfirm=false,selectedUser={})" text color="grey">No</v-btn>
               <v-btn @click="deleteUser(selectedUser)" color="red white--text lighten-1">Yes</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
import userForm from "../components/users/userForm";
import UsersTable from "../components/users/Users.Table";
import { mapActions, mapGetters } from "vuex";
export default {
   name: "users",
   path: "/users",
   components: {
      "c-user-form": userForm,
      "cv-users-table": UsersTable
   },
   data() {
      return {
         addUserDialog: false,
         updateUserDialog: false,
         deleteConfirm: false,
         selectedUser: {}
      };
   },
   computed: {
      ...mapGetters("Users", [
         "saveUserLoading",
         "updateUserLoading",
         "confirmDeleteLoading",
         "users",
         "usersTableHeaders"
      ]),
      ...mapGetters("Progress", ["progUsersTable"])
   },
   created() {
      this.fetchUsers();
   },
   methods: {
      ...mapActions("Users", [
         "saveNewUser",
         "updateUser",
         "deleteUser",
         "fetchUsers"
      ]),
      onUpdateUser(user) {
         this.selectedUser = user;
         this.updateUserDialog = true;
      },
      onDeleteUser(user) {
         this.deleteConfirm = true;
         this.selectedUser = user;
      }
   },
   watch: {
      saveUserLoading(val) {
         this.addUserDialog = val;
      },
      updateUserLoading(val) {
         this.updateUserDialog = val;
      },
      confirmDeleteLoading(val) {
         this.deleteConfirm = val;
      }
   }
};
</script>
<style scoped>
.fab-add-user {
   position: fixed;
   right: 2rem;
   bottom: 3rem;
}
</style>
