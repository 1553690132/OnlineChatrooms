<template>
    <div class="findFriend" :class="{ search: search }">
        <img :src="item.headImg" alt="avatar" class="avatar">
        <div class="right-part">
            <span class="nickname">{{ item.nickname }} ({{ item.username }})</span>
            <span class="sex"><el-icon :class="{ female: sex }">
                    <Avatar />
                </el-icon> {{ item.location }}</span>
            <button class="addBtn" @click="addFriend" v-if="!search">加好友</button>
            <button class="addBtn" @click="sendMessageToFriend" v-else>去聊天</button>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import $axios from '@/api';
import { userInfoStore } from '@/store/userStore';
import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import { friendInfoStore } from '@/store/friendInfo';
import { navInfoStore } from '@/store/navStore';
import { chatWindowStore } from '@/store/chatWindowStore';
const _friendInfoStore = friendInfoStore()
const navStore = navInfoStore()
const chatWindowInfoStore = chatWindowStore()
const props = defineProps({ item: Object, search: Boolean })
const emit = defineEmits(['closeSearchCard'])
const userStore = userInfoStore()
const sex = computed(() => { return props.item.sex === '女' ? true : false })
const addFriend = async () => {
    const { data: res } = await $axios.post('friend/increase', { _id: userStore._id, friendName: props.item.username })
    if (res.status !== 200) return ElMessage.error(res.message)
    emit('closeSearchCard')
    return ElMessage.success('添加成功!')
}
const sendMessageToFriend = () => {
    $axios.post('/friendGroup/sendMsgTo', { uid: userStore._id, friendName: _friendInfoStore.friendInfo.username }).then(async res => {
        if (res.status !== 200) return ElMessage.error('发生了一些错误!')
        router.push('/home/comment')
        await _friendInfoStore.chooseFriendInfo(props.item)
        await chatWindowInfoStore.chooseChat(_friendInfoStore.friendInfo)
        navStore.changeMenu(0)
    })
}
</script>

<style lang="less" scoped>
.search {
    width: 100% !important;
    font-size: 14px !important;

    img {
        width: 50px !important;
        height: 50px !important;
    }

    .addBtn {
        background-color: #3f90f6;
        color: #fff;
        width: 60px;
    }
}

.findFriend {
    width: 33%;
    height: auto;
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    align-items: center;

    img {
        width: 65px;
        height: 65px;
        border-radius: 6px;
        margin-right: 18px;
    }

    .right-part {
        display: flex;
        flex-direction: column;

        :deep(.nickname) {
            font-size: 14px;
            white-space: nowrap;
        }

        .sex {
            display: flex;
            align-items: center;
            font-size: 14px;


            :deep(.el-icon) {
                margin-right: 10px;
                color: #3f90f6;
            }
        }

        .addBtn {
            background-color: #3f90f6;
            color: #fff;
            border: none;
            max-width: 80px;
            height: 24px;
            border-radius: 4px;
            margin-top: 4px;
            cursor: pointer;

            &:hover {
                background-color: #5ba2fa;
            }
        }
    }

    .female {
        color: pink !important;
    }
}
</style>