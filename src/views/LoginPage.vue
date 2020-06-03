<template>
  <div id="LoginPage">
    <NavigationBar></NavigationBar>
    <div class="container-fluid" style="background-color:#FFE47C; display:flex; justify-content:center; align-items: center; flex-direction:column; height:100%; margin: 0px 0px 0px 0px;"> <!-- Justify content for centering login box -->
        <div class="column" style="background-color:#ffeda8; width: 40%; height: 100%; padding:10px; margin:36px; display:flex; flex-direction: column; justify-content: center; align-items:center; border-radius:10px;">
          <img src="..\assets\img\hop-&-lop-logo-1.png" alt="" style="width:50%;">
          <form style="width:75%; display:flex; flex-direction: column; justify-content:center;" @submit.prevent="login()"> <!-- Justify content for centering form -->
              <label class= "control-label" for="loginEmail"><b>Email:</b></label>
              <input type="email" class="form-control" id="loginEmail" v-model="loggingUser.loginEmail">
              <label class= "control-label" for="loginPassword"><b>Password:</b></label>
              <input type="password" class="form-control" id="loginPassword" v-model="loggingUser.loginPassword"><br>
              <button type="submit" class="btn btn-success">Log in</button>
              <hr>
              <p>New to Hop & Lop? Join us right <router-link to="/register">here!</router-link></p>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  name: 'LoginPage',
  components: {
    NavigationBar
  },
  data () {
    return {
      loggingUser: {
        loginEmail: '',
        loginPassword: ''
      },
      errorLogin: false
    }
  },
  methods: {
    login () {
      const loggingUser = {
        email: this.loggingUser.loginEmail,
        password: this.loggingUser.loginPassword
      }
      axios({
        method: 'POST',
        url: 'https://peaceful-peak-29407.herokuapp.com/login',
        data: loggingUser
      })
        .then(result => {
          this.$store.commit('set_currentlyLoggedIn', true)
          localStorage.setItem('access_token', result.data.access_token)
          this.$router.push('/dashboard')
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
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
