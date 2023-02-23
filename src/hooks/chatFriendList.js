import { reactive, onMounted } from 'vue'
import { getChatFriend } from '@/api/getData'

export default function () {
    let chatFriendList = reactive([])
    // 异步处理为同步获取数据
    onMounted(async () => {
        let res = await getChatFriend()
        chatFriendList.push(...res)
    })

    return chatFriendList;
}