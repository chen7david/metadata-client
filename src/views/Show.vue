<template>
  <v-container>
    <v-row fill-height>
      <v-btn icon router to="/shows">
          <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-col cols="12">
         <v-row justify="start">
            <v-col lg="8" xs="12">
              <Details :item="item"/>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Details from './../components/Details';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Movies',

  components: {
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
