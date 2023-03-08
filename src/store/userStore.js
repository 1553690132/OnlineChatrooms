import { defineStore } from "pinia"
import $axios from "@/api"
import { ElMessage } from "element-plus"

export const userInfoStore = defineStore('userInfoStore', {
    state: () => {
        return {
            _id: '',
            username: '',
            userImg: '',
            friendList: [],
            online: false
        }
    },
    actions: {
        async getUserInfo() {
            try {
                const { data: res } = await $axios.get('/owner/info')
                if (res.status !== 200) return ElMessage({ type: 'error', message: '获取失败!' })
                this._id = res.data.user._id
                this.username = res.data.user.username
                this.userImg = res.data.user.headImg
                this.friendList = []
                this.friendList.push(...res.data.friendList)
                this.friendList.sort((a, b) => {
                    return b.lastTime - a.lastTime
                })
                this.online = true
                return this._id
            } catch (error) {
                return ElMessage({ type: 'error', error })
            }
        },
        listSort(id) {
            if (this.friendList[0]._id !== id) {
                let nowInfo;
                for (let i = 0; i < this.friendList.length; i++) {
                    if (id === this.friendList[i]._id) {
                        nowInfo = this.friendList[i]
                        this.friendList.splice(i, 1)
                    }
                }
                this.friendList.unshift(nowInfo)
            }
        },
    }
})