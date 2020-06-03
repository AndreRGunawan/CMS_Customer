<template>
  <div id="RegisterPage">
    <NavigationBar></NavigationBar>
    <div class="container-fluid" style="background-color:#FFE47C; display:flex; justify-content:center; align-items: center; flex-direction:column; height:100%; margin: 0px 0px 0px 0px;"> <!-- Justify content for centering login box -->
        <div class="column" style="background-color:#ffeda8; width: 40%; height: 100%; padding:10px; margin:36px; display:flex; flex-direction: column; justify-content: center; align-items:center; border-radius:10px;">
          <img src="..\assets\img\hop-&-lop-logo-1.png" alt="" style="width:50%;">
          <form style="width:75%; display:flex; flex-direction: column; justify-content:center;" @submit.prevent="register()"> <!-- Justify content for centering form -->
              <label class= "control-label" for="registerEmail"><b>Email:</b></label>
              <input type="email" class="form-control" id="registerEmail" v-model="newUser.registerEmail">
              <label class= "control-label" for="registerPassword"><b>Password:</b></label>
              <input type="password" class="form-control" id="registerPassword" v-model="newUser.registerPassword"><br>
              <button type="submit" class="btn btn-success" >Register</button>
              <hr>
              <p>Back to <router-link to="/login">login page!</router-link></p>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  name: 'RegisterPage',
  components: {
    NavigationBar
  },
  data () {
    return {
      newUser: {
        registerEmail: '',
        registerPassword: ''
      }
    }
  },
  methods: {
    register () {
      axios({
        method: 'POST',
        url: 'https://peaceful-peak-29407.herokuapp.com/register',
        data: {
          email: this.newUser.registerEmail,
          password: this.newUser.registerPassword
        }
      })
        .then(result => {
        //   console.log('==================')
        //   console.log(result.data)
          this.$router.push('/login')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    currentlyLoggedIn () {
      return this.$store.state.currentlyLoggedIn
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('set_currentlyLoggedIn', true)
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style>

</style>
