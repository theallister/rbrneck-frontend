<template>
    <div v-if="this.isLoading == false" id="single-item-container" class="view-container-main red-background thick-border-left">
        <router-link :to="'/'"><button class="button-arrow-to-left"></button></router-link>

        <div id="item-information" class="whitetext">
            <span v-if="user.id !== item.accountId">
                <p class="robotoRegular uppercase item-information-details">{{item.username}} 
                    <span v-if="item.watched == 0">is</span>
                    <span v-if="item.watched == 1">was</span>
                    watching</p>
                <h2 class="oswald uppercase">
                    {{item.title}}
                </h2>
                <span v-if="item.series==1">
                    <p class="robotoRegular uppercase item-information-details">season {{item.season}} | episode {{item.episode}}</p>
                </span>
            </span>
            <span v-else>
                <h2 class="oswald uppercase">you <span v-if="item.watched==0">are</span><span v-else>were</span> watching {{item.title}}</h2>
                <span v-if="item.series==1">
                    <p class="robotoRegular uppercase item-information-details">season {{item.season}} | episode {{item.episode}}</p>
                </span>
                <button v-if="item.watched==0" class="finish-watching oswald uppercase redtext" @click="finishWatching">finish watching</button>
            </span>
        </div>

        <div id="item-comments">
            <div class="comment-container graytext" v-for="comment in comments" :key="comment.id">
                <div class="comment-container-content robotoThin ">{{comment.text}}</div>
            </div>
        </div>

        <div id="item-comment-form" v-if="(user.id == item.accountId) && (item.watched == 0)">
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
    props: ['user'],
    data() {
        return {
          comments: {},
          item: {},
          errors: [],
          newComment: '',
          isLoading: true,
          errorsFinish: []
        }
    },
     beforeMount() {
       let itemId = this.$route.params.id
          client.getItemById(itemId, (errors, item) => {
           if (errors.length == 0) {
             this.item = item
             this.isLoading = false
           } else {
             this.errors = errors
           }
         })

    },
    watch: {
      testFunction: function() {
        let itemId = this.$route.params.id
        if (this.isLoading == false) {
          client.getCommentsByItemId(itemId, (errors, comments) => {
            if (errors.length == 0) {
              this.comments = comments
            } else {
              this.errors = errors
            }
          })
        }
      }
    },
    methods: {
        finishWatching() {
            let itemId = this.$route.params.id
            client.finishWatching(itemId, this.user.accessToken, (errors, id) => {
                if(errors.length == 0) {
                    
                } else {
                    this.errorsFinish = errors
                }
            })
        }
    }
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

.finish-watching {
    margin-top: 1%;
    font-size: 1.2em;
    padding: 0.5% 2%;
    border: none;
    border-radius: 40px;
}
</style>
