<template>
  <div class="">
    <button @click="createAccount()">Create Account</button>
    <button @click="getAllAccounts()">Get All Accounts</button>
    <button @click="getAccountById()">Get Account By Id</button>
    <button @click="updateAccountById()">Update Account By Id</button>
  </div>
</template>




<script>
const client = require('../rbrneck-client')

export default {
  name: "sign-up",
  data() {
    return {
      username: "HardcodedName12",
      password: "HardcodedPassword12",
      id: 1,
      errors: [],
      accounts: [],
      account: [],
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

    },
    getAllAccounts() {
      client.getAllAccounts((errors, accounts) => {
        if (errors.length == 0) {
          this.success = true
          this.accounts = accounts
        } else {
          this.errors = errors
        }
      })
    },
    getAccountById() {
      let id = this.id
      client.getAccountById(id, (errors, account) => {
        if (errors.length == 0) {
          this.success = true
          this.account = account
        } else {
          this.errors = errors
        }
      })
    },
    updateAccountById() {
      let id = this.id
      let updatedAccount = {
        username: this.username,
        password: this.password
      }

      client.updateAccountById(id, updatedAccount, (errors) => {
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
