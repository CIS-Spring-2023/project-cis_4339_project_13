<script>
import { store } from '../store';

export default {
    data() {
        return {
            store,
            err: false
        }
    },
    methods: {
        async auth() {
                await fetch('http://localhost:3000/login/login', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: this.email, passwd: this.passwd})
                
             })
             .then(response => response.json())
             .then(data => {
                this.store.user_email = data.email
                this.store.role = data.role
            })
            .catch(error => {
                alert("Incorrect email and password")
            });

                // console.log(await response.json().data)
                // store.role = "editor"
                // store.user_email = this.email
                // store.auth_status = "SignOut"
                // console.log("yes")
                // // this.$router.push('/')
                // console.log(await )
                // return response.json();
        
            
                
        }
    },
    created() {
        store.isAuth = false
        store.auth_status = "Login"
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

<!-- 
    Users have 2 roles viewers and editors
    non logged in users can only see the dashboard
    Password Hashed
    Only one instance
 -->