<template>
  <div id="profile">
    <div class="profile-header">
      <h1 class="oswald whitetext uppercase">Hello, {{this.user.username}}</h1>
    </div>
    <div class="profile-items">
      <p class="robotoRegular whitetext">This is what you have watched so far</p>
    </div>
  </div>
</template>

<script>
const client = require("../rbrneck-client")

export default {
  name: "profile",
  props: ["user"],
  data() {
    return {
      items: [],
      specificItems: [],
      errors: [],

      success: Boolean,
    }
  },
  created() {
    client.getAllItems((errors, items) => {
      if (errors.length == 0) {
        this.success = true
        this.items = items
      } else {
        this.errors = errors
      }
    })
  },

}
</script>

<style lang="css" scoped>
#profile {
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.profile-header {
  width: 100%;
  border-radius: 33px;
}
.profile-header h1{
  padding: 10px 2.5px 2.5px 10px;
}
.profile-items p {
  padding: 2.5px 2.5px 2.5px 10px;
}
</style>
