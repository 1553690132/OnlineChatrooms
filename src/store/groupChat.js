import { defineStore } from "pinia"
import $axios from "@/api"
import { ElMessage } from "element-plus"

export const groupChatInfoStore = defineStore('groupChatInfoStore', {
    state: () => {
        return {
            groupChatList: []
        }
    },
    actions: {
        async getGroupChatList() {
            const { data: res } = await $axios.get('/groupChat/gain')
            if (res.status !== 200) return ElMessage.error('获取失败!')
            this.groupChatList = []
            this.groupChatList.push(...res.message)
        },
        getChatInfo(gid) {
            for (const e of this.groupChatList) {
                if (e.gid == gid) return e.messages
            }
        }
    }
})