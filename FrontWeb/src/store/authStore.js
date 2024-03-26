import { defineStore } from "pinia";
import axios from 'axios';

const API_URL = 'http://10.125.52.56:3000/api/manager/';

export const useAuthStore = defineStore('manager', () => {

    async function logIn(email, password) {
        const response = await axios.post(API_URL + 'logIn', {
            email: email,
            password: password
        });
        if (response.data.token) {
            localStorage.setItem('manager', JSON.stringify(response.data));
        }
        return response.data;
    }

    function logOut() {
        localStorage.removeItem('manager');
        router.push('/')
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

    return { logIn, logOut, register };
})