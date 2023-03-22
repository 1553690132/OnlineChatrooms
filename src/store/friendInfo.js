import { defineStore } from "pinia"
import { infoStore } from "./infoStore"

export const friendInfoStore = defineStore('friendInfoStore', {
    state: () => {
        return {
            showFriendInfo: false,
            friendInfo: {},
            groupName: ''
        }
    },
    actions: {
        async chooseFriendInfo(info, group) {
            const _infoStore = infoStore()
            await _infoStore.getSpecificInfo(info.username)
            this.showFriendInfo = true
            this.friendInfo = { ..._infoStore.userInfo, ...info }
            this.groupName = group
        },

        clearStatus() {
            this.showFriendInfo = false
            this.friendInfo = {}
        }
    }
})