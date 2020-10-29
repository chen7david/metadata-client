<template>
    <v-row>
        <v-col cols="12">
            <div ></div>
            <div ></div>
            <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5">{{itemName}}</v-list-item-title>
                <v-list-item-subtitle class="text-6 blue-grey--text">{{itemYear}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <hr class="my-2 black">
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-subtitle>
                    <v-chip small class="text-right" >{{rating}}</v-chip>
                </v-list-item-subtitle>
                <v-list-item-title>{{item.status}}</v-list-item-title>
                <v-list-item-subtitle>
                    {{item.overview}}
                </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>

            <div v-if="item.seasons">
                <v-tabs v-model="tab" background-color="dark" dark>
                    <v-tab v-for="item in item.seasons" :key="item.id">
                        <v-btn :loading="isLoading" @click="refreshSeason" icon>
                            S{{ item.season_number }}
                        </v-btn>
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                <v-tab-item v-for="season in item.seasons" :key="season.id">
                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">
                                
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Description
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="episode of season.episodes" 
                                :key="episode.id"
                            >
                            <td>{{ episodeId(episode) }}</td>
                            <td>{{ episode.name }}</td>
                            <td>{{ episode.overview }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-tab-item>
                </v-tabs-items>
            </div>
        </v-col>
    </v-row>
</template>

<script>
// import DeleteConfirmation from './DeleteConfirmation'
import { mapActions } from 'vuex'

export default {
    name: 'Details',
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
        tab: null,
    }),
    computed: {
        itemName(){
            return this.isMovie ? this.item.title : this.item.name
        },
        posterURL(){
            const baseURL = this.tmdb ? 'http://image.tmdb.org/t/p/' : 'http://aox.hopto.org:9000/image/'
            return  this.item.poster_path ? baseURL.concat(this.imgSize, this.item.poster_path) : './poster-missing.png'
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
            return `movie/${this.item.id}/id`
        },
        rating(){
            return `${this.item.vote_average}/10`
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
        episodeId(episode){
            return `S${episode.season_number}E${episode.episode_number}`
        },
        async refreshSeason(){
            this.isLoading = true
            await this.$mttp.shows().withId(this.item.id).season(this.tab).update()
            this.isLoading = false
        }
    }
}
</script>