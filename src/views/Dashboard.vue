<template>
  <div id='Dashboard'>
    <div class="container-fluid" style="background-color:#FEF5C6; width:100%; padding:0px; margin: 0px;">
        <!-- NAVBAR HERE -->
        <NavigationBar></NavigationBar>
        <hr>
        <div style="display:flex; flex-direction: row; align-items:center; justify-content:center; margin:10px;">
          <a href="#" style="margin:10px;text-decoration:none;color:black;" @click="set_selectedCategory('allProducts')"><b>All Products</b></a> |
          <a href="#" style="margin:10px;text-decoration:none;color:black;" @click="set_selectedCategory('rabbitFood')"><b>Rabbit Food</b></a> |
          <a href="#" style="margin:10px;text-decoration:none;color:black;" @click="set_selectedCategory('vitaminsAndSupplements')"><b>Vitamins and Supplements</b></a> |
          <a href="#" style="margin:10px;text-decoration:none;color:black;" @click="set_selectedCategory('grooming')"><b>Grooming</b></a> |
          <a href="#" style="margin:10px;text-decoration:none;color:black;" @click="set_selectedCategory('toysAndCages')"><b>Toys & Cages</b></a>
        </div>
        <hr>
        <!-- ALL PRODUCTS DISPLAY HERE -->
        <div class="container-fluid">
          <div class="row justify-content-center" style="height:100%" v-if="this.selectedCategory === 'allProducts'">
              <div v-for="product in allProducts" :key="product.id" style="width:30%; display:flex; flex-direction:row; margin:10px;">
                <router-link :to="{ name:'product', params: { id: product.id } }" style="width:100%; color:black;">
                  <productCard :product="product"></productCard>
                </router-link>
              </div>
          </div>
          <div class="row justify-content-center" style="height:100%" v-if="this.selectedCategory === 'rabbitFood'">
              <div v-for="product in rabbitFood" :key="product.id" style="width:30%; display:flex; flex-direction:row; margin:10px;">
                <router-link :to="{ name:'product', params: { id: product.id } }" style="width:100%; color:black;">
                  <productCard :product="product"></productCard>
                </router-link>
              </div>
          </div>
          <div class="row justify-content-center" style="height:100%" v-if="this.selectedCategory === 'vitaminsAndSupplements'">
              <div v-for="product in vitaminsAndSupplements" :key="product.id" style="width:30%; display:flex; flex-direction:row; margin:10px;">
                <router-link :to="{ name:'product', params: { id: product.id } }" style="width:100%; color:black;">
                  <productCard :product="product"></productCard>
                </router-link>
              </div>
          </div>
          <div class="row justify-content-center" style="height:100%" v-if="this.selectedCategory === 'toysAndCages'">
              <div v-for="product in toysAndCages" :key="product.id" style="width:30%; display:flex; flex-direction:row; margin:10px;">
                <router-link :to="{ name:'product', params: { id: product.id } }" style="width:100%; color:black;">
                  <productCard :product="product"></productCard>
                </router-link>
              </div>
          </div>
          <div class="row justify-content-center" style="height:100%" v-if="this.selectedCategory === 'grooming'">
              <div v-for="product in grooming" :key="product.id" style="width:30%; display:flex; flex-direction:row; margin:10px;">
                <router-link :to="{ name:'product', params: { id: product.id } }" style="width:100%; color:black;">
                  <productCard :product="product"></productCard>
                </router-link>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  name: 'Dashboard',
  data () {
    return {
      selectedCategory: 'allProducts'
    }
  },
  components: {
    ProductCard,
    NavigationBar
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    },
    set_selectedCategory (category) {
      this.selectedCategory = category
    }
  },
  computed: {
    allProducts () {
      return this.$store.state.allProducts
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
    },
    vitaminsAndSupplements () {
      const products = this.$store.state.allProducts
      const vitaminsAndSupplements = []
      for (let i = 0; i < products.length; i++) {
        if (products[i].category === 'Vitamins and Supplements') {
          vitaminsAndSupplements.push(products[i])
        }
      }
      return vitaminsAndSupplements
    },
    toysAndCages () {
      const products = this.$store.state.allProducts
      const toysAndCages = []
      for (let i = 0; i < products.length; i++) {
        if (products[i].category === 'Toys and Cages') {
          toysAndCages.push(products[i])
        }
      }
      return toysAndCages
    },
    grooming () {
      const products = this.$store.state.allProducts
      const grooming = []
      for (let i = 0; i < products.length; i++) {
        if (products[i].category === 'Grooming') {
          grooming.push(products[i])
        }
      }
      return grooming
    }
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push('/')
      this.$store.commit('set_currentlyLoggedIn', false)
    } else {
      this.$store.dispatch('fetchAllProducts')
    }
  }
}
</script>

<style scoped>
li a {
  text-decoration: none;
}

a :hover{
  color:#FFB238;
}

</style>
