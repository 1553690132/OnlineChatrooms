import $axios from '@/api'
import { ElMessage } from 'element-plus'
import { reactive, onMounted } from 'vue'

export default function () {
    let chatFriendList = reactive([])
    // 异步处理为同步获取数据
    onMounted(async () => {
        let res = await $axios.get('/owner/info')
        if (res.status !== 200) ElMessage({ type: 'error', message: res.message })
        console.log(res);
        chatFriendList.push(...res.data.friendList)
    })

    return chatFriendList
}