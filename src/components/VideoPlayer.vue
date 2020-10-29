<template>
    <v-card max-width="100vw" color="rgb(0, 0, 0, 0.0)" elevation="0">
        <video crossorigin="anonymous" ref="video" v-if="media" :key="media.id" poster="http://192.168.50.251:9000/image/original/dFYguAfeVt19qAbzJ5mArn7DEJw.jpg" style="outline: none" preload="none" controls controlsList="nodownload">
            <source crossorigin="anonymous" :src="media.video.src" type="video/mp4">
            video can not be played in this browser.
            <track crossorigin="anonymous" v-for="subtitle in media.subtitles" :key="subtitle.id" :label="subtitle.label" kind="captions" :srclang="subtitle.lang" :src="subtitle.src" default>
        </video>
        <v-card-title class="pt-0 mt-0" v-if="media">{{media.name}}</v-card-title>
        <v-card-subtitle v-if="media" class=" text-truncate">{{media.year}}</v-card-subtitle>
    </v-card>
</template>

<script>
export default {
    name:'player',
    props: {
        media: null
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