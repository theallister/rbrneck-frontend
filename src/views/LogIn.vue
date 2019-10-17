<template>
    <div id="signup-container" class="view-container-main red-background thick-border-left whitetext">
        <h2 class="oswald uppercase text-align-center textshadow">Log in</h2>
        <p class="whiteText robotoThin smalltext-50percentwide text-align-center">
            Don't have an account? <router-link :to="'/signup'" class="no-style-link robotoBold whitetext">Sign up</router-link> to start sharing your thoughts!
        </p>
        <form @submit.prevent id="signup-form-container" class="robotoRegular">
            <span class="form-input-container">
                <label for="input-username">username:</label>
                <input v-model="username" type="text" name="username" id="input-username" class="redtext dropshadow grow-hover-small">
            </span>
            <span class="form-input-container">
                <label for="input-password">password:</label>
                <input v-model="password" type="password" name="password" id="input-password" class="redtext dropshadow grow-hover-small">
            </span>
            <input @click="logIn()" type="submit" value="Log in" id="form-submit" class="redtext uppercase oswald dropshadow grow-hover">
        </form>
        <div class="error-msg-container robotoRegular">
            <p v-for="error in errors" :key="error.id">
                <span v-if="error.includes('invalidClient')">
                    The username or password you entered is wrong. <br>
                </span>
                <span v-if="error.includes('serverError')">
                    Something went wrong... Try again later <br>
                </span>
            </p>
        </div>
    </div>
</template>
<script>
const client = require("../rbrneck-client")

export default {
  name: "logIn",
  props: ["user"],
  data() {
    return {
      username: "",
      password: "",

      errors: [],
      success: Boolean,
    }
  },
    methods: {
      logIn() {
        client.login(this.username, this.password, (errors, id, username, idToken, accessToken) => {
          this.errors = []
          if (errors.length == 0) {
            this.success = true
            //Korrigera prop i app.vue
            this.user.username = username
            this.user.accessToken = accessToken
            this.user.idToken = idToken
            this.user.isSignedIn = true
            this.user.id = id
            //Redirect till hem
            this.$router.push('/')

          } else {
            this.errors = errors
          }
        })
      }
    },
  }

</script>
<style scoped>
.no-style-link:hover {
  text-decoration: underline;
}
</style>
