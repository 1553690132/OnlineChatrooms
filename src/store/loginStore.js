import { defineStore } from "pinia"

export const loginStatusStore = defineStore('loginStatusStore', {
    state: () => {
        return {
            online: false
        }
    },
    getters: {
        changeStatus(state) {
            return state.online = !state.online
        }
    }
})