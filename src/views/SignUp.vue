<template>
    <div id="signup-container" class="view-container-main red-background thick-border-left whitetext">
        <h2 class="oswald uppercase text-align-center textshadow">sign up</h2>
        <p class="whiteText robotoThin smalltext-50percentwide text-align-center">
            Watching a show? Got a lot to say? Join RBRNECK to share your insights with the rest of the community!
        </p>
        <form @submit.prevent id="signup-form-container" class="robotoRegular">
            <span class="form-input-container">
                <label for="input-username">username:</label>
                <input type="text" name="username" id="input-username" v-model="username" class="redtext dropshadow grow-hover-small" @input="usernameHint=true">
                <p class="input-hint robotoThin" v-if="usernameHint">Your username may contain letters and numbers; between 3 and 15 characters</p>
            </span>
            <span class="form-input-container">
                <label for="input-password">password:</label>
                <input type="password" name="password" id="input-password" v-model="password" class="redtext dropshadow grow-hover-small" @input="passwordHint=true">
                <p class="input-hint robotoThin" v-if="passwordHint">Your password may contain letters and numbers; between 5 and 20 characters</p>
            </span>
            <input type="submit" value="sign up" id="form-submit" @click="createAccount()" class="redtext uppercase oswald dropshadow grow-hover">
        </form>
        <div class="error-msg-container robotoRegular whitetext">
            <p v-for="error in errors" :key="error.id">
                <span v-if="error.includes('badRequest')">
                    Your username must be 3-15 characters, password 5-20 characters. <br>
                </span>
                <span v-if="error.includes('unprocessableEntry')">
                    Username and password may only contain letters and numbers. <br>
                </span>
                <span v-if="error.includes('usernameTaken')">
                    The username is taken! Try another one. <br>
                </span>
                <span v-if="error.includes('serverError')">
                    Something went wrong... Try again later! <br>
                </span>
            </p>
        </div>
    </div>
</template>
<script>
const client = require("../rbrneck-client")

export default {
    name: 'signup',
    data() {
      return {
        username: "",
        password: "",
        success: Boolean,
        errors: [],
        usernameHint: false,
        passwordHint: false
      }
    },
    methods: {
      createAccount() {
        let account = {
          username: this.username,
          password: this.password
        }
        client.createAccount(account, (errors, id) => {
          if (errors.length == 0) {
            this.success = true
            this.$router.push('/login')

          } else {
            this.errors = errors
          }
        })
      }
    }

}
</script>
<style>
.form-input-container {
    display: flex;
    flex-flow: column;
    width: 80%;
    margin: 2% auto;
}
.form-input-container label {
    text-indent: 15px;
    margin-bottom: 5px;
}
.form-input-container input {
    font-size: 1em;
    line-height: 1.7em;
    padding: 1% 2.5%;

    border-radius: 10px;

    border: none;
}
#form-submit {
    box-sizing: content-box;
    padding: 1% 5%;
    font-size: 1em;
    border: none;
    border-radius: 10px;
    display: block;
    margin: 2.5% auto;
}
</style>
