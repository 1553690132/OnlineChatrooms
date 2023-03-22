import { defineStore } from "pinia"
import { userInfoStore } from "./userStore"
import $axios from "@/api"

export const chatPrivateMsgStore = defineStore('chatPrivateMsgStore', {
    state: () => {
        return {
            chatMsg: [],
            headImg: ''
        }
    },
    actions: {
        async updateMsg(info) {
            const userStore = userInfoStore()
            let { data: res } = await $axios.get('chat/gain', { params: { sid: userStore._id, rid: info._id } })
            if (res.status !== 200) return ElMessage({ type: 'error', message: res.message })
            if (!res.message.sendMsg) {
                this.chatMsg.push(...res.message.recMsg.chats)
            } else if (!res.message.recMsg) {
                this.chatMsg.push(...res.message.sendMsg.chats)
            } else {
                this.chatMsg.push(...res.message.sendMsg.chats, ...res.message.recMsg.chats)
            }
            this.chatMsg.sort((a, b) => {
                return a.time - b.time
            })
            this.chatMsg.forEach(e => { if (e.chatType === 1 && e.imgType === 2) thumbnail.push(e.msg) })
        },
    }
})