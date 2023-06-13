import { createStore } from 'vuex'

export default createStore({
  state: {
    apiKey: 'cb8f76325991c658ce6ec4f326120923',
    fullWeather: null,
  },
  getters: {
    getWeatherObj: state => state.fullWeather
  },
  mutations: {
    getFullWeather(state, el){
      state.fullWeather = el
    }
  },
  actions: {
    async getWeather({commit, state}, city){
      try{
        let geoQuery = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${state.apiKey}`)
        let response = await geoQuery.json()
        let {lat, lon, name} = response[0]
        let weatherQuery = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=ru&appid=${state.apiKey}`)
        let fullInfo = await weatherQuery.json()
        let infoNewObj = {...fullInfo, name: name}
        commit('getFullWeather',infoNewObj)
      }catch(error){
        console.error('Зарос не выполнен ' + error);
      }
    }
  },
  modules: {
  }
})
