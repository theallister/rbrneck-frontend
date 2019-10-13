<template>
    <div id="feed-container" class="view-container-main">
        <div class="feed-item-container" v-for="item in items" :key="item.id">
            <router-link :to="'/items/' + 1" class="no-style-link">
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
    data() {
        return {
            items: [],
            errors: []
        }
    },
    created() {

      client.getAllItems((errors, items) => {
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
.feed-item-text  {
    width: 100%;
    font-size: 1.5em;
}
.feed-item-right-side {
    position: absolute;
    right: 0;
    top: 0;
    width: 8%;
    padding-left: 1.5%;
    height: 100%;
    border-radius: 0 30px 30px 0;

    display: flex;
    align-content: center;
    align-items: center;
}
</style>
