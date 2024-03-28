import {ref, computed} from 'vue';
import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', ()=> {
  
  const user = ref(null);

  const isLoggedIn = computed(() => !!user.value);

  function login({username, password}){
    user.value = {username, password}
    
  }

  function logout(){
   user.value = null;
  }

return {user, isLoggedIn, login, logout}

})