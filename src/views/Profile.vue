<template>
  <div id="profile">
    <div class="profile-header">
      <h1 class="oswald whitetext uppercase">Hello, {{this.user.username}}</h1>
    </div>
    <div class="profile-items-header">
      <p class="robotoRegular whitetext">This is what you have watched so far</p>
    </div>
    <div v-for="item in items" :key="item.id" class="profile-items">
      <router-link :to="'/items/' + item.id" class="profile-item-wrap">
        <p class="robotoBold whitetext">{{item.title}}</p>
        <span class="button-arrow-to-right"></span>
      </router-link>
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
    client.getItemsByAccountId(this.user.id,(errors, items) => {
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
.profile-items-header p {
  padding: 2.5px 2.5px 2.5px 10px;
}
.profile-items {
  padding: 2.5px 2.5px 2.5px 10px;
  display: flex;
  align-items: center;
  width: 66%;
  height: 57.5px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 15px;
}
.profile-items p {
  padding-left: 10px;
}
.profile-items:hover {
  padding: 2.5px 2.5px 2.5px 10px;
  display: flex;
  width: 66%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}
.profile-item-wrap {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.profile-item-wrap span{
  height: 25px;
}
</style>
