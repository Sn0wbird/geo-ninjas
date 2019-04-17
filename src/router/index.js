import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true //this is how you protect the route
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id', // want to protect this route. Only logged in people should be able to see.
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true //this is how you protect the route
      }
    }
  ]
})
router .beforeEach((to, from, next) => { //fires a function before each route is loaded in.
  //check to see if route requires auth.
  if(to.matched.some(rec => rec.meta.requiresAuth)){//we're looking for if requiresAuth is actually true.
    //check auth state of user.
    let user = firebase.auth().currentUser
    if(user){
      //user signed in proceed to route
      next()//takes it to the next route.
    } else { // if the user is not signed in, we want to redirect them to login
        next({ name: 'Login' })
    }
  } else {
    next()
  }
}) 

export default router