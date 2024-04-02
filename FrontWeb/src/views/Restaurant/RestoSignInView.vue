<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/authStore.js';

const router = useRouter();
const authStore = useAuthStore();

let firstName = ref('');
let lastName = ref('');
let email = ref('');
let password = ref('');


function createFirstnameInput(event) {
    firstName = event.target.value
};

function createLastnameInput(event) {
    lastName = event.target.value
};

function createEmailInput(event) {
    email = event.target.value
};

function createPasswordInput(event) {
    password = event.target.value
};

// const isValidEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
// };

// const isValidPassword = (password) => {
//     const regex = /^[A-Za-z]\w{7,14}$/;
//     return regex.test(password);
// };

const submitForm = async () => {
    // if (!isValidEmail(email.value)) {
    //     alert('Invalid email');
    //     return;
    // }
    // if (!isValidPassword(password.value)) {
    //     alert('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
    //     return;
    // }

    try {
        authStore.register(firstName, lastName, email, password);
        // console.log(authStore.register(firstName, lastName, email, password));
        router.push('/RestaurantLogin');
        alert('Account created successfully!');
    } catch (error) {
        alert(error.message);
    }
}
</script>


<template>
    <main class="mainContainer">
        <div class="cardContainer">
            <div class="card">
                <form class="signup-form" action="#" @submit.prevent="submitForm">

                    <label for="signup_firstname">Prénom</label>
                    <input type="text" name="signup_firstname" id="signup_firstname" placeholder="Enter your firstname"
                        @input="createFirstnameInput">

                    <label for="signup_lastname">Nom</label>
                    <input type="text" name="signup_lastname" id="signup_lastname" placeholder="Enter your lastname"
                        @input="createLastnameInput">

                    <label for="signup_email">Email</label>
                    <input type="email" name="signup_email" id="signup_email" placeholder="Enter your email"
                        @input="createEmailInput">

                    <label for="signup_password">Mot de Passe</label>
                    <input type="password" name="signup_password" id="signup_password" placeholder="Enter your password"
                        @input="createPasswordInput">

                    <button type="submit" class="btn btn-dark">Créer un compte</button>
                </form>

                <span>
                    <RouterLink to="/RestaurantLogin">Se connecter</RouterLink>
                </span>
            </div>
        </div>

        <div class="divStyle">
            <h1 class="signup-title">Inscrivez vous pour ajouter votre restaurant</h1>
        </div>


    </main>
</template>

<style scoped>


h1 {
    color: black;
    text-align: center;
    /* margin-top: 100px; */
}

.mainContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
}


.signup-form {
    text-align: center;
    margin-top: 2rem;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

form input {
    width: 15rem;
    margin: 1rem;
    font-family: 'Helvetica Neue';
}

.card {
    width: fit-content;
    text-align: center;
}

.cardContainer {
    display: flex;
    flex: 0.5;
    justify-content: center;
    align-items: center;
}

.divStyle {
    flex: 0.5;
    background-color: var(--secondary-color);
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    align-content: center;
}
</style>