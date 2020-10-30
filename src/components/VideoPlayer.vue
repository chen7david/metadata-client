<template>
    <v-card max-width="100vw" color="rgb(0, 0, 0, 0.0)" elevation="0">
        <video crossorigin="anonymous" ref="video" v-if="media" :key="media.id" poster="" style="outline: none" preload="none" controls controlsList="nodownload">
            <source crossorigin="anonymous" :src="videoLink" type="video/mp4">
            video can not be played in this browser.
            <!-- <track crossorigin="anonymous" v-for="subtitle in media.subtitles" :key="subtitle" :label="subtitle.label" kind="captions" :srclang="subtitle.lang" :src="subtitle.src" default> -->
        </video>
        <v-card-title class="pt-0 mt-0" v-if="media">{{media.name}}</v-card-title>
        <!-- <v-card-subtitle v-if="media" class=" text-truncate">{{media.year}}</v-card-subtitle> -->
    </v-card>
</template>

<script>
export default {
    name:'player',
    props: {
        media: null,
    },
    data: () => ({
        baseVideoLink: 'http://192.168.50.251:9001/movies'
    }),
    computed: {
        videoLink(){
            return this.baseVideoLink + this.media.video
        },
    }
}
</script>

<style scoped>
video{
    background-color: black;
    width: 60vw;
    /* width:694px; */
    min-height:33vw;
}
</style>