<template>
    <div id="about-container" class="view-container-main thick-border-left whitetext">
        <span id="background-overlay" class="view-container-main">
            <h2 class="oswald uppercase grow-hover">rbrneck</h2>
            <span class="preamble robotoBold">
                Welcome to rbrneck – the community for people who watch a lot and think a lot. Rbrneck is the platform for sharing your thoughts while watching TV-shows, Netflix series, movies, or anything else.
            </span>
            <span class="maintext robotoThin">
                To get started, simply <router-link :to="'/login'" class="no-style-link robotoBold whitetext">log in</router-link> or <router-link :to="'/signup'" class="no-style-link robotoBold whitetext">sign up</router-link>, add your show and start sharing. Your watch item will be saved in the feed so other people can take part of your thoughts.
            </span>
            <span class="maintext robotoThin">
                Don't know what to watch? Browse the feed to see what other people are watching, and let their input guide you!
            </span>
        </span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
#about-container {

    background-image: url('../assets/about-background.jpg');
    background-size: 200%;
}
#background-overlay {
    padding-top: 12.5%;
    width: 100%;
    background-color: rgba(142,14,0,0.5);
}
#about-container h2 {
    text-align: center;
    font-size: 3em;
}
#about-container .preamble {
    width: 60%;
    margin: 0 auto;
    text-align: center
}
.maintext {
    margin: 2% auto 0;
    width: 70%;
}
.no-style-link:hover {
    text-decoration: underline;
}
</style>