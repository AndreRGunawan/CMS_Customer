<template>
  <div id="LandingPage">
    <NavigationBar></NavigationBar>
    <div class="container-fluid" style="padding: 0px;">
      <div class="column" style="background-color:white; min-height:100vh; height:100%; padding:20px;">
        <div class="container">
          <hr>
          <h1><b>Rabbit Food</b></h1>
          <hr>
          <div class="row justify-content-center" style="height:100%">
              <div v-for="product in rabbitFood" :key="product.id" style="width:30%; display:flex; flex-direction:row; margin:10px;">
                <router-link :to="{ name:'product', params: { id: product.id } }" style="width:100%; color:black;">
                  <productCard :product="product"></productCard>
                </router-link>
              </div>
          </div>
          <hr>
          <h3>Sign up to see our complete products for your bunnies!</h3>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'LandingPage',
  components: {
    NavigationBar,
    ProductCard
  },
  data () {
    return {
      selectedCategory: 'rabbitFood'
    }
  },
  computed: {
    eightPreviewProducts () {
      const allProducts = this.$store.state.allProducts
      const eightPreviewProducts = []
      for (let i = 0; i < 7; i++) {
        eightPreviewProducts.push(allProducts[i])
      }
      return eightPreviewProducts
    },
    rabbitFood () {
      const products = this.$store.state.allProducts
      const rabbitFood = []
      for (let i = 0; i < products.length; i++) {
        if (products[i].category === 'Rabbit Food') {
          rabbitFood.push(products[i])
        }
      }
      return rabbitFood
    }
  },
  created () {
    this.$store.dispatch('fetchAllProducts')
  }
}
</script>

<style>

</style>
