<template>
  <div id="nav">
      <img id="nav-top-logo" src="../assets/clapperboard.png" alt="Icon made by Freepik from www.flaticon.com">
      <ul v-if="this.user.isSignedIn" class="nav-list">
        <li class="nav-list"><router-link :to="'/'" class="nav-link no-style-link uppercase oswald whitetext">home</router-link></li>
        <li class="nav-list"><router-link :to="'/'" class="nav-link no-style-link uppercase oswald whitetext">profile</router-link></li>
        <li class="nav-list" @click="signOut()"><router-link :to="'/'" class="nav-link no-style-link uppercase oswald whitetext">sign out</router-link></li>
        <li class="nav-list"><router-link :to="'/additem'" class="nav-link no-style-link uppercase oswald whitetext">watch</router-link></li>

      </ul>
      <ul v-else class="nav-list">
        <li class="nav-list"><router-link :to="'/'" class="nav-link no-style-link uppercase oswald whitetext">home</router-link></li>
        <li class="nav-list"><router-link :to="'/login'" class="nav-link no-style-link uppercase oswald whitetext">log in</router-link></li>
        <li class="nav-list"><router-link :to="'/signup'" class="nav-link no-style-link uppercase oswald whitetext">sign up</router-link></li>
        <li class="nav-list"><router-link :to="'/about'" class="nav-link no-style-link uppercase oswald whitetext">about</router-link></li>
      </ul>

  </div>
</template>

<script>

export default {
  name: 'Nav',
  props: ["user"],
  data() {
    return {

    }
  },
  methods: {
    signOut() {
      //cleara all data som man får när man loggar in
      this.user.username = ""
      this.user.id = null
      this.user.accessToken = ""
      this.user.isSignedIn = false
    }
  }
}
</script>

<style lang="css" scoped>


</style>
