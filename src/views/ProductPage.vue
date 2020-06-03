<template>
  <div id="ProductPage">
  <NavigationBar></NavigationBar>
  <div class="container-fluid" style="background-color:#FEF5C6;padding:0px 10px; height:100%;">
    <div class="row" style="display:flex; justify-content:center; border-radius:5px; min-height:100vh; height:100%; ">
      <div style="width:30vw; background-color:#FFFAE7; margin:25px 0px 100px 0px; padding:10px; display:flex; justify-content:center; border-radius:10px 0px 0px 10px;">
        <div style="height: 100%; width:90%; background-color:white; display:flex; justify-content:center; padding:10px; border-radius:10px;">
          <img :src="selectedProduct.image_url" alt="" style="width:100%;object-fit: scale-down;">
        </div>
      </div>
      <div style="width:50vw; background-color:#FFFAE7; margin:25px 0px 100px 0px; padding:10px; border-radius:0px 10px 10px 0px;">
        <div v-if="successfullyAddProductToCart == true" style="background-color:#5cb85c; padding:5px; margin:5px; height:50px; width: 50%; display:flex; justify-content:center; align-items:center; border-radius:5px;">
          <p style="margin:0px; color:white;"><b>Product successfully added to cart :)</b></p>
        </div>
        <h2 style="text-align:left;"><b>{{selectedProduct.name}}</b></h2>
        <h3 style="text-align:left;"><b>Rp. {{priceInIDRCurrency(selectedProduct.price)}}</b></h3>
        <h5 style="text-align:left;">Stock : {{currentStockStatus}}</h5>
        <form class="col-6 form-group row" @submit.prevent="addToCart()">
          <label for="example-number-input" style="display:flex; justify-content:flex-start; text-align:left;"><h5>Purchase quantity:</h5></label>
          <input class="form-control" style="display:flex; justify-content:flex-start" id="example-number-input" type="number" placeholder="1" min=1 v-model="purchaseProduct.quantity" required><br><br>
          <button type="submit" class="btn btn-success" v-if="currentlyLoggedIn === true">Add to cart</button>
        </form>
        <div style="display:flex; justify-content: flex-start;">
          <button type="submit" class="btn btn-success" v-if="currentlyLoggedIn === false" @click="goToRegister()">Sign up to purchase</button>
        </div>
      </div>
    </div>
  </div>
<!--
    <h2>This is specified product page</h2>
    <h2>{{selectedProduct.image_url}}</h2>
    <h2>{{selectedProduct.category}}</h2>
    <h2>{{selectedProduct.stock}}</h2>
    <form @submit.prevent="addToCart()">
      <input type="number" min=1 v-model="purchaseProduct.quantity">
      <button type="submit" class="btn btn-success">Add to cart</button>
    </form> -->
  </div>
</template>

<script>
import axios from 'axios'
import NavigationBar from '../components/NavigationBar'

export default {
  name: 'ProductPage',
  components: {
    NavigationBar
  },
  computed: {
    currentlyLoggedIn () {
      return this.$store.state.currentlyLoggedIn
    },
    currentStockStatus () {
      let stockStatus = ''
      if (this.selectedProduct.stock >= 10) {
        stockStatus = 'Currently available'
      } else if (this.selectedProduct.stock >= 1 && this.selectedProduct.stock <= 10) {
        stockStatus = 'Limited stock'
      } else if (this.selectedProduct.stock) {
        stockStatus = 'Stock unavailable!'
      }
      return stockStatus
    }
  },
  methods: {
    goToRegister () {
      this.$router.push('/register')
    },
    backToDashboard () {
      this.$router.push('/dashboard')
    },
    addToCart () {
      const selectedId = this.$route.params.id
      axios({
        method: 'POST',
        url: 'https://peaceful-peak-29407.herokuapp.com/carts',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId: selectedId,
          quantity: this.purchaseProduct.quantity
        }
      })
        .then(result => {
          this.successfullyAddProductToCart = true
          setTimeout(() => {
            this.successfullyAddProductToCart = false
          }, 3000)
        })
        .catch(error => {
          console.log(error)
        })
    },
    priceInIDRCurrency (price) {
      const val = (price / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },
  data () {
    return {
      selectedProduct: '',
      purchaseProduct: {
        quantity: ''
      },
      successfullyAddProductToCart: false
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('set_currentlyLoggedIn', true)
      const selectedId = this.$route.params.id
      axios({
        method: 'GET',
        url: 'https://peaceful-peak-29407.herokuapp.com/products/' + selectedId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.selectedProduct = result.data.selectedProduct
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      // this.$router.push('/loginPage')
      const selectedId = this.$route.params.id
      axios({
        method: 'GET',
        url: 'https://peaceful-peak-29407.herokuapp.com/products/' + selectedId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.selectedProduct = result.data.selectedProduct
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('set_currentlyLoggedIn', false)
    }
  }
}
</script>

<style scoped>

</style>
