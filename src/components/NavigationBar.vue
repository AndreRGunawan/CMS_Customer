<template>
    <div id="NavigationBar" style="height:15vh; width:100%; background-color:#FFB238; padding:5px; margin: 0px; display:flex; justify-content:space-between;align-items:center;">
        <img src="..\assets\img\Hop-&-Lop-Logo-2-White.png" alt="" style="height:100%; margin:20px 0px;">
        <div style="display:flex; flex-direction:row;justify-content: space-around; margin: 0px 10px;">
          <p id="navbarLinks" style="margin:10px;" v-if="currentlyLoggedIn == true"><router-link style="text-decoration:none; color:white;" to="/dashboard"><b>Products</b></router-link></p>
          <p id="navbarLinks" style="margin:10px;" v-if="currentlyLoggedIn == true"><router-link style="text-decoration:none; color:white;" to="/cart"><b>Cart</b></router-link></p>
          <p id="navbarLinks" style="margin:10px;" v-if="currentlyLoggedIn == false"><router-link style="text-decoration:none; color:white;" to="/"><b>Browse</b></router-link></p>
          <p id="navbarLinks" style="margin:10px;" v-if="currentlyLoggedIn == false"><router-link style="text-decoration:none; color:white;" to="/login"><b>Sign In</b></router-link></p>
          <p id="navbarLinks" style="margin:10px;" v-if="currentlyLoggedIn == false"><router-link style="text-decoration:none; color:white;" to="/register"><b>Register</b></router-link></p>
          <button style="margin:0px 10px;" class="btn btn-danger" @click="logout()" v-if="currentlyLoggedIn == true">Log out</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  computed: {
    currentlyLoggedIn () {
      return this.$store.state.currentlyLoggedIn
    }
  }
}
</script>

<style scoped>
#navbarLinks :hover {
  color: #CCE29F;
}

</style>
