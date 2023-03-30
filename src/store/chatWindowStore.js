import { defineStore } from "pinia"
import { userInfoStore } from "./userStore"
import api from '@/api/_index'

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
            const res = await api.chatMsg.toggleRead({ sid, rid: userStore._id })
            if (res.status == 200) await userStore.getUserInfo()
        },
    }
})