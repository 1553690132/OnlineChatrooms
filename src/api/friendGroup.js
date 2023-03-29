import request from "@/utils/request";

const friendGroup = {
    async getFriendGroup(params) {
        const { data: res } = await request.get('friendGroup/getFriendGroup', {params})
        return res
    },

    async insertFriendGroup(data) {
        const { data: res } = await request.post('friendGroup/insertFriendGroup', data)
        return res
    },

    async changeFriendGroup(data) {
        const { data: res } = await request.post('friendGroup/changeFriendGroup', data)
        return res
    },

    async sendMessageTo(data) {
        const { data: res } = await request.post('friendGroup/sendMsgTo', data)
        return res
    }
}

export default friendGroup