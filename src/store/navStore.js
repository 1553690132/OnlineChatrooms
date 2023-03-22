import { defineStore } from "pinia"

export const navInfoStore = defineStore('navInfoStore', {
    state: () => {
        return {
            current: 0
        }
    },
    actions: {
        changeMenu(index) {
            sessionStorage.setItem('current', index)
            this.current = index
        }
    }
})