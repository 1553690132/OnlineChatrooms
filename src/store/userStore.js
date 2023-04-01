import { defineStore } from "pinia"
import api from '@/api/_index'

export const userInfoStore = defineStore('userInfoStore', {
    state: () => {
        return {
            _id: '',
            username: '',
            nickname: '',
            userImg: '',
            detail: '',
            chatFriendList: [],
            online: false,
        }
    },
    actions: {
        async getUserInfo() {
            try {
                const res = await api.userInfo.getUserInfos()
                if (res.status !== 200) return ElMessage({ type: 'error', message: '获取失败!' })
                this._id = res.data.user._id
                this.username = res.data.user.username
                this.nickname = res.data.user.nickname
                this.userImg = res.data.user.headImg
                this.detail = res.data.user.detail
                this.chatFriendList = []
                this.chatFriendList.push(...res.data.chatFriendList)
                this.chatFriendList.sort((a, b) => {
                    return b.lastTime - a.lastTime
                })
                this.online = true
                return this._id
            } catch (error) {
                console.log(error);
                return ElMessage({ type: 'error', error })
            }
        },
        listSort(id) {
            if (this.chatFriendList[0]._id !== id) {
                let nowInfo;
                for (let i = 0; i < this.chatFriendList.length; i++) {
                    if (id === this.chatFriendList[i]._id) {
                        nowInfo = this.chatFriendList[i]
                        this.chatFriendList.splice(i, 1)
                    }
                }
                this.chatFriendList.unshift(nowInfo)
            }
        },
    }
})