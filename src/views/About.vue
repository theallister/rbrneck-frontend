<template>
    <div class="view-container-main thick-border-left whitetext">
        <h2 class="oswald uppercase">rbrneck</h2>
        <span class="preamble robotoBold">
            Welcome to rbrneck – the community for people who watch a lot and think a lot. Rbrneck is the platform for sharing your thoughts while watching TV-shows, Netrflix series or movies.
        </span>
        <span class="maintext robotoThin">
            To get started, simply <router-link :to="'/login'" class="no-style-link robotoBold redtext">log in</router-link> or <router-link :to="'/signup'" class="no-style-link robotoBold redtext">sign up</router-link>, add your show and start commenting! Your watch item will be saved in the feed so other people can take part of your thoughs.
        </span>
        <span class="maintext robotoThin">
            You can browse around the feed to see what other people are watching, too!
        </span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>