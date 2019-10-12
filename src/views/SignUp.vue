<template>
    <div id="signup-container" class="view-container-main red-background thick-border-left whitetext">
        <h2 class="oswald uppercase text-align-center">sign up</h2>
        <p class="whiteText robotoThin smalltext-50percentwide text-align-center">
            Watching a show? Got a lot to say? Join RBRNECK to share your insights with the rest of the community!
        </p>
        <form @submit.prevent id="signup-form-container" class="robotoRegular">
            <span class="form-input-container">
                <label for="input-username">username:</label>
                <input type="text" name="username" id="input-username" class="redtext">
            </span>
            <span class="form-input-container">
                <label for="input-password">password:</label>
                <input type="password" name="password" id="input-password" class="redtext">
            </span>
            <input type="submit" value="sign up" id="sign-up-form-submit" class="redtext uppercase robotoBold">
        </form>
    </div>
</template>
<script>
export default {
    name: 'signup'
}
</script>
<style scoped>
.form-input-container {
    display: flex;
    flex-flow: column;
    width: 80%;
    margin: 2% auto;
}
.form-input-container label {
    text-indent: 15px;
    margin-bottom: 5px;
}
.form-input-container input {
    font-size: 1em;
    line-height: 1.7em;
    padding: 1% 2.5%;

    border-radius: 20px;

    border: none;
}
#sign-up-form-submit {
    box-sizing: content-box;
    padding: 1% 5%;
    font-size: 1em;
    border: none;
    border-radius: 30px;
    display: block;
    margin: 2.5% auto;
}
</style>