<template>
  <div id="cart">
    <div class="container-fluid" style="background-color:#FFE47C;min-height: 100%; height:100%; padding: 0px; margin:0px;">
      <NavigationBar></NavigationBar>
        <div class="col-12" style="min-height: 100vh; height:100%; background-color:#fef5c6; display:flex; justify-content:center;">
            <!-- ALL CART PRODUCTS -->
            <div style="width:70%; height:90%; background-color:#ffeda8; padding:10px;margin:25px 5px; border-radius:10px;">
              <div v-if="totalPurchasePrice == 0" style="height: 145px; display:flex; justify-content:center;align-items:center;">
                <h3><b>Your cart is currently empty</b></h3>
              </div>
              <div v-for="product in allCartProducts" :key="product.id">
                <CartProduct :product="product"></CartProduct>
              </div>
            </div>
            <!-- CartProduct Count -->
            <div style="width:25%; height: 25%; margin:25px 5px; background-color:#ffeda8; border-radius:10px;">
              <hr/>
                <div>
                  <div style="display:flex; justify-content: space-between; padding: 10px;">
                    <p><b>Total purchase:</b></p>
                    <p><b>Rp. {{priceInIDRCurrency(totalPurchasePrice)}}</b></p>
                  </div>
                  <button class="btn btn-success" @click="checkout()">Checkout</button>
                </div>
              <hr/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CartProduct from '../components/CartProduct.vue'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  name: 'Cart',
  components: {
    CartProduct,
    NavigationBar
  },
  data () {
    return {
    }
  },
  methods: {
    checkout () {
      axios({
        method: 'DELETE',
        url: 'https://peaceful-peak-29407.herokuapp.com/carts/',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.$store.dispatch('fetchCartContent')
          this.$router.push('/payment')
        })
        .catch(error => {
          console.log(error)
        })

      // Tambahin allCartProducts yang saat ini ada ke dalam sebuah table, misalnya namanya purchases
      // Destroy Cart yang user id-nya currentUserId, kemudian destroy
    },
    priceInIDRCurrency (price) {
      const val = (price / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },
  computed: {
    allCartProducts () {
      return this.$store.state.allCartProducts
    },
    totalPurchasePrice () {
      let totalPrice = 0
      for (let i = 0; i < this.allCartProducts.length; i++) {
        totalPrice += (this.allCartProducts[i].Product.price * this.allCartProducts[i].quantity)
      }
      return totalPrice
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('fetchCartContent')
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style>
html, body {
  height:100%;
}
</style>
