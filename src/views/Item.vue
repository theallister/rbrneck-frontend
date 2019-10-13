<template>
    <div id="single-item-container" class="view-container-main red-background thick-border-left">
        <router-link :to="'/'"><button class="button-arrow-to-left"></button></router-link>

        <div id="item-information" class="whitetext">
            <p class="robotoRegular uppercase item-information-details">{{item.username}} was watching</p>
            <h2 class="oswald uppercase">
                {{item.title}}
            </h2>
            <p class="robotoRegular uppercase item-information-details">season {{item.season}} | episode {{item.episode}}</p>
        </div>

        <div id="item-comments">
            <div class="comment-container graytext" v-for="comment in comments" :key="comment.id">
                <div class="comment-container-content robotoThin ">{{comment.text}}</div>
            </div>
        </div>

        <div id="item-comment-form"> <!-- add conditional: if logged in, if own's post-->
            <form @submit.prevent>
                <textarea name="comment-input" id="comment-input" class="redtext robotoRegular" cols="30" rows="10" v-model="newComment" placeholder="add a comment..."></textarea>
                <input type="submit" value="post" id="comment-submit" class="oswald uppercase redtext">
            </form>
        </div>
    </div>
</template>
<script>
const client = require("../rbrneck-client")

export default {
    name: 'item',
    data() {
        return {
            item: {
                    id: 5,
                    username: 'Alice',
                    title: 'The Good Place',
                    series: 1,
                    season: 2,
                    episode: 4,
                    watched: 0
                },
            comments: [
                {
                    id: 1,
                    text: 'comment no 1'
                },
                {
                    id: 2,
                    text: 'this is the second comment on this post. might be this long? dunno'
                },
                {
                    id: 3,
                    text: 'third comment. probably not longer than that previous one, people arent that chatty, are they? anyway, third comment here!!'
                },
                {
                    id: 4,
                    text: 'fourth comment on this post!'
                },
                {
                    id: 5,
                    text: 'this is the fifth comment, lets goooo'
                }
            ],
            newComment: ''
        }
    },
}
</script>
<style scoped>

#item-information {
    text-align: center;
    margin-bottom: 10px;
}
    .item-information-details {
        margin: 0;
        font-size: 0.7em;
    }
#item-comments {
    flex-basis: 75vh;
    flex-grow: 0;
    overflow: scroll
}
    .comment-container {
        width: 100%;
        margin-bottom: 5%;
        position: relative;
    }
    .comment-container::after {
        content: ' ';
        width: 2em;
        height: 2em;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom left;
        position: absolute;
        bottom: -0.75em;
    }
        .comment-container:nth-child(even)::after {
            background-image: url('../assets/tail-left.svg');
            left: 0
        }
        .comment-container:nth-child(odd)::after {
            background-image: url('../assets/tail-right.svg');
            right: 0
        }
    .comment-container-content {
        border-radius: 15px;
        background-color: #fefefe;
        padding: 2.5%;
        margin: 0.5%;
        font-size: 0.9em;
    }
    #item-comment-form form {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    #comment-input {
        width: 80%;
        height: 10vh;

        padding: 1.5%;

        border: none;
        outline: none !important;
        border-radius: 10px 0 0 10px;

        font-size: 0.9em;
    }
    #comment-submit {
        width: 17.5%;
        height: 10vh;

        border: none;
        outline: none !important;
        border-radius: 0 10px 10px 0;

        font-size: 1.7em;

        transition: 0.2s ease-in;
    }
    #comment-submit:hover {
        cursor: pointer;
        width: 20%;
    }


</style>
