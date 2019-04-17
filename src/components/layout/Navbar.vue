<template>
    <div class="navbar">
        <nav class="deep-purple darken-1">
            <div class="container">
                <router-link :to="{ name: 'GMap' }" class ="brand-logo left">GeoNinjas!</router-link>
                    <ul class="right">
                        <li v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
                        <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
                        <li v-if="user"><a>{{ user.email }}</a></li>
                        <li v-if="user"><a @click="logout">Logout</a></li> <!-- this will just fire a function, won't navigate to anywhere -->
                       
                    </ul>
            </div>
        </nav>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
    name: 'Navbar',
    data(){
        return {
            user: null
        }
    },
    methods: {
        logout(){
            firebase.auth().signOut().then(() => { //the method .signOut is an asyncronous method, which means it take some time to completye and returns a promise. 
            this.$router.push({ name: 'Login' })
            })
        }    
    },
    created(){
        let user = firebase.auth().onAuthStateChanged((user => {
           if(user){
               this.user = user
           } else {
               this.user = null
           }
        }))
    }
}
</script>

<style>

</style>

