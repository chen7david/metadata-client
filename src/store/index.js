import Vue from 'vue'
import Vuex from 'vuex'
import meta from 'meta-agent'

const $meta = meta({
  baseURL: 'http://aox.hopto.org:8000',
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
    setMovies: (state, items) => state.movies = items,
    setShows: (state, items) => state.shows = items,
    addMovie: (state, item) => state.movies.unshift(item),
    addShow: (state, item) => state.shows.unshift(item),
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
    async getShows({commit}){
      const data = await $meta.shows().get()
      commit('setShows', data)
    },
    async addMovieById({commit},id){
      const data = await $meta.tmdb().movies().withId(id).get()
        commit('addMovie', data)
    },
    async removeMovieById({commit},id){
        await $meta.movies().withId(id).delete()
        commit('removeMovie', id)
    },
    async addShowById({commit},id){
      const data = await $meta.tmdb().shows().withId(id).get()
      commit('addShow', data)
    },
    async removeShowById({commit},id){
       await $meta.shows().withId(id).delete()
        commit('removeShow', id)
    },
    async fixdata(){
       await $meta.fixdata()
    },
  },
})
