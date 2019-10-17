<template>
    <div id="addItem-container" class="view-container-main red-background thick-border-left whitetext">
        <h2 class="oswald uppercase text-align-center textshadow">start watching</h2>
        <form @submit.prevent class="robotoRegular">
            <span class="form-input-container">
                <label for="input-username">what are you watching?</label>
                <input type="text" name="username" id="input-username" class="redtext dropshadow" v-model="title" @input="titleHint=true">
                <p class="input-hint robotoThin" v-if="titleHint">Write the title of what you are going to watch; {{title.length}}/50 characters.</p>
            </span>
            <span class="form-input-flex-row">
                <input type="radio" name="seriesToggle" id="series" value="1" v-model.number="series" class="radioButtonHidden">
                <label class="radioButtonLabel uppercase robotoBold" for="series">series</label>

                <input type="radio" name="seriesToggle" id="movie" value="0" v-model.number="series" class="radioButtonHidden">
                <label class="radioButtonLabel uppercase robotoBold" for="movie">movie</label>
            </span>
            <transition name="input-transition">
                <span v-if="series==1" class="form-input-flex-row shorter-input">
                    <label for="season-input">season</label>
                    <input type="number" min="0" name="season" id="season-input" class="redtext dropshadow" v-model.number="season">
                </span>
            </transition>
            <transition name="input-transition">
                <span v-if="series==1 && season > 0" class="form-input-flex-row shorter-input">
                    <label for="episode-input">episode</label>
                    <input type="number" min="0" name="episode" id="episode-input" class="redtext dropshadow" v-model.number="episode">
                </span>
            </transition>
            <input type="submit" value="start watching" id="form-submit" class="redtext uppercase robotoBold dropshadow" @click="addNewItem">
        </form>
        <div class="error-msg-container robotoRegular">
            <p v-for="error in errors" :key="error.id">
                <span v-if="error.includes('badRequest')">
                    Something is wrong with your input – did you fill all the fieds? <br>
                    <span v-if="title.length < 3 || title.length > 50">
                        Your title must be between 3 and 50 characters. <br>
                    </span>    
                    <span v-if="series == 1 && (season==0 || episode==0)">
                        You must specify season and episode. <br>
                    </span>
                </span>
                <span v-if="error.includes('notAuthorized')">
                    Item can't be added – are you logged in? <br>
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

export default {
    name: 'additem',
    props: ['user'],
    data() {
        const user = this.user
        return {
            accountId: user.id,
            username: user.username,
            title: '',
            series: Number,
            season: 0,
            episode: 0,
            watched: 0,
            errors: [],
            success: false,
            titleHint: false
        }
    },
    methods: {
        addNewItem() {
            let item = {
                accountId: this.accountId,
                username: this.username,
                title: this.title,
                series: this.series,
                season: this.season,
                episode: this.episode,
                watched: this.watched
            }
            client.createItem(item, this.user.accessToken, (errors, id) => {
                if(errors.length > 0) {
                    this.errors = errors
                } else {
                    this.success = true
                    this.$router.push('/items/' + id)
                }
            })
        }
    }
}
</script>
<style scoped>
.input-hint {
    font-size: 0.8em;
    text-align: right;
    margin-top: 0;
}
.form-input-flex-row {
    display: flex;
    flex-flow: row;
    justify-content: center;

    width: 80%;
    margin: 2% auto;
}
.radioButtonHidden {
    width: 0px;
    overflow: hidden;
    opacity: 0;
}
.radioButtonLabel {
    margin: 2%;
    cursor: pointer;

    font-size: 1em;
    line-height: 4em;
    text-align: center;
    height: 4em;
    width: 4em;
    border-radius: 50px;
}
input[type="radio"]:checked + label {
    background-color: #fefefe;
    color: rgba(172,17,0,1);

    -webkit-box-shadow: -1px 1px 2px 0px rgba(0,0,0,0.4);
    -moz-box-shadow: -1px 1px 2px 0px rgba(0,0,0,0.4);
    box-shadow: -1px 1px 2px 0px rgba(0,0,0,0.4);
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
#form-submit {
    margin-top: 7%;
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