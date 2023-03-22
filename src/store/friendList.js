import { defineStore } from "pinia"
import $axios from "@/api"
import { ElMessage } from "element-plus"
import { userInfoStore } from "./userStore"

export const friendListInfoStore = defineStore('friendListInfoStore', {
    state: () => {
        return {
            groupList: [],
        }
    },
    actions: {
        async getGroupList() {
            const userStore = userInfoStore()
            await userStore.getUserInfo()
            try {
                const { data: res } = await $axios.get('friendGroup/getFriendGroup', { params: { uid: userStore._id } })
                if (res.status !== 200) return ElMessage({ type: 'error', message: '获取失败!' })
                this.groupList = []
                this.groupList.push(...res.message)
            } catch (error) {
                return ElMessage({ type: 'error', error })
            }
        },
    }
})