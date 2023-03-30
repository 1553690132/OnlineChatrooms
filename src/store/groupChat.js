import { defineStore } from "pinia"
import api from "@/api/_index"

export const groupChatInfoStore = defineStore('groupChatInfoStore', {
    state: () => {
        return {
            groupChatList: [],
            groupChatInfos: {},
            showGroupInfo: false,
            groupMemberAvatar: []
        }
    },
    getters: {
        chatGroupChatList: (state) => {
            const ans = []
            state.groupChatList.forEach(e => {
                if (e.isShow) ans.push(e)
            })
            return ans
        }
    },
    actions: {
        async getGroupChatList() {
            const res = await api.groupChat.gainGroupChat()
            if (res.status !== 200) return ElMessage.error('获取失败!')
            this.groupChatList = []
            this.groupChatList.push(...res.message)
        },
        getChatInfo(gid) {
            for (const e of this.groupChatList) {
                if (e.gid == gid) return e.messages
            }
        },
        async getChooseGroupInfo(gid) {
            const res = await api.groupChat.findGroupById({ gid })
            if (res.status !== 200) return ElMessage.error('获取失败!')
            this.groupChatInfos = { ...res.message.result }
            this.showGroupInfo = true
            this.groupMemberAvatar = []
            this.groupMemberAvatar.push(...res.message.avatars)
        },
        searchGroup(content) {
            const result = []
            this.groupChatList.forEach(e => {
                if (e.groupName.indexOf(content) !== -1) {
                    result.push(e)
                }
            })
            return result
        },
        clearStatus() {
            this.groupChatInfos = {}
            this.showGroupInfo = false
        }
    }
})