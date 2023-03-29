import request from "@/utils/request";

const notice = {
    async getNoticeList(params) {
        const { data: res } = await request.get('notice/gain', { params })
        return res
    },

    async deleteNotice(params) {
        const { data: res } = await request.delete('notice/delete', { params })
        return res
    }
}

export default notice