<template>
    <div id="signup-container" class="view-container-main red-background thick-border-left whitetext">
        <h2 class="oswald uppercase text-align-center">Log in</h2>
        <p class="whiteText robotoThin smalltext-50percentwide text-align-center">
            Log in and start sharing your thoughts!
        </p>
        <form @submit.prevent id="signup-form-container" class="robotoRegular">
            <span class="form-input-container">
                <label for="input-username">username:</label>
                <input v-model="username" type="text" name="username" id="input-username" class="redtext">
            </span>
            <span class="form-input-container">
                <label for="input-password">password:</label>
                <input v-model="password" type="password" name="password" id="input-password" class="redtext">
            </span>
            <input @click="logIn()" type="submit" value="Log in" id="form-submit" class="redtext uppercase robotoBold">
            <input @click="deleteCommentById()" type="submit" value="Delete" class="redtext uppercase robotoBold">
        </form>
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
      },
      deleteCommentById() {
        let itemId = 1
        let commentId = 2
        client.deleteCommentById(itemId, commentId, this.user.accessToken, (errors) => {
          if (errors.length == 0) {
            this.success = true
          } else {
            this.errors = errors
          }
        })
      }
    },
  }

</script>
<style scoped>

</style>
