import { defineStore } from "pinia"
import $axios from "@/api"

export const chatWindowStore = defineStore('chatWindowStore', {
    state: () => {
        return {
            preCurrent: '',
            showChatWindow: false,
            chatWindowInfo: {},
        }
    },
    actions: {
        chooseChat(info) {
            this.preCurrent = info._id
            this.showChatWindow = true
            this.chatWindowInfo = info
        },

        clearStatus() {
            this.preCurrent = ''
            this.showChatWindow = false
        },
    }
})