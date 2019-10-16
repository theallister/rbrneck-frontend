<template>
<div class="dropshadow">
    <transition name="fade">
        <div id="manage-post-pop-up" v-if="!editMode && !confirmDelete">
            <button class="whitetext red-background oswald uppercase dropshadow" @click="editMode=true">edit</button>
            <button class="whitetext red-background oswald uppercase dropshadow" @click="confirmDelete=true">delete</button>
            <button class="whitetext uppercase oswald cancel-edit dropshadow" @click="$emit('close')">cancel</button>
        </div>
    </transition>
    <transition name="fade">
        <span v-if="confirmDelete" id="confirm-delete-form">
            <span v-if="!deleted">
                <h2 class="oswald uppercase redtext text-align-center textshadow">Are you sure you want to delete this item?</h2>
                <button class="whitetext red-background oswald uppercase dropshadow" @click="deleteItem">delete</button>
                <button class="whitetext uppercase oswald cancel-edit dropshadow" @click="confirmDelete=false">Cancel</button>
            </span>
            <span v-else>
            <h2 class="redtext oswald text-align-center uppercase textshadow">Item deleted!</h2>
            <router-link :to="'/'">
                <button class="whitetext uppercase oswald cancel-edit dropshadow">Back to home</button>
            </router-link>
            </span>
        </span>
    </transition>

    <transition name="fade">
        <div id="edit-post-form" v-if="editMode" class="robotoRegular redtext">
            <h2 class="oswald uppercase textshadow">you are editing {{item.title}}</h2>
            <form @submit.prevent v-if="!success">
                <span class="form-input-container">
                    <label for="input-title">new title:</label>
                    <input type="text" name="username" id="input-title" class="whitetext red-background dropshadow" v-model="newTitle" @input="titleHint=true">
                    <p class="input-hint robotoRegular" v-if="titleHint">Write your new title; {{newTitle.length}}/50 characters.</p>
                </span>
                
                <span v-if="item.series==1">
                    <span class="form-input-flex-row shorter-input">
                        <label for="season-input">season:</label>
                        <input type="number" min="0" name="season" id="season-input" class="whitetext red-background dropshadow" v-model.number="newSeason">
                    </span>
                    <span class="form-input-flex-row shorter-input">
                        <label for="episode-input">episode:</label>
                        <input type="number" min="0" name="episode" id="episode-input" class="whitetext red-background dropshadow" v-model.number="newEpisode">
                    </span>
                </span>
                    <span class="form-input-flex-row cancel-submit-row">
                        <button @click="editMode=false" class="whitetext uppercase oswald cancel-edit dropshadow">cancel</button>
                        <input type="submit" value="save changes" id="form-submit"  class="whitetext red-background uppercase oswald dropshadow" @click="updateItem">
                    </span>
            </form>
            <span v-else class="text-align-center"> item successfully updated 
                <button class="whitetext uppercase oswald cancel-edit dropshadow" @click="$emit('close')">OK!</button>
            </span>
        </div>
    </transition>
    
    
</div>
</template>

<script>
const client = require("../rbrneck-client")

export default {
    name: 'managepost',
    props: ['user', 'item'],
    data() {
        const item = this.item
        const user = this.user
        return {
            editMode: false,
            newTitle: '',
            newSeason: 0,
            newEpisode: 0,
            success: false,
            deleted: false,
            errors: [],
            titleHint: false,
            confirmDelete: false
        }
    },
    created() {
        console.log(this.item)
    },
    methods: {
        updateItem: function() {
            let updatedItem = {
                title: this.newTitle,
                season: this.newSeason,
                episode: this.newEpisode
            }
            client.updateItemById(this.item.id, updatedItem, this.user.accessToken, (errors) => {
                console.log('updated '+updatedItem)
                if(errors.length == 0) {
                    this.success = true
                } else {
                    this.errors = errors
                }
            })
        },
        deleteItem: function() {
            client.deleteItemById(this.item.id, this.user.accessToken, (errors) => {
                if(errors.length == 0) {
                    this.deleted = true
                } else {
                    this.errors.push(errors)
                }
            })
        }

    }
}
</script>
<style scoped>
#manage-post-pop-up, #edit-post-form, #confirm-delete-form, #confirm-delete-form span {
    background-color: #fefefe;
    position: fixed;
    top: 35%;
    right: 17.5%;

    padding: 3% 0;
    width: 25%;

    border-radius: 30px;

    display: flex;
    flex-flow: column;
    align-items: center;
    align-content: space-around;
    justify-content: center;
}
#manage-post-pop-up button,
#confirm-delete-form button {
    margin: 2.5% 5%;
    padding: 1% 7.5%;

    font-size: 1.2em;

    border: none;
    border-radius: 20px;

    white-space: nowrap;
}
#confirm-delete-form span {
    width: 53%;
    right: 5%;
    padding:3% 5%;
}

#edit-post-form {
    width: 53%;
    right: 5%;
    top: 25%;
}
#edit-post-form form {
    width: 100%;
}
.input-hint {
    font-size: 0.7em;
    text-align: right;
    margin-top: 1px;
    margin-right: 10px;
}
.form-input-flex-row {
    display: flex;
    flex-flow: row;
    justify-content: center;

    width: 100%;
    margin: 2% auto;
}
.cancel-submit-row {
    width: 60%;
}

.shorter-input label {
    line-height: 3em;
}
.shorter-input input {

    font-size: 1em;
    line-height: 4em;
    text-align: center;
    height: 3em;
    width: 3em;

    text-align: center;
    margin-left: 1%;
    text-indent: 10px;

    border-radius: 50%;

    border: none;
}
#form-submit, .cancel-edit {
    padding: 3% 5%;  
    box-sizing: content-box;
    font-size: 1em;
    border: none;
    border-radius: 30px;
    margin: 2.5% auto;
}
.cancel-edit {
    background-color: darkgrey;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>