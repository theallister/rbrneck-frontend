<template>
    <div id="app">
      <div id="nav">
        <!-- koden här är bara placeholder för att leka runt med layout - feel free att ta bort den sen ! -->
          
          <img id="nav-top-logo" src="./assets/clapperboard.png" alt="Icon made by Freepik from www.flaticon.com">
          
          <ul class="nav-list">
            <li class="nav-list"><router-link :to="'/'" class="nav-link no-style-link uppercase oswald whitetext">home</router-link></li>
            <li class="nav-list"><router-link :to="'/login'" class="nav-link no-style-link uppercase oswald whitetext">log in</router-link></li>
            <li class="nav-list"><router-link :to="'/signup'" class="nav-link no-style-link uppercase oswald whitetext">sign up</router-link></li>
            <li class="nav-list"><a href="" class="nav-link no-style-link uppercase oswald whitetext">about</a></li>
          </ul>
        
        <Nav/>
      </div>
      <div id="routerview">
        <transition :name="transitionName">
          <router-view/>
        </transition>
      </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
    name: 'App',
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route' (to, from) {
        const destination = to.path.split('/')[1]
        const origin = from.path.split('/')[1]

        if(origin == '') {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      }
    },
    components: {
      Nav
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald:700|Roboto:100,400,700,900&display=swap');

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
.robotoBold {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
}
.robotoExtraBold {
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
}

.whitetext {
  color: #fefefe;
}
.redtext {
  color:  rgba(172,17,0,1);
}
.graytext {
  color: rgba(42,42,42,1);
}

.text-align-center {
  text-align: center;
}
h2 {
  margin: 0;
  padding: 0;
  font-size: 1.7em;
}
.smalltext-50percentwide {
  font-size: 0.9em;
  display: block;
  width: 50%;
  margin: 0 auto;
}

.red-background {
  background: rgb(142,14,0);
  background: -moz-linear-gradient(180deg, rgba(142,14,0,1) 0%, rgba(172,17,0,1) 100%);
  background: -webkit-linear-gradient(180deg, rgba(142,14,0,1) 0%, rgba(172,17,0,1) 100%);
  background: linear-gradient(180deg, rgba(142,14,0,1) 0%, rgba(172,17,0,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#8e0e00",endColorstr="#ac1100",GradientType=1);
}
.thick-border-left {
  border-left: 5px solid #fefefe;
}

.no-style-link {
  text-decoration: none;
}
.uppercase {
  text-transform: uppercase;
}
button, input {
  outline: none !important;
  cursor: pointer;
}

.button-arrow-to-left {
  width: 4em;
  margin-left: -2em;
  height: 4em;
  margin-top: -2em;
  background-color: rgba(0,0,0,0);
  border: none;
  background-image: url('assets/arrow-to-left.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.button-arrow-to-right {
  width: 3em;
  height: 3em;
  background-color: rgba(0,0,0,0);
  border: none;
  background-image: url('assets/arrow-to-right.png');
  background-size: contain;
  background-repeat: no-repeat;
}

* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;  
}
#app {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0 0 0 15vw;

  display: flex;
  flex-flow: row nowrap;

  background: rgb(28,28,28);
  background: -moz-linear-gradient(180deg, rgba(28,28,28,1) 0%, rgba(42,42,42,1) 100%);
  background: -webkit-linear-gradient(180deg, rgba(28,28,28,1) 0%, rgba(42,42,42,1) 100%);
  background: linear-gradient(180deg, rgba(28,28,28,1) 0%, rgba(42,42,42,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1c1c1c",endColorstr="#2a2a2a",GradientType=1);
}
#nav {
  flex-basis: 25%;
  height: 100vh;

  padding: 5% 2.5%;

  text-align: center;
}
  #nav-top-logo {
    width: 30%;
  }
  .nav-list {
    padding: 0;
    list-style-type: none;
  }
  .nav-link {
    font-size: 2em;
    line-height: 2.5em;
    transition: 0.2s linear;
  }

.nav-link:hover {
  text-shadow: -5px 0px 0 #8e0e00;
  padding-left: 10px;
}

#routerview {
  flex-basis: 75%;
  height: 100vh;
  overflow: scroll;
  position: relative;
}

/* router animation definition */
.view-container-main {
  width: 100%;
  padding-right: 15vw;
  position: absolute;
  top:0;
  left:0;

  padding: 5%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-content: space-around;
}
/* slide left*/
.slide-left-enter-active, .slide-left-leave-active {
  transition: all 0.4s ease;
}
.slide-left-enter {
    visibility: hidden;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
}
.slide-left-leave-to {
    visibility: hidden;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
}
.slide-left-enter-to, .slide-left-leave {
    -webkit-transform: translateX(0);
    transform: translateX(0);
}
/* slide right*/
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.4s ease;
}
.slide-right-enter {
    visibility: hidden;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
}
.slide-right-leave-to {
    visibility: hidden;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
}
.slide-right-enter-to, .slide-right-leave {
    -webkit-transform: translateX(0);
    transform: translateX(0);
}

</style>
