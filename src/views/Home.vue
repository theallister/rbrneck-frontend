<template>
    <div id="feed-container" class="view-container-main">

        <transition name="input-transition">
            <div class="feed-item-container top-item-container dropshadow" v-if="user.isSignedIn">
                <router-link :to="'/additem'" class="no-style-link">
                        <h2 class="oswald uppercase redtext">
                            start watching
                        </h2>     
                </router-link>
            </div>
        </transition>

        <div class="feed-item-container dropshadow" v-for="item in items" :key="item.id">
            <router-link :to="'/items/' + item.id" class="no-style-link">
                <p class="feed-item-text whitetext robotoThin">
                    <span class="robotoBold">{{item.username}}</span>
                    <span v-if="item.watched == 0"> is </span>
                    <span v-else-if="item.watched == 1"> was </span>
                    watching <span class="robotoBold">{{item.title}}</span>
                    <span v-if="item.series == 1"> season {{item.season}} episode {{item.episode}} </span>
                </p>
                <span class="feed-item-right-side">
                    <button class="button-arrow-to-right"></button>
                </span>
            </router-link>
        </div>

    </div>
</template>

<script>
const client = require("../rbrneck-client")

export default {
    name: 'Home',
    props: ['user'],
    data() {
        return {
            items: {},
            accounts: {},
            errors: [],
            errorsAcc: []
        }
    },
    created() {
      client.getAllItems((errors, items) => {
        this.errors = []
        if (errors.length == 0) {
          this.items = items
        } else {
          this.errors = errors
        }
      })
    }
}
</script>

<style scoped>
.feed-item-container {
    width: 100%;
    border-radius: 30px;

    background-color: rgba(0, 0, 0, 0.15);

    padding: 2.5vh 2em;
    margin: 0.75em 0;

    position: relative;
}
.feed-item-container:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
.top-item-container {
    background-color: #fefefe;
    text-align: center;
    width: 50%;
    margin: 0 auto 2.5%;
    padding: 0.5% 1.5%;
    transition: all 0.5s ease;
}
.top-item-container:hover {
    background-color: #fefefe;
    box-shadow: 0px 5px 0 #8e0e00;
}
.feed-item-text  {
    width: 91%;
    font-size: 1.5em;
}
.feed-item-right-side {
    position: absolute;
    right: 0;
    top: 0;
    width: 8%;
    padding-left: 0;
    height: 100%;
    border-radius: 0 30px 30px 0;

    display: flex;
    align-content: center;
    align-items: center;
}

.input-transition-enter-active, .input-transition-leave-active {
    transition: all 0.5s ease;
}
.input-transition-enter, .input-transition-leave-to {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
}
.input-transition-enter-to, .input-transition-leave {
        -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
}
</style>
