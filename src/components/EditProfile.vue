<template>
  <div id="edit-profile" class="">
    <p class="text-align-center robotoBold whitetext">Edit your information</p>
    <form @submit.prevent class="profile-form">
      <label for="input-username" class="robotoBold whitetext">New Username</label>
      <input type="text" name="username" id="input-username" v-model="newUsername">
      <label for="input-username" class="robotoBold whitetext">New Password</label>
      <input type="password" name="password" id="input-password" v-model="newPassword">
      <div class="button-holder">
        <p class="submit-button robotoBold whitetext" v-if="success==false" @click="updateAccount()">Submit</p>
        <p class="robotoBold whitetext" v-if="success==true">Success!</p>
        <p class="submit-button-close robotoBold whitetext" v-if="success==true"  @click="resetSuccess(); updateUserProp(); $emit('close');">Close</p>
      </div>
    </form>

  </div>
</template>

<script>
const client = require("../rbrneck-client")

export default {
  name: "EditProfile",
  props: ["user"],
  data() {
    return {
      newUsername: "",
      newPassword: "",

      errors: [],
      success: false,
    }
  },
  methods: {
    updateAccount() {
      let updatedAccount = {
        username: this.newUsername,
        password: this.newPassword,
      }
      client.updateAccountById(this.user.id, updatedAccount, this.user.accessToken, (errors) => {
        if (errors.length == 0) {
          this.success = true
        } else {
          this.errors = errors
        }
      })
    },
    resetSuccess() {
      this.success = false
    },
    updateUserProp() {
      this.user.username = this.newUsername
    }
  }
}
</script>

<style lang="css" scoped>
#edit-profile {
  margin-top: 25;
  padding: 15px;
  height: 320px;
  min-width: 600px;
  width: 66%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;

}
.profile-form {
  display: flex;
  flex-direction: column;

}
.profile-form label{
  margin-left: 60px;
}
.profile-form input {
  color: white;
  font-size: 14px;
  padding-left: 12.5px;
  margin: 10px 0 20px 0;
  border-radius: 5px;
  height: 40px;
  display: flex;
  align-self: center;
  justify-content: center;
  outline: none;
  border: none;
  min-width: 500px;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.03);

}
.submit-button {
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 35%;
  padding: 11px 12px 11px 12px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  font-size: 12px;
  text-transform: uppercase;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.submit-button-close {
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 20%;
  padding: 11px 12px 11px 12px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  font-size: 12px;
  text-transform: uppercase;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.submit-button:hover {

  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;

}
.button-holder {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

</style>
