import request from "@/utils/request";

const specificInfo = {
    async gainInfo(params) {
        const { data: res } = await request.get('info/gainInfo', { params })
        return res
    },

    async configInfo(data) {
        const { data: res } = await request.post('info/configInfo', data)
        return res
    },

    async updateAvatar(data) {
        const { data: res } = await request.post('info/updateAvatar', data)
        return res
    }
}

export default specificInfo