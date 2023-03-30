import { defineStore } from "pinia";
import api from "@/api/_index";

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
            const res = await api.specificInfo.gainInfo({ username })
            this.userInfo = {
                ...res.message, _age: +new Date().toLocaleDateString().substring(0, 4) -
                    +res.message.age.substring(0, 4)
            }
        }
    }
})