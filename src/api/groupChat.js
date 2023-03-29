import request from "@/utils/request";

const groupChat = {
    async gainGroupChat() {
        const { data: res } = await request.get('groupChat/gain')
        return res
    },

    async sendGroupMsg(data) {
        const { data: res } = await request.post('groupChat/send', data)
        return res
    },

    async createGroupChat(data) {
        const { data: res } = await request.post('groupChat/create', data)
        return res
    },

    async joinGroup(data) {
        const { data: res } = await request.post('groupChat/join', data)
        return res
    },

    async findGroupById(params) {
        const { data: res } = await request.get('groupChat/find', { params })
        return res
    },

    async showGroupChat(data) {
        const { data: res } = await request.post('groupChat/show', data)
        return res
    },

    async inviteMember(data) {
        const { data: res } = await request.post('groupChat/invite', data)
        return res
    },

    async hideGroupMessage(data) {
        const { data: res } = await request.put('groupChat/hide', data)
        return res
    },

    async deleteGroupChat(params) {
        const { data: res } = await request.delete('groupChat/delete', { params })
        return res
    },
}

export default groupChat