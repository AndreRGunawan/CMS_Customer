import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentlyLoggedIn: false,
    allProducts: [],
    allCartProducts: []
  },
  mutations: {
    set_currentlyLoggedIn (state, payload) {
      state.currentlyLoggedIn = payload
    },
    set_allProducts (state, payload) {
      state.allProducts = payload
    },
    set_allCartProducts (state, payload) {
      state.allCartProducts = payload
    }
  },
  actions: {
    fetchAllProducts (context) {
      axios({
        method: 'GET',
        url: 'https://peaceful-peak-29407.herokuapp.com/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('set_allProducts', result.data.allProducts)
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchCartContent (context) {
      axios({
        method: 'GET',
        url: 'https://peaceful-peak-29407.herokuapp.com/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('set_allCartProducts', result.data.cartProductList)
        })
        .catch(error => {
          console.log(error)
        })
    },
    clearCartContent (context) {
      axios({
        method: 'DELETE',
        url: 'https://peaceful-peak-29407.herokuapp.com/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('set_allCartProducts', result.data.cartProductList)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
