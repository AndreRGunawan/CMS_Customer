<template>
  <!-- <div id="CartProduct"> -->
  <div id="CartProduct">
    <div class="container" style="margin:15px 0px;">
      <div class="column" style="background-color:#FFE47C; border-radius: 10px;">
        <div id="productDetail" style="display:flex; flex-direction:row; width:100%; padding:5px;">
          <!-- Image section -->
          <div style="width:20%; background-color:white; display:flex; align-items:center; justify-content:center; border-radius: 10px 0px 0px 10px;">
            <img :src="product.Product.image_url" alt="" style="width:50%;">
          </div>
          <!-- Product name, price -->
          <div style="width:60%; background-color:#ffeda8; padding: 10px; text-align:left; display:flex; flex-direction: column; justify-content:space-between;">
            <div>
              <h4><b>{{product.Product.name}}</b></h4>
              <p>Rp. {{priceInIDRCurrency(product.Product.price)}}</p>
            </div>
            <div>
              <button class="btn btn-danger" @click="deleteCartProduct(product.id, product.quantity, product.ProductId)">Remove from cart</button>
            </div>
          </div>
          <!-- Selected quantity and delete from cart-->
          <div style="width:20%; padding: 10px; background-color:#FFFAE7; display:flex; flex-direction: column; text-align:left;  border-radius: 0px 10px 10px 0px; ">
            <label for="example-number-input"><p><b>Quantity:</b></p></label>
            <input class="form-control" style="display:flex; justify-content:flex-start" id="example-number-input" type="number" min=1 v-model="product.quantity" required><br>            <button type="submit" class="btn btn-success">Add to cart</button>
          </div>
        </div>
        <div style="background-color:#FFE47C; display:flex; justify-content: flex-end; align-items: center; width:100%; padding: 5px; border-radius:0px 0px 10px 10px;">
          <p style="margin:5px 10px;"><b>Subtotal: Rp. {{priceInIDRCurrency(subTotal)}}</b></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CartProduct',
  props: ['product'],
  methods: {
    deleteCartProduct (cartId, quantity, productId) {
      axios({
        method: 'DELETE',
        url: 'https://peaceful-peak-29407.herokuapp.com/carts/' + cartId,
        headers: {
          access_token: localStorage.access_token,
          quantity: quantity,
          productId: productId
        }
      })
        .then(result => {
          this.$store.dispatch('fetchCartContent')
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
  computed: {
    subTotal () {
      const subTotal = this.product.Product.price * this.product.quantity
      return subTotal
    }
  }
}
</script>

<style scoped>

</style>
