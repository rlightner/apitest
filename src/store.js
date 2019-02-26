import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: null,
    forecast: null
  },

  mutations: {
    setCurrent(state, newValue) {
      state.current = newValue;
    },
    setForecast(state, newValue) {
      state.forecast = newValue;
    }
  },

  actions: {
    getLatLng(context, search) {
      //https://api.geocod.io/v1.3/geocode?api_key={key}&q={search}
      
      let url = `https://api.geocod.io/v1.3/geocode?api_key=${process.env.VUE_APP_GEOCODIO_API}&q=${search}`;

      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          console.log(JSON.stringify(myJson));
          return myJson.results[0].location;
        });
    },
    getWeather(context, {
      lat,
      lng
    }) {
      //https://api.darksky.net/forecast/{key}}/{lat},{lng}
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.VUE_APP_DARKSKY_API}/${lat},${lng}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          console.log(JSON.stringify(myJson));

          context.commit("setCurrent", myJson.currently);
          context.commit("setForecast", myJson.daily);

          return myJson.results;
        });
    }
  }
})