<template>
    <v-hover v-slot:default="{ hover }" open-delay="10">
        
        <v-card class="mb-4" max-width="185px" color="rgb(0, 0, 0, 0.0)" elevation="0" tile>
                
                <v-img :src="posterURL" class="mb-2">
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
                        <div v-on="on" v-bind="attrs" class="font-weight-medium text-truncate">{{itemName}}</div>
                    </template>
                    <span>{{itemName}}</span>
                </v-tooltip>
                <div class="blue-grey--text">{{itemYear}}</div>
            </v-card-subtitle>
        </v-card>
    </v-hover>
</template>

<script>
// import DeleteConfirmation from './DeleteConfirmation'
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
        isLoading: false
    }),
    computed: {
        itemName(){
            return this.isMovie ? this.item.title : this.item.name
        },
        posterURL(){
            const baseURL = this.tmdb ? 'http://image.tmdb.org/t/p/' : 'http://aox.hopto.org:8000/image/'
            return  this.item.poster_path ? baseURL.concat(this.imgSize, this.item.poster_path) : './poster-missing.jpg'
        },
        imgSize(){
            return ['original', 'w780', 'w500', 'w342', 'w185', 'w154', 'w92'][3]
        },
        imgSizePX(){
            return this.imgSize.replace('w','').concat('px')
        },
        itemYear(){
            const date = this.item.title ? this.item.release_date : this.item.first_air_date
            return date ? new Date(date).getFullYear().toString() : ''
        },
        isMovie(){
            return this.item.title != null
        },
        detailsLink(){
            return  `${this.isMovie ? 'movie' : 'show' }/${this.item.id}`
        },
        rating(){
            return `${this.item.vote_average}`
        }
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
    }
}
</script>