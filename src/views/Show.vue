<template>
  <v-container>
    <v-row fill-height>
      <v-col cols="12">
         <v-row justify="start">
              <MediaPoster :item="item" play="true"/>
            <v-col xs="12">
              <Details :item="item"/>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MediaPoster from './../components/MediaPoster';
import Details from './../components/Details';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Movies',

  components: {
    MediaPoster,
    Details
  },

  props: {
    id: null
  },

  data: () => ({
    item: {},
  }),

  computed: {
    ...mapGetters([
      'movies'
    ])
  },
  methods: {
    ...mapActions([]),
    async getShow(){
      this.item = await this.$mttp.shows().withId(this.id).get()
    }
  },

  async mounted(){
     await this.getShow()
  }
};
</script>
