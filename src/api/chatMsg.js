import request from "@/utils/request";

const chatMsg = {
    async gainMsg(params) {
        const { data: res } = await request.get('chat/gain', { params })
        return res
    },

    async sendMessage(data) {
        const { data: res } = await request.post('chat/send', data)
        return res
    },

    async sendFile(data) {
        const { data: res } = await request.post('chat/file', data)
        return res
    },

    async hideMessage(data) {
        const { data: res } = await request.put('chat/hide', data)
        return res
    },

    async toggleRead(data) {
        const { data: res } = await request.post('chat/reading', data)
        return res
    },

    async deleteMessage(params) {
        const { data: res } = await request.delete('chat/delete', { params })
        return res
    }
}

export default chatMsg