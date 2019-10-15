<template>
<div>
    <transition name="fade">
        <div id="manage-post-pop-up" v-if="!editMode">
            <button class="whitetext red-background oswald uppercase" @click="editMode=true">edit</button>
            <button class="whitetext red-background oswald uppercase">delete</button>
            <button class="whitetext uppercase oswald cancel-edit" @click="$emit('close')">cancel</button>
        </div>
    </transition>

    <transition name="fade">
        <div id="edit-post-form" v-if="editMode" class="robotoRegular redtext">
            <form @submit.prevent v-if="!success">
                <span class="form-input-container">
                    <label for="input-title">edit title</label>
                    <input type="text" name="username" id="input-title" class="whitetext red-background" v-model="newTitle" @input="titleHint=true">
                    <p class="input-hint robotoRegular" v-if="titleHint">Write the new title of what you are watching; {{newTitle.length}}/50 characters.</p>
                </span>
                
                <span v-if="item.series==1">
                    <span class="form-input-flex-row shorter-input">
                        <label for="season-input">season</label>
                        <input type="number" min="0" name="season" id="season-input" class="whitetext red-background" v-model.number="newSeason">
                    </span>
                    <span class="form-input-flex-row shorter-input">
                        <label for="episode-input">episode</label>
                        <input type="number" min="0" name="episode" id="episode-input" class="whitetext red-background" v-model.number="newEpisode">
                    </span>
                    <span class="form-input-flex-row cancel-submit-row">
                        <button @click="editMode=false" class="whitetext uppercase robotoBold cancel-edit">cancel</button>
                        <input type="submit" value="save changes" id="form-submit"  class="whitetext red-background uppercase robotoBold" @click="updateItem">
                    </span>
                </span>
            </form>
            <span v-else> item successfully updated </span>
        </div>
    </transition>
</div>
</template>

<script>
const client = require("../rbrneck-client")

export default {
    name: 'managepost',
    props: ['user', 'item', 'id'],
    data() {
        const item = this.item
        const user = this.user
        return {
            editMode: false,
            newTitle: '',
            newSeason: 0,
            newEpisode: 0,
            success: false,
            errors: [],
            titleHint: false
        }
    },
    created() {
        console.log(this.item)
    },
    methods: {
        updateItem: function() {
            let updatedItem = {
                newTitle: this.newTitle,
                newSeason: this.newSeason,
                newEpisode: this.newEpisode
            }
            console.log(this.itemId)
            client.updateItemById(this.item.id, updatedItem, this.user.accessToken, (errors) => {
                if(errors.length == 0) {
                    this.success = true
                } else {
                    this.errors = errors
                }
            })
        }
    }
}
</script>
<style scoped>
#manage-post-pop-up, #edit-post-form {
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
#manage-post-pop-up button {
    margin: 5%;
    padding: 2% 7.5%;

    font-size: 1.2em;

    border: none;
    border-radius: 20px;
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