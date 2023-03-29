import request from "@/utils/request";

const friend = {
    async increaseFriend(data) {
        const { data: res } = await request.post('friend/increase', data)
        return res
    },

    async deleteFriend(params) {
        const { data: res } = await request.delete('friend/delete', { params })
        return res
    }
}

export default friend