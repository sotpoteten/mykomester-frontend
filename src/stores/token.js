import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore("token", () => {
  const savedToken = ref(null);
  const loggedInUser = ref(null);

  function saveInStore(email, token) {
    savedToken.value = token;
    loggedInUser.value = email;
  }

  function clearStore() {
    savedToken.value = null;
    loggedInUser.value = null;
  }

  function getAuthorizationConfig() {
    return {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + savedToken.value
      }
    };
  }

  function getUser() {
    return loggedInUser.value;
  }

  return { savedToken, loggedInUser, saveInStore, clearStore, getAuthorizationConfig, getUser }
},
{
  persist: {
    enabled: true,
    storage: sessionStorage
  }
})
