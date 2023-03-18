import { defineStore } from "pinia";
import $axios from "@/api";

export const infoStore = defineStore('infoStore', {
    state: () => {
        return {
            userInfo: {
                _age: ''
            },
        }
    },
    actions: {
        async getSpecificInfo(username) {
            const { data: res } = await $axios.get('/info/gainInfo', { params: { username } })
            this.userInfo = {
                ...res.message, _age: +new Date().toLocaleDateString().substring(0, 4) -
                    +res.message.age.substring(0, 4)
            }
        }
    }
})