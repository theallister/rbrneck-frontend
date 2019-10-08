<template>
  <button @click="createAccount()"></button>
</template>




<script>
const client = require('../rbrneck-client')

export default {
  name: "sign-up",
  data() {
    return {
      username: "HardcodedName10",
      password: "HardcodedPassword10",
      errors: [],
      success: Boolean
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
        } else {
          this.errors = errors
        }
      })

    }
  }
}
</script>

<style lang="css" scoped>
</style>
