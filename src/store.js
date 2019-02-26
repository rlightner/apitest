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

      let url = `https://api.geocod.io/v1.3/geocode?api_key=877a677baa457cb6357dbba8232442aa52536cc&q=${search}`;

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
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9214fe4b4654080047d5ef31851ed4c8/${lat},${lng}`)
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