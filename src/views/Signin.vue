<template>
   <v-container>
      <v-card outlined max-width="512" class="mx-auto my-12">
         <v-card-text class="success white--text">
            <v-card-title>
               <p class="title mb-0">Signin</p>
            </v-card-title>
            <v-card-subtitle class="grey--text text--lighten-2">
               <p class="subtitle-1 mb-0">Signin with your email and password</p>
            </v-card-subtitle>
         </v-card-text>
         <v-container class="pb-0">
            <v-form ref="form" class="px-6" v-model="valid">
               <v-text-field
                  prepend-icon="account_circle"
                  v-model="user.email"
                  :rules="emailRules"
                  type="email"
                  name="email"
                  label="Email address"
                  required
               />
               <v-text-field
                  @click:append="showPassword = !showPassword"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passRules"
                  v-model="user.password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  required
               />
               <v-checkbox v-model="user.remember" label="Remember me?" class="mt-0" required></v-checkbox>
            </v-form>
         </v-container>
         <div class="pos-rel mx-6 mb-4" v-if="errSignin">
            <v-alert type="error" outlined dense class="ma-0">Wrong Email address or Password !</v-alert>
            <v-btn @click="setState({signin:false})" icon class="pos-abs top-1 right-1">
               <v-icon class="red--text text--lighten-1">mdi-close-circle</v-icon>
            </v-btn>
         </div>
         <v-progress-linear v-if="progSignin" indeterminate color="green"></v-progress-linear>
         <v-divider></v-divider>
         <v-container>
            <v-card-actions class="px-4">
               <v-btn :disabled="!valid" outlined color="success" @click="signinAdmin">Signin</v-btn>
               <v-btn text color="info">Forgot Password?</v-btn>
            </v-card-actions>
         </v-container>
      </v-card>
   </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
   name: "signin",
   path: "/signin",
   data: () => ({
      valid: true,
      showPassword: false,
      error: false,
      user: {
         email: "",
         password: "",
         remember: false
      },
      passRules: [v => !!v || "Password is required"],
      emailRules: [
         v => !!v || "E-mail is required",
         v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
   }),
   computed: {
      ...mapGetters("Progress", ["progSignin"]),
      ...mapGetters("Error", ["errSignin"])
   },
   methods: {
      ...mapActions("Auth", ["fetchUserByEmailPass"]),
      ...mapMutations("Error", ["setState"]),
      signinAdmin() {
         this.user.email = this.user.email.toLowerCase();
         this.fetchUserByEmailPass(this.user);
      }
   },
   watch: {
      errSignin(val) {
         this.error = val;
      }
   }
};
</script>
<style>
.pos-abs {
   position: absolute;
}
.pos-rel {
   position: relative;
}
.top-0 {
   top: 0;
}
.top-1 {
   top: 0.1rem;
}
.right-0 {
   right: 0;
}
.right-1 {
   right: 0.1rem;
}
</style>