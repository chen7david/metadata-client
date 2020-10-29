import Vue from 'vue'
import Vuex from 'vuex'
import meta from 'meta-agent'

const $meta = meta({
  baseURL: 'http://192.168.50.251:8000',
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    shows: [],
    isloading: false
  },
  getters: {
    movies: (state) => state.movies,
    shows: (state) => state.shows,
    isloading: (state) => state.isloading,
  },
  mutations: {
    setMovies: (state, movies) => state.movies = movies,
    setShows: (state, shows) => state.shows = shows,
    addMovie: (state, movie) => state.movies.unshift(movie),
    addShow: (state, movie) => state.shows.unshift(movie),
    setLoadingTo: (state, boolean) => state.isloading = boolean,
    removeMovie: (state, id) => {
      const item = state.movies.find(i => i.id == id)
      const index = state.movies.indexOf(item)
      state.movies.splice(index,1)
    },
    removeShow: (state, id) => {
      const item = state.shows.find(i => i.id == id)
      const index = state.shows.indexOf(item)
      state.shows.splice(index,1)
    },
  },
  actions: {
    async getMovies({commit}){
      const data = await $meta.movies().get()
      commit('setMovies', data)
    },
  },
})
