import request from "@/utils/request";

const occupation = {
    async getOccupation() {
        const { data: res } = await request.get('occupation/job')
        return res
    }
}

export default occupation