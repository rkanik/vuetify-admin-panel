<template>
   <div class="users">
      <v-container>
         <cv-users-table
            @refresh="fetchUsers"
            @updateUser="onUpdateUser"
            :users="users"
            :headers="usersTableHeaders"
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
            @update="updateUser"
            @close="updateUserDialog=false"
            :type="'UPDATE'"
            :msg="'Update'"
            :data="selectedUser"
            :loading="dialogLoading"
            :reset="updateUserDialog"
         />
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
         dialogLoading: false,
         selectedUser: {
            name: "",
            email: "",
            password: "",
            roles: ["USER"]
         }
      };
   },
   computed: {
      ...mapGetters("Users", ["saveUserLoading", "users", "usersTableHeaders"])
   },
   methods: {
      ...mapActions("Users", ["saveNewUser", "updateUser", "fetchUsers"]),
      onUpdateUser(user) {
         this.selectedUser = user;
         this.updateUserDialog = true;
      }
   },
   watch: {
      saveUserLoading(val) {
         this.addUserDialog = val;
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
