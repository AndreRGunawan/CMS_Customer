<template>
  <div id="payment">
      <NavigationBar></NavigationBar>
      <div class="container-fluid" style="padding:0px; margin:0px;">
          <div class="column" style="background-color:#FEF5C6; min-height:100vh; height:100%; padding:20px; margin:0px;">
            <div class="container">
              <hr>
              <h2><b>Thank you for your purchase!</b></h2>
              <p>Payment detail has been sent to your email. Once payment is confirmed, <br> a delivery estimation will be sent to you.</p>
              <router-link to="/dashboard"><b>Continue browsing</b></router-link>
              <hr>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import NavigationBar from '../components/NavigationBar'

export default {
  name: 'payment',
  components: {
    NavigationBar
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
