import request from "@/utils/request";

const userInfo = {
    async getUserInfos() {
        const { data: res } = await request.get('owner/info')
        return res
    }
}

export default userInfo