<style>
.w-1 {
  width: 1px;
}
</style>
<template>
  <div class="container">
    <p class="h1">Weather Forecaster</p>
    <form @submit.prevent="onSearch">
      <label
        class="d-block"
        for="address"
      >Address:</label>

      <div class="form-row align-items-center">
        <div class="col-5">
          <input
            class="form-control"
            id="address"
            placeholder="666 Mockingbird Lane"
            type="text"
            v-model="address"
          >
        </div>
        <div class="col-auto">
          <button
            class="btn btn-primary"
            type="submit"
          >Submit</button>
        </div>
      </div>
    </form>

    <div
      class="spinner-border mt-4"
      role="status"
      v-if="loading"
    >
      <span class="sr-only">Loading...</span>
    </div>

    <div v-else>
      <div v-if="current">
        <h4 class="mt-4">Currently:</h4>
        <skycon
          :condition="current.icon"
          :height="16"
          :width="16"
        />
        {{ current.summary }}
      </div>

      <div v-if="forecast">
        <h4 class="mt-4">Forecast:</h4>
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">Summary</th>
              <th class="text-nowrap w-1">Temp Low</th>
              <th class="text-nowrap w-1">Temp High</th>
            </tr>
          </thead>
          <tr
            :key="f.time"
            v-for="f in forecast.data"
          >
            <td class="w-1">{{ getDayOfWeek(f.time * 1000) }}</td>
            <td>
              <skycon
                :condition="f.icon"
                :height="16"
                :width="16"
              />
              {{ f.summary }}
            </td>
            <td class="text-right">{{ f.temperatureLow }}</td>
            <td class="text-right">{{ f.temperatureHigh }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "home",
  components: {},
  data: () => ({
    address: "",
    loading: false
  }),
  computed: {
    ...mapState(["current", "forecast"])
  },
  methods: {
    getDayOfWeek(date) {
      return moment(date).format("dddd");
    },
    onSearch(evt) {
      evt.preventDefault();

      this.loading = true;

      this.$store
        .dispatch("getLatLng", this.address)
        .then(getLatLngResponse => {
          this.$store
            .dispatch("getWeather", {
              lat: getLatLngResponse.lat,
              lng: getLatLngResponse.lng
            })
            .then(getWeatherResponse => {
              this.loading = false;
            });
        });
    }
  }
};
</script>
