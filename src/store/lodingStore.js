import { defineStore } from "pinia"

export const loadingStore = defineStore('loadingStore', {
    state: () => {
        return {
            isLoading: false
        }
    },
    getters: {
        showLoading(state) {
            state.isLoading = true
        },
        hideLoading(state) {
            state.isLoading = false
        }
    }
})