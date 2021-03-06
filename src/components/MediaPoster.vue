<template>
    <v-hover v-slot:default="{ hover }" open-delay="10">
        <v-card class="mb-4" max-width="185px" color="rgb(0, 0, 0, 0.0)" elevation="0" tile> 
                <v-img :src="posterURL" class="mb-2" @error="onImgError()">
                    <!-- <source v-if="imageError"  srcset="/poster-missing.jpg" type="image/jpg"/> -->
                    <v-overlay absolute :value="hover || isLoading">
                        <v-btn x-large :loading="isLoading" @click="deleteItem(item.id)" v-if="play" icon>
                            <v-icon>mdi-play</v-icon>
                        </v-btn>
                        <v-btn :loading="isLoading" @click="addItem(item.id)" v-if="tmdb && !play" x-large icon>
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn :loading="isLoading" @click="deleteItem(item.id)" v-if="!tmdb && !play" icon>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn v-if="!tmdb && !play" icon>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn router :to="detailsLink" v-if="!tmdb && !play" icon>
                            <v-icon>mdi-more</v-icon>
                        </v-btn>
                    </v-overlay>
                </v-img>
            <v-card-subtitle class="text-left pa-0">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <div v-on="on" v-bind="attrs" class="font-weight-medium text-truncate">{{name}}</div>
                    </template>
                    <span>{{name}}</span>
                </v-tooltip>
                <div class="blue-grey--text">{{year}}</div>
            </v-card-subtitle>
        </v-card>
    </v-hover>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'PosterCard',
    props: {
        item: null,
        tmdb: null,
        play: null,
    },
    components: {
        // DeleteConfirmation
    },
    data: () => ({
        isLoading: false,
        imageError: false
    }),
    computed: {
        name(){
            return this.isMovie ? this.item.title : this.item.name
        },
        posterURL(){
            const baseURL = this.tmdb ? this.$config.url.tmdbImage : this.$config.url.metadata + '/image/'
            const url = this.item.poster_path ? baseURL.concat(this.size, this.item.poster_path) : this.$config.url.defaultPoster
            return this.imageError ?  this.$config.url.defaultPoster : url
        },
        size(){
            return ['w780', 'w500', 'w342', 'w185', 'w154', 'w92'][2]
        },
        width(){
            return this.size.replace('w','').concat('px')
        },
        year(){
            const date = this.item.title ? this.item.release_date : this.item.first_air_date
            return date ? new Date(date).getFullYear().toString() : ''
        },
        isMovie(){
            console.log(this.$config)
            return this.item.title != null
        },
        detailsLink(){
            return  `${this.isMovie ? 'movie' : 'show' }/${this.item.id}`
        },
        rating(){
            return `${this.item.vote_average}`
        },
    },
    methods:{
        ...mapActions([
            'addShowById',
            'addMovieById',
            'removeShowById',
            'removeMovieById',
        ]),
        async addItem(id){
            this.isLoading = true
            this.isMovie ? await this.addMovieById(id) : await this.addShowById(id)
            this.isLoading = false
        },
        async deleteItem(id){
            this.isLoading = true
            this.isMovie ? await this.removeMovieById(id) : await this.removeShowById(id)
            this.isLoading = false
        },
        onImgError(){
            this.imageError = true
            console.log('@image error ...')
        }
    }
}
</script>