import { reactive } from 'vue'

export const store = reactive({
    role: "viewer",
    user_email: "",
    auth_status: "Login",
    isAuth: false
})