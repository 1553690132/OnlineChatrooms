<template>
    <div class="chatHome">
        <div class="chatLeft">
            <div class="title">
                <h1>摸鱼聊天室</h1>
            </div>
            <div class="chatting">
                <span class="chat-title">聊天列表</span>
                <div class="chat-list">
                    <div class="friend-list" v-for="chatFriendInfo in chatList" :key="chatFriendInfo.id"
                        @click="chooseChat(chatFriendInfo)">
                        <FriendCard :chatFriendInfo="chatFriendInfo" :preCurrent="preCurrent"></FriendCard>
                    </div>
                </div>
            </div>
        </div>
        <div class="chatRight">
            <div class="showIcon">
                <img src="@/assets/img/index.png">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import FriendCard from '@/components/FriendCard.vue';
import chatFriendList from '@/hooks/chatFriendList'
let chatList = chatFriendList()
let preCurrent = ref('')
const chooseChat = function (info) {
    this.preCurrent = info.id
}

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
        display: flex;
        justify-content: center;
        align-items: center;

        .showIcon {
            img {
                width: 340px;
                height: 340px;
                color: rgb(117, 120, 137);
            }

        }
    }

}
</style>