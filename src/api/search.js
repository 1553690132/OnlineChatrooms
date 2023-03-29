import request from "@/utils/request";

const search = {
    async searchPeople(params) {
        const { data: res } = await request.get('search/people', { params })
        return res
    },
    async searchGroup(params) {
        const { data: res } = await request.get('search/group', { params })
        return res
    }
}

export default search