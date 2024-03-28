import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';

const API_URL = 'http://10.125.52.56:3000/api/manager/';

export const useAuthStore = defineStore('manager', () => {
    const router = useRouter();
    // const currentManager = ref(null);
    // const token = ref('');
    const isLoggedIn = ref(false);

    async function logIn(email, password) {
        const response = await axios.post(API_URL + 'logIn', {
            email: email,
            password: password
        });
        if (response.data.token) {
            
            // currentManager.value = email;
            isLoggedIn.value = true;
            console.log(isLoggedIn.value);
            // localStorage.setItem('currentManager', email);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', response.data.token);
            console.log(response.data);

        }
        return response.data;
    }

    function logOut() {
        console.log(localStorage.getItem('token'))
        // currentManager.value = null;
        isLoggedIn.value = false;
        // localStorage.removeItem('currentManager');
        localStorage.setItem('isLoggedIn', 'false');
        
        localStorage.removeItem('token');
        console.log('logged out');
        console.log(localStorage.getItem('token'))
        router.push('/Login')
    }

    async function register(firstName, lastName, email, password) {
        const response = await axios
            .post(API_URL + 'signUp', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
            })
    }

    // async function isLoggedIn() {
    //     const manager = JSON.parse(localStorage.getItem('managers'));
    //     if (manager) {
    //         const response = await axios.get(API_URL + 'checkToken', {
    //             headers: { Authorization: `Bearer ${manager.token}` }
    //         });
    //         return response.data;
    //     }
    // }

    const checkLoginStatus = () => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (loggedIn) {
            currentManager.value = localStorage.getItem('currentManager');
            isLoggedIn.value = true;
        }
    };

    return { logIn, logOut, register, isLoggedIn, checkLoginStatus };
})


