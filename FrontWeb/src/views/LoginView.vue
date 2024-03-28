<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore.js';

const router = useRouter();
const authStore = useAuthStore();

let email = ref("");
let password = ref("");

function authEmailInput(event) {
    email = event.target.value
};

function authPasswordInput(event) {
    password = event.target.value
};

const submitForm = async () => {
    try {
        await authStore.logIn(email, password);
        router.push('/Dashboard');
    } catch (error) {
        alert(error.message);
    }
};
</script>


<template>
    <main class="mainContainer">

        <div class="cardContainer">

            <div class="card">
                <form class="auth-form" action="#" @submit.prevent="submitForm">

                    <label for="auth_email">Email</label>
                    <input type="email" name="auth_email" id="auth_email" placeholder="Enter your email"
                        @input="authEmailInput">

                    <label for="auth_password">Mot de Passe</label>
                    <input type="password" name="auth_password" id="auth_password" placeholder="Enter your password"
                        @input="authPasswordInput">

                    <button type="submit" class="btn btn-dark">Connexion</button>
                </form>

                <span>
                    <RouterLink to="/SignIn">Créer un compte</RouterLink>
                </span>
            </div>


        </div>
        <div class="divStyle">
            <h1 class="auth-title">Se connecter</h1>
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


.auth-form {
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