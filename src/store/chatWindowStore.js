import { defineStore } from "pinia"
import $axios from "@/api"
import { userInfoStore } from "./userStore"

export const chatWindowStore = defineStore('chatWindowStore', {
    state: () => {
        return {
            preCurrent: '',
            showChatWindow: false,
            chatWindowInfo: {},
            isDelete: false
        }
    },
    actions: {
        async chooseChat(info) {
            await this.alreadyRead(info._id)
            this.preCurrent = info._id
            this.showChatWindow = true
            this.chatWindowInfo = info
        },

        clearStatus() {
            this.preCurrent = ''
            this.showChatWindow = false
        },

        async alreadyRead(sid) {
            const userStore = userInfoStore()
            const { data: res } = await $axios.post('chat/reading', { sid, rid: userStore._id })
            if (res.status == 200) await userStore.getUserInfo()
        },
    }
})