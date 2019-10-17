<template>
    <div id="single-item-container" class="view-container-main red-background thick-border-left">
        
        <span class="flex-line-justify-content">
            <router-link :to="'/'"><button class="button-arrow-to-left"></button></router-link>
            <span><button v-if="user.id == item.accountId" class="button-more" @click="managePost=true"></button></span>
        </span>
        

        <div id="item-information" class="whitetext">
            <span v-if="user.id !== item.accountId">
                <p class="robotoRegular uppercase item-information-details">{{item.username}}
                    <span v-if="item.watched == 0">is</span>
                    <span v-if="item.watched == 1">was</span>
                    watching</p>
                <h2 class="oswald uppercase textshadow">
                    {{item.title}}
                </h2>
                <span v-if="item.series==1">
                    <p class="robotoRegular uppercase item-information-details">season {{item.season}} | episode {{item.episode}}</p>
                </span>
            </span>
            <span v-else>
                <h2 class="oswald uppercase textshadow">you <span v-if="item.watched==0"><span v-if="isWatching">are</span></span><span v-if="item.watched==1 || !isWatching">were</span> watching {{item.title}}</h2>
                <span v-if="item.series==1">
                    <p class="robotoRegular uppercase item-information-details">season {{item.season}} | episode {{item.episode}}</p>
                </span>
                <span v-if="isWatching">
                    <button v-if="item.watched==0" class="dropshadow finish-watching oswald uppercase redtext grow-hover" @click="finishWatching">
                        finish watching
                    </button>
                </span>
            </span>
        </div>

        <div id="item-comments">
            <span v-if="comments.length > 0">
                <transition-group name="comments">
                    <div class="comment-container graytext" :class="{'ownItem':(user.id == item.accountId)}" v-for="comment in comments" :key="comment.id">
                        <div class="comment-container-content robotoThin">{{comment.text}}</div>
                        <button v-if="user.id == item.accountId" class="delete-comment" @click="confirmDeleteComm=true; commentToDelete=comment.id"><span class="whitetext uppercase robotoRegular text-align-center">delete</span></button>    
                    </div>
                </transition-group>
            </span>
        </div>

        <transition name="fade">
            <div id="item-comment-form" v-if="((user.id == item.accountId) && (item.watched == 0) && isWatching)">
                <form @submit.prevent v-if="isWatching">
                    <textarea name="comment-input" id="comment-input" class="dropshadow redtext robotoRegular" cols="30" rows="10" v-model="newComment" placeholder="add a comment..."></textarea>
                    <input type="submit" value="post" id="comment-submit" class="dropshadow oswald uppercase redtext" @click="addComment">
                </form>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="managePost" class="manage-post-overlay dropshadow">
                <ManagePost :user="user" :item="item" @close="managePost=false; getItems()"/>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="confirmDeleteComm" class="manage-post-overlay dropshadow">
                <div class="confirmDeleteContainer" v-if="confirmDeleteContainer">
                    <h2 class="oswald redtext uppercase text-align-center textshadow">Do you want to delete this comment?</h2>
                    <button class="confirmDeleteBtn confirmDeleteComm oswald uppercase text-align-center whitetext red-background dropshadow" @click="deleteComment">delete</button>
                    <button class="confirmDeleteBtn cancelDeleteComm oswald uppercase text-align-center whitetext dropshadow" @click="confirmDeleteComm=false; commentToDelete=''">cancel</button>
                </div>
                <div v-if="deletedCommentConfirmation" class="confirmDeleteContainer oswald uppercase redtext text-align-center">
                    <h2 class="textshadow">comment deleted</h2> 
                </div>
            </div>
        </transition>


        <div v-if="errorsItems.length > 0 || errorsComments.length > 0 || errorsFinish.length > 0 || errorsNewComment.length > 0 || errorsDeleteComment.length > 0"  class="error-msg-container robotoRegular">
            <p v-for="error in errorsItems" :key="error.id">
                <span v-if="error.includes('notFound')">
                    This item can't be found. <br>
                </span>
                <span v-if="error.includes('serverError')">
                    Something went wrong... Try again later <br>
                </span>
            </p>
            <p v-for="error in errorsComments" :key="error.id">
                <span v-if="error.includes('notFound')">
                    No comments found. <br>
                </span>
                <span v-if="error.includes('serverError')">
                    Something went wrong... Try again later <br>
                </span>
            </p>
            <p v-for="error in errorsFinish" :key="error.id">
                <span v-if="error.includes('notFound')">
                    This item can't be found. <br>
                </span>
                <span v-if="error.includes('notAuthorized')">
                    You are not authorized to perform this action. <br>
                </span>
                <span v-if="error.includes('serverError')">
                    Something went wrong... Try again later <br>
                </span>
            </p>
            <p v-for="error in errorsNewComment" :key="error.id">
                <span v-if="error.includes('badRequest')">
                    The comment must be between 5-250 characters. <br>
                </span>
                <span v-if="error.includes('notAuthorized')">
                    You are not authorized to create a comment. <br>
                </span>
                <span v-if="error.includes('serverError')">
                    Something went wrong... Try again later <br>
                </span>
            </p>
            <p v-for="error in errorsDeleteComment" :key="error.id">
                <span v-if="error.includes('notFound')">
                    The comment can't be found. <br>
                </span>
                <span v-if="error.includes('notAuthorized')">
                    You are not authorized to delete this comment. <br>
                </span>
                <span v-if="error.includes('serverError')">
                    Something went wrong... Try again later <br>
                </span>
            </p>
        </div>

    </div>
</template>
<script>
const client = require("../rbrneck-client")
import ManagePost from '@/components/ManagePost.vue'

export default {
    name: 'item',
    props: ['user'],
    data() {
        const itemId = this.$route.params.id
        const user = this.user
        return {
            itemId,
            accountId: user.id,
            comments: [],
            item: [],
            errorsItems: [],
            errorsComments: [],
            errorsFinish: [],
            errorsNewComment: [],
            newComment: '',
            commentSuccess: false,
            isLoadingItem: true,
            isLoadingComments: true, 
            isWatching: true,
            managePost: false,
            commentToDelete: '',
            confirmDeleteComm: false,
            confirmDeleteContainer: true,
            errorsDeleteComment: [],
            deletedCommentConfirmation: false
        }
    },
    created() {
        this.getItems()
        this.getComments()        
    },
    methods: {
        getItems() {
            client.getItemById(this.itemId, (errors, item) => {
                this.isLoadingItem = false
                if(errors.length == 0) {
                    this.item = item
                } else {
                    this.errorsItems = errors
                }
            })
        },
        getComments() {
            client.getCommentsByItemId(this.itemId, (errors, comments) => {
                this.isLoadingComments = false;
                if (errors.length == 0) {
                    this.comments = comments
                } else {
                    this.errorsComments = errors
                }
            })
        },
        finishWatching() {
            client.finishWatching(this.itemId, this.user.accessToken, (errors) => {
                if(errors.length == 0) {
                    this.isWatching = false
                } else {
                    this.errorsFinish = errors
                }
            })
        },
        addComment() {
            this.commentSuccess = false
            let comment = {
                accountId: this.accountId,
                text: this.newComment
            }
            client.createComment(comment, this.itemId, this.user.accessToken, (errors) => {
                if(errors.length == 0) {
                    this.comment = comment
                    this.commentSuccess = true
                    this.newComment = ''
                    this.getComments()
                } else {
                    this.errorsNewComment = errors
                }
            })
        },
        deleteComment() {
            client.deleteCommentById(this.commentToDelete, this.user.accessToken, (errors) => {
                if(errors.length == 0) {
                    this.commentToDelete = ''        
                    this.confirmDeleteContainer = false
                    this.deletedCommentConfirmation = true
                    setTimeout(() => {
                        this.deletedCommentConfirmation = false
                        this.confirmDeleteComm = false
                        this.confirmDeleteContainer = true
                    }, 500);
                    setTimeout(() => {
                        this.getComments()
                    }, 600);
                } else {
                    this.errorsDeleteComment = errors
                }
            })
        }
    },
    components: {
      ManagePost
    },
   
}
</script>
<style scoped>

#item-information {
    text-align: center;
    margin-bottom: 10px;
}
.flex-line-justify-content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-right: -3%;
}
    .item-information-details {
        margin: 0;
        font-size: 0.7em;
    }
#item-comments {
    flex-basis: 70vh;
    flex-grow: 0;
    overflow: scroll
}
    .comment-container {
        width: 100%;
        margin-bottom: 5%;
        position: relative;
        transition: all 0.2s ease;
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
        border-radius: 10px;
        background-color: #fefefe;
        padding: 2.5%;
        margin: 0.5%;
        font-size: 0.9em;
    }
    .comment-container:hover {
        scale: 0.99;
    }
    .ownItem:hover {
        width: 97%;
    }
    .delete-comment {
        display: none;
        background-color: rgba(0,0,0,0);
        border: none;
        height: 100%;
    }
    .delete-comment span {
        writing-mode: vertical-lr;
    }
    .ownItem:hover .delete-comment {
        display: inline;
        position: absolute;
        right: -3%;
        top: 0;
    }
    .delete-comment span:hover {
        font-weight: 900;
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
    border-radius: 10px;
}
.manage-post-overlay {
    width: 64%;
    height: 100vh;
    background-color: rgba(14,14,14,0.5);
    background-blend-mode: multiply;
    position: fixed;
    top: 0;
    right: 0;
}
.confirmDeleteContainer {
    background-color: #fefefe;
    position: fixed;
    top: 35%;
    right: 10%;

    padding: 3% 1%;
    width: 40%;

    border-radius: 10px;

    display: flex;
    flex-flow: column;
    align-items: center;
    align-content: space-around;
    justify-content: center;
}
.confirmDeleteContainer button {
    border: none;
    padding: 1% 5%;  
    box-sizing: content-box;
    font-size: 1em;
    border-radius: 10px;
    margin: 2.5% auto;
}
.confirmDeleteContainer button.cancelDeleteComm {
    background-color: darkgrey;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease-in;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.comments-enter-active, .comments-leave-active {
    transition: all .3s ease;
}
.comments-enter {
    transform: translateY(100vh);
}
.comments-enter-to {
    transform: translateY(0)
}
.comments-leave-to {
    opacity: 0;
}
</style>
