<template>
    <v-container>
        <v-row
            justify="center"
            absolute
        >
            <v-col cols="8">
                <v-text-field
                outlined
                rounded
                append-icon="mdi-magnify"
                :prepend-inner-icon="movie ? 'mdi-movie' : 'mdi-monitor'"
                @click:append="search"
                @click:prepend-inner="movie = !movie"
                @keyup.enter="search"
                clearable
                v-model="query"
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters justify="space-around">
            <MediaPoster
                v-for="item of result"
                :key="item.id" 
                :item="item"
                :tmdb="true"
            />
        </v-row>
    </v-container>
</template>

<script>
import MediaPoster from './../components/MediaPoster'

export default {
    name: 'Movies',
    components: {
        MediaPoster
    },
    data: () => ({
        movie: true,
        query: '',
        result: []
    }),
    methods: {
        async searchMovies(){
            console.log(this.query)
            return await this.$mttp.tmdb().movies().search(this.query)
        },
        async searchShows(){
            return await this.$mttp.tmdb().shows().search(this.query)
        },
        async search(){
            const result = this.movie ? await this.searchMovies() :await this.searchShows()
            console.log(result)
            this.result = result
        },
    },
}
</script>