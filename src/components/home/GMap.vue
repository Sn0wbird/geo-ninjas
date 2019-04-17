<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>


<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'GMap',
    data(){
        return {
            lat: -55,
            lng: 0
        }
    },
    methods: {
        renderMap(){
            const map = new google.maps.Map(document.getElementById('map'),{
                center: {lat: 15, lng: 0 },
                zoom: 3,
                maxZoom: 15, 
                minZoom: 3,
                streetViewControl: false
            })

            db.collection('users').get().then(users => {
                users.docs.forEach(doc => {
                    let data = doc.data()
                    if(data.geolocation){
                        let marker = new google.maps.Marker({
                            position: {
                                lat: data.geolocation.lat,
                                lng: data.geolocation.lng
                            },
                            map
                        })
                        //add click event to marker
                        marker.addListener('click', () => {
                            this.$router.push({name: 'ViewProfile', params: { id: doc.id }})
                        })
                    }
                })
            })
        }
    },
    mounted(){
        //get current user
        let user = firebase.auth().currentUser
        console.log(user)
        
        //get users geolocation
        if(navigator.geolocation){ //if the users position exists/is supported, do the following function;
            navigator.geolocation.getCurrentPosition(pos => { //the getCurrentPosition takes 3 parameters, the coords, the err and the else.
                console.log(pos.coords.latitude + ", " + pos.coords.longitude)
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude //We've grabbed those values and updated our data properties on our data object.

                //find the user record and then update geocoords
                db.collection('users').where('user_id', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach((doc) => {
                        db.collection('users').doc(doc.id).update({
                            geolocation: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude
                            }
                        }) 
                    })
                }).then(() => {
                    this.renderMap()
                })


                this.renderMap() //now we can render the map with those properties
            }, (err) => {
              console.log(err) 
              this.renderMap()
            }, { maximumAge: 60000, timeout: 3000 }) //maxAge looks for the cache geolocation of the user within the last hour, timeout 3000 says that if we can get the geo location of the user after 3 seconds, we'll fail the operation-will just render the map default.
        } else {
            // position center by default value
            this.renderMap()
        }
    }
}
</script>

<style>
.google-map{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

</style>
