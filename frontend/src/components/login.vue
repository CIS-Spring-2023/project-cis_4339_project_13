<script>
import { store } from '../store';

export default {
    data() {
        return {
            store,
            email: "",
            passwd: "",
            err: false
        }
    },
    methods: {
        auth() {
            if(this.email === "test@example.com" && this.passwd === "12345"){
                store.role = "editor"
                store.user_email = this.email
                console.log("yes")
                this.$router.push('/')
            }
            else {
                err = true
            }
        }
    },
    created() {
        store.role = "viewer"
        store.user_email = "Login"
    }
}
</script>
<template>
    <main>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
            Login Form
        </h1>

        <form class="text-2xl font-bold text-center" @submit.prevent="auth">
            <label >Email</label>
            <input type="text" v-model="email">
            <label>Password</label>
            <input type="password" v-model="passwd">

            <button class="bg-red-700 text-white rounded mt-5 grid-cols-2">Login</button>
        </form>
        <p v-if="err">Incorrect email and/or password</p>
    </main>
</template>

<style>
label {
    padding-left: 10px;
    padding-right: 5px;
}
div {
    padding-top: 10 px;
}
button {
    margin: 10px;
    font-size: medium;
    width: 7%;
}
</style>