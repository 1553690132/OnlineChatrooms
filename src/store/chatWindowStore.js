import { defineStore } from "pinia"

export const chatWindowStore = defineStore('chatWindowStore', {
    state: () => {
        return {
            preCurrent: '',
            showChatWindow: false,
            chatWindowInfo: {}
        }
    },
    actions: {
        chooseChat(info) {
            this.preCurrent = info._id
            this.showChatWindow = true
            this.chatWindowInfo = info
        }
    }
})