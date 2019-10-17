<template>
  <div id="this is just a holder for conditional rendering">
    <div id="profile" v-if="this.user.isSignedIn == true">
      <div class="profile-header">
        <h1 class="oswald whitetext uppercase">Hello, {{this.user.username}}</h1>
        <p id="edit-profile" class="edit-button robotoThin whitetext" v-if="editProfile==false" @click="editProfile = true">Edit Account</p>
        <p id="close-edit-profile" class="edit-button robotoThin whitetext" v-if="editProfile==true" @click="editProfile = false">Stop editing</p>
      </div>
      <transition name="input-transition">
        <div class="edit-profile-section" v-if="editProfile==true">
          <EditProfile :user="this.user" @close="editProfile = false "/>
        </div>
      </transition>
      <div class="profile-items-header">
        <p class="robotoRegular whitetext">This is what you have watched so far</p>
      </div>
      <div v-for="item in items" :key="item.id" class="profile-items">
        <router-link :to="'/items/' + item.id" class="profile-item-wrap no-decor">
          <div class="item-title-wrap">
            <p class="robotoBold whitetext">{{item.title}}</p>
            <p class="robotoThin whitetext" v-if="item.series==1">Season {{item.season}}</p>
            <p class="robotoThin whitetext" v-if="item.series==1">Episode {{item.episode}}</p>
          </div>
          <span class="button-arrow-to-right"></span>
        </router-link>
      </div>
    </div>

    <div class="profile-else" v-else>
      <div class="profile-header">
        <h1 class="oswald whitetext uppercase">Hello, Guest</h1>
      </div>
      <div class="profile-items-header">
        <p class="robotoRegular whitetext">You have to be logged in to view this page.</p>
      </div>
    </div>
  </div>
</template>

<script>
const client = require("../rbrneck-client")
import EditProfile from '@/components/EditProfile.vue'

export default {
  name: "profile",
  props: ["user"],
  data() {
    return {
      items: [],
      specificItems: [],
      errors: [],
      success: Boolean,
      editProfile: false,
    }
  },
  components: {
    EditProfile
  },
  created() {
    client.getItemsByAccountId(this.user.id, (errors, items) => {
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
  flex-direction: column;
  width: 100%;
}
.profile-header {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  border-radius: 33px;
}
.profile-header h1{
  width: 50%;
  padding: 10px 2.5px 2.5px 10px;
}
.profile-header #edit-profile{
  width: auto;

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
  margin-bottom: 7.5px;
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

.edit-button {
  padding: 11px 12px 11px 12px;
  width: auto;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  font-size: 12px;
  text-transform: uppercase;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.edit-button:hover {
  transform: scale(1.02);
  width: auto;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  font-size: 12px;
  text-transform: uppercase;
}

.profile-else {
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
}
.input-transition-enter-active, .input-transition-leave-active {
    transition: all 0.5s ease;
}
.input-transition-enter, .input-transition-leave-to {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
}
.input-transition-enter-to, .input-transition-leave {
        -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
}
.item-title-wrap {
  display: flex;
  flex-direction: row;
}
.no-decor {
  text-decoration: none;
}
</style>
