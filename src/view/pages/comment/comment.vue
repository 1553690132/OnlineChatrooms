<template>
    <div class="chatHome">
        <div class="chatLeft">
            <div class="title">
                <h1>HM-7 聊天室</h1>
            </div>
            <div class="chatting">
                <div class="chat-t">
                    <span class="chat-title">聊天列表</span>
                    <el-switch v-model="chatWay" active-text="好友聊天" inactive-text="群聊"
                        style="--el-switch-on-color:#3f90f6; --el-switch-off-color: #13ce66" size="large"
                        @change="windowStore.clearStatus" />
                </div>
                <div class="chat-list">
                    <div class="friend-list" v-if="chatWay" v-for="chatFriendInfo in userStore.chatFriendList"
                        :key="chatFriendInfo._id" @click="windowStore.chooseChat(chatFriendInfo)">
                        <FriendCard :chatFriendInfo="chatFriendInfo" :isread="chatFriendInfo.isread"></FriendCard>
                    </div>
                    <div class="blank-part" v-if="!userStore.chatFriendList.length && chatWay">
                        <img src="@/assets/img/blank.png" alt="blank">
                        <h3>暂无消息</h3>
                    </div>
                    <div class="group-list" v-if="!chatWay" v-for="groupChatInfo in groupChatStore.chatGroupChatList"
                        :key="groupChatInfo._id" @click="windowStore.chooseChat(groupChatInfo)">
                        <GroupCard :groupChatInfo="groupChatInfo"></GroupCard>
                    </div>
                    <div class="blank-part" v-if="!groupChatStore.chatGroupChatList.length && !chatWay">
                        <img src="@/assets/img/blank.png" alt="blank">
                        <h3>暂无消息</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="chatRight">
            <div v-if="windowStore.showChatWindow">
                <chatWindow :chatWay="chatWay"></chatWindow>
            </div>
            <div class="showIcon" v-else>
                <img src="@/assets/img/index.png">
                <div class="text-part">
                    <h3>打开世界的另一扇窗</h3>
                    <span>主动一点，世界会更大。</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import FriendCard from '@/components/friend/FriendCard.vue'
import chatWindow from './chatWindow.vue'
import GroupCard from '@/components/group/GroupCard.vue'
import { userInfoStore } from '@/store/userStore';
import { chatWindowStore } from '@/store/chatWindowStore';
import { groupChatInfoStore } from '@/store/groupChat';
import socket from '@/tools/socket';
const userStore = userInfoStore()
const windowStore = chatWindowStore()
const groupChatStore = groupChatInfoStore()
const chatWay = ref(true)
const timer = setInterval(() => {
    setTimeout(userStore.getUserInfo, 0)
}, 5000)
// 异步绑定uid值作为后端判断依据
onMounted(async () => {
    if (sessionStorage.getItem('chatWay')) {
        chatWay.value = JSON.parse(sessionStorage.getItem('chatWay'))
        sessionStorage.removeItem('chatWay')
    }
    await userStore.getUserInfo()
    await groupChatStore.getGroupChatList()
    socket.on('connect', async () => {
        const _id = await userStore.getUserInfo()
        socket.emit('logins', _id)
    })
    timer
})

onUnmounted(() => {
    windowStore.clearStatus()
    clearInterval(timer)
})



</script>
<style lang="less" scoped>
.chatHome {
    display: flex;

    .chatLeft {
        width: 300px;
        min-width: 300px;

        .title {
            color: #fff;
            padding-left: 10px;
        }

        .chatting {
            margin-top: 70px;

            .chat-t {
                display: flex;
                align-items: center;
                justify-content: space-between;

                :deep(.el-switch__label) {
                    color: #282a37;
                    font-weight: 600;
                }

                :deep(.is-active) {
                    color: #3f90f6 !important;
                }
            }

            .chat-title {
                padding-left: 10px;
                font-size: 18px;
                color: rgb(209, 211, 222);
                font-family: SimHei;
            }



            .chat-list {
                box-sizing: border-box;
                padding-left: 10px;
                height: 60vh;
                margin-top: 20px;
                overflow: hidden;
                overflow-y: scroll;

                .blank-part {
                    display: flex;
                    width: 100%;
                    flex-direction: column;

                    img {
                        width: 100%;
                    }

                    h3 {
                        margin-top: 20px;
                        text-align: center;
                        color: #ccc;
                    }
                }



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
        min-width: 500px;

        .showIcon {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            flex-direction: column;
            justify-content: space-evenly;

            img {
                width: 340px;
                height: 340px;
                color: rgb(117, 120, 137);

            }

            h3 {
                color: #fff;

            }

            span {
                color: #ddd;
                font-size: 14px;
                font-family: 'Courier New', Courier, monospace;
            }

        }
    }

}

@media screen and(max-width: 984px) {
    .chatRight {
        min-width: 500px !important;
    }
}
</style>