<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

     <div v-for="data in info" :key="data._id">
       {{data}}
     </div>
    <div>
      <input type="text" v-model="email"/>
      <input type="password" v-model="password"/>
      <button @click="newUser">Creer utilisateur</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data(){
    return{
      info:null,
      email:null,
      password:null
    }
  },
   mounted () {
    axios
      .get('http://localhost:3000/api/users/')
      .then(response => (this.info = response.data))
  },
  methods:{
    newUser(){
      axios({
        method:'post',
        url:'http://localhost:3000/api/users/',
        data: {email : this.email, password : this.password}
      })

      .then(response => {
        this.info = response.data;
        console.log(response.error)
        }).catch((error) => console.log(error.response.data) );
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
