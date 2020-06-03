<template>
    <div id="ProductCard" style="background-color:#FFFAE7; width:100%; height:475px; padding:10px; margin: 10px; border-radius:10px; box-shadow: 0px 2px 17px -2px rgba(179,179,179,0.5)">
        <div style="height:300px; width: 100%; background-color:white; display:flex; justify-content:center; align-items: center; padding:10px; border-radius:10px;">
            <img :src="product.image_url" alt="" style="height:90%;">
        </div>
        <div style="background-color:#FFFAE7;margin:5px 0px; padding: 5px; text-align:left;">
          <div style="height:50px;">
            <h5><b>{{product.name}}</b></h5>
          </div>
          <p style="margin:5px 0px;">Rp. {{priceInIDRCurrency(product.price)}}</p>
        </div>
        <div>
          <button class="btn btn-success" style="width:100%;" v-if="currentlyLoggedIn === true">Add to Cart</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  computed: {
    currentlyLoggedIn () {
      return this.$store.state.currentlyLoggedIn
    }
  },
  methods: {
    priceInIDRCurrency (price) {
      const val = (price / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
</script>

<style scoped>

li a {
  text-decoration: none;
}

li a :hover {
  text-decoration: none;
}

</style>
