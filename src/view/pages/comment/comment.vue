<template>
    <div class="chatHome">
        <div class="chatLeft">
            <div class="title">
                <h1>摸鱼聊天室</h1>
            </div>
            <div class="chatting">
                <span class="chat-title">聊天列表</span>
                <div class="chat-list">
                    <div class="friend-list" v-for="chatFriendInfo in userStore.friendList" :key="chatFriendInfo._id"
                        @click="windowStore.chooseChat(chatFriendInfo)">
                        <FriendCard :chatFriendInfo="chatFriendInfo"></FriendCard>
                    </div>
                </div>
            </div>
        </div>
        <div class="chatRight">
            <div v-if="windowStore.showChatWindow">
                <chatWindow></chatWindow>
            </div>
            <div class="showIcon" v-else>
                <img src="@/assets/img/index.png">
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import FriendCard from '@/components/FriendCard.vue'
import chatWindow from './chatWindow.vue'
import { userInfoStore } from '@/store/userStore';
import { chatWindowStore } from '@/store/chatWindowStore';
import socket from '@/tools/socket';
const userStore = userInfoStore()
const windowStore = chatWindowStore()
const sendBreakage = async () => {
    const blob = new Blob([JSON.stringify({ username: userStore.username })], {
        type: 'application/x-www-form-urlencoded; charset=UTF-8'
    })
    navigator.sendBeacon('http://localhost:3007/api/breakage', blob)
}
const timer = setInterval(() => {
    userStore.getUserInfo()
}, 5000)

// 异步绑定uid值作为后端判断依据
onMounted(() => {
    userStore.getUserInfo()
    socket.on('connect', async () => {
        userStore.getUserInfo()
        const _id = await userStore.getUserInfo()
        socket.emit('logins', _id)
    })
    timer
    window.addEventListener('unload', sendBreakage)
})

onUnmounted(() => {
    window.removeEventListener('unload', sendBreakage)
    clearInterval(timer)
})



</script>
<style lang="less" scoped>
.chatHome {
    display: flex;

    .chatLeft {
        min-width: 280px;

        .title {
            color: #fff;
            padding-left: 10px;
        }

        .chatting {
            margin-top: 90px;

            .chat-title {
                padding-left: 10px;
                font-size: 18px;
                color: rgb(209, 211, 222);
                font-family: SimHei;
            }

            .chat-list {
                box-sizing: border-box;
                padding-left: 10px;
                height: 65vh;
                margin-top: 20px;
                overflow: hidden;
                overflow-y: scroll;

                &::-webkit-scrollbar {
                    // 隐藏滚动条
                    width: 0;
                    height: 0;
                    display: none;
                }
            }
        }
    }

    .chatRight {
        flex: 1;
        padding-right: 30px;

        .showIcon {
            position: relative;
            width: 100%;
            height: 100%;

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 340px;
                height: 340px;
                color: rgb(117, 120, 137);
            }

        }
    }

}

@media screen and(max-width: 984px) {
    .chatRight {
        min-width: 465px !important;
    }
}
</style>