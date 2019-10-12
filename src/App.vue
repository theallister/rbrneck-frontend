<template>
  <div id="app">
    <div id="nav">
      <Nav/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
    name: 'App',
    components: {
      Nav
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald:700|Roboto:300,400&display=swap');

.oswald {
  font-family: 'Oswald', sans-serif;
}
.robotoThin {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}
.robotoRegular {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
