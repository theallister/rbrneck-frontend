<template>
  <div class="">
    <button @click="createAccount()">Create Account</button>
    <button @click="getAllAccounts()">Get All Accounts</button>
    <button @click="getAccountById()">Get Account By Id</button>
    <button @click="updateAccountById()">Update Account By Id</button>
    <button @click="deleteAccountById()">Delete Account By Id</button>
    <button @click="createItem()">Create Item</button>
    <button @click="login()">Login</button>
    <button @click="getAllItems()">Get All Items</button>
    <button @click="getItemById()">Get Item By Id</button>
    <button @click="updateItemById()">Update Item By Id</button>
    <button @click="deleteItemById()">Delete Item By Id</button>
    <button @click="createComment()">Create Comment</button>
    <button @click="getCommentsByItemId()">Get Comments By Item Id</button>




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
      commentId: Number,
      errors: [],
      accounts: [],
      account: [],
      items: [],
      item: [],
      comments: [],
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

      client.updateAccountById(id, updatedAccount, this.accessToken, (errors) => {
        if (errors.length == 0) {
          this.success = true
        } else {
          this.errors = errors
        }
      })
    },
    deleteAccountById() {
      let id = this.id

      client.deleteAccountById(id, this.accessToken, (errors) => {
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

      client.createItem(item, this.accessToken, (errors, id) => {
        if (errors.length == 0) {
          this.success = true
        } else {
          this.errors = errors
        }
      })
    },
    getAllItems() {
      client.getAllItems((errors, items) => {
        if (errors.length == 0) {
          this.success = true
          this.items = items
        } else {
          this.errors = errors
        }
      })
    },
    getItemById() {
      let id = this.id

      client.getItemById(id, (errors, item) => {
        if (errors.length == 0) {
          this.success = true
          this.item = item
        } else {
          this.errors = errors
        }
      })
    },
    updateItemById() {
      let updatedItem = {
        accountId: this.id,
        title: "Jeff's Magical Adventure",
        series: 0,
        season: null,
        episode: null,
        watched: 0
      }
      client.updateItemById(this.id, updatedItem, this.accessToken, (errors) => {
        if (errors.length == 0) {
          this.success = true
        } else {
          this.errors = errors
        }
      })
    },
    deleteItemById() {
      let id = this.id

      client.deleteItemById(id, this.accessToken, (errors) => {
        if (errors.length == 0) {
          this.success = true
        } else {
          this.errors = errors
        }
      })
    },
    createComment() {
      let id = 1
      let comment = {
        accountId: 1,
        itemId: 1,
        text: "Haha, jag garvar läppen av mig"
      }
      client.createComment(comment, id, accessToken, (errors) => {
        if (errors.length == 0) {
          this.success = true
        } else {
          this.errors = errors
        }
      })
    },
    getCommentsByItemId() {
      let itemId = 1

      client.getCommentsByItemId(itemId, (errors, comments) => {
        if (errors.length == 0) {
          this.success = true
          this.comments = comments
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
