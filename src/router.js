import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Item from './views/Item.vue'
import SignUp from './views/SignUp.vue'
import LogIn from './views/LogIn.vue'
import AddItem from './views/AddItem.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      props: true,
      component: Home
    },
    {
      path: '/items/:id',
      name: 'item',
      props: true,
      component: Item
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      props: true,
      component: LogIn
    },
    {
      path: '/additem',
      name: 'additem',
      props: true,
      component: AddItem
    }
  ]
})
