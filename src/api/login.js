import request from "../utils/request";

const login = {
    async loginProcess(data) {
        const { data: res } = await request.post('api/login', data)
        return res
    },

    async registerProcess(data) {
        const { data: res } = await request.post('api/reg', data)
        return res
    },

    async gainCode(params) {
        const { data: res } = await request.get('code/gain', { params })
        return res
    },

    async loginByCode(data) {
        const { data: res } = await request.post('api/loginCode', data)
        return res
    },

    async resetPassword(data) {
        const { data: res } = await request.put('api/reset', data)
        return res
    }
}

export default login