<template>
   <v-card elevation="1" class="pb-3">
      <v-card-text class="grey--text text--darken-3 pt-3 pb-0">
         <v-card-title>{{msg}} user</v-card-title>
         <v-card-subtitle>Please fill up form correctly</v-card-subtitle>
      </v-card-text>
      <v-divider />
      <v-container>
         <v-form ref="form" v-model="valid" class="px-8">
            <v-text-field
               v-model="user.name"
               prepend-icon="mdi-rename-box"
               type="text"
               label="Fullname"
               :rules="nameRules"
            />
            <v-text-field
               v-model="user.email"
               prepend-icon="mdi-email"
               type="email"
               label="Email address"
               :rules="emailRules"
            />
            <v-text-field
               v-model="user.password"
               prepend-icon="mdi-lock"
               @click:append="showPass=!showPass"
               :append-icon="showPass?'visibility':'visibility_off'"
               :type="showPass?'text':'password'"
               label="Password"
               :rules="passRules"
            />
            <div class="d-flex">
               <v-checkbox
                  v-model="user.roles"
                  value="USER"
                  label="User"
                  type="checkbox"
                  class="mr-4 mb-0"
                  required
               ></v-checkbox>
               <v-checkbox
                  v-model="user.roles"
                  v-if="isAdmin"
                  value="ADMIN"
                  label="Admin"
                  type="checkbox"
                  class="mb-0"
                  required
               ></v-checkbox>
            </div>
            <p
               v-if="user.roles.length==0"
               class="red--text caption"
            >Please select at least one option</p>
         </v-form>
      </v-container>
      <v-progress-linear v-if="loading" indeterminate color="green"></v-progress-linear>
      <v-divider class="mb-4" />
      <v-card-actions class="px-6">
         <v-spacer></v-spacer>
         <v-btn color="grey darken-2" text @click="closeDialog">Close</v-btn>
         <v-btn
            :disabled="!valid||user.roles.length==0"
            @click="saveUser"
            outlined
            color="success"
         >{{type}}</v-btn>
      </v-card-actions>
   </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
   name: "user-form",
   props: {
      type: String,
      msg: String,
      data: Object,
      loading: {
         type: Boolean,
         default: false
      },
      reset: Boolean
   },
   data() {
      return {
         user: this.data
            ? this.data
            : {
                 id: "",
                 name: "",
                 email: "",
                 password: "",
                 roles: ["USER"]
              },
         showPass: false,
         valid: true,
         nameRules: [v => !!v || "Name is required"],
         passRules: [v => !!v || "Password is required"],
         emailRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+\..+/.test(v) || "E-mail must be valid"
         ]
      };
   },
   computed: {
      ...mapGetters("Auth", ["isAdmin"])
   },
   methods: {
      getNewUser: () => ({
         id: "",
         name: "",
         email: "",
         password: "",
         roles: ["USER"]
      }),
      resetForm() {
         this.user = this.getNewUser();
         this.$refs.form.resetValidation();
      },
      closeDialog() {
         this.$emit("close");
         this.resetForm();
      },
      saveUser() {
         this.user.email = this.user.email.toLowerCase();
         if (this.type === "SAVE") {
            this.$emit("save", this.user);
         } else if (this.type === "UPDATE") {
            this.$emit("update", this.user);
         }
      }
   },
   watch: {
      reset() {
         this.resetForm();
      }
   }
};
</script>
