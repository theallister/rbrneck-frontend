<template>
  <div class="">
    <button @click="createAccount()">Create Account</button>
    <button @click="getAllAccounts()">Get All Accounts</button>
    <button @click="getAccountById()">Get Account By Id</button>
    <button @click="updateAccountById()">Update Account By Id</button>
    <button @click="deleteAccountById()">Delete Account By Id</button>
    <button @click="createItem()">Create Item</button>
    <button @click="login()">Login</button>
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
      id: 3,
      errors: [],
      accounts: [],
      account: [],
      success: Boolean,
      accessToken: "",
      idToken: "",
      loggedInUser: ""
    }
  },
  methods: {
    login() {
      let credentials = {
        username: this.username,
        password: this.password
      }
      client.login(credentials.username, credentials.password, (errors, id, username, idToken, accessToken) => {
        if (errors.length == 0) {
          this.success = true
          this.idToken = idToken
          this.accessToken = accessToken
          this.loggedInUser = username
        } else {
          this.errors = errors
        }
      })
    },
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
    },
    deleteAccountById() {
      let id = this.id

      client.deleteAccountById(id, (errors) => {
        if (errors.length == 0) {
          this.success = true
        } else {
          this.errors = errors
        }
      })
    },
    createItem() {
      let item = {
        accountId: this.id,
        title: "My Little Pony",
        series: 0,
        season: null,
        episode: null,
        watched: 0
      }

      client.createItem(item, (errors, id) => {
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
