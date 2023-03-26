<template>
    <div class="friendCard" ref="friendCard" :class="{ activeCard: chatFriendInfo._id == windowStore.preCurrent }">
        <el-badge :value="chatFriendInfo.unreadNum" :max="99" class="item" v-if="!chatFriendInfo.isread">
        </el-badge>
        <div class="info">
            <Personal :imgUrl="chatFriendInfo.headImg" :online="chatFriendInfo.online" :showOnline="true"></Personal>
            <div class="info-msg">
                <div class="name">{{ chatFriendInfo.nickname }}</div>
                <div class="detail">{{ chatFriendInfo.lastMsg }}</div>
            </div>
            <div class="info-time">
                <span class="time">{{ times }}</span>
            </div>
        </div>
        <ul class="menu" ref="menu">
            <li @click="deleteChat">删除聊天</li>
            <li @click="hideChat">不显示该聊天</li>
        </ul>
    </div>
</template>
<script setup>
import moment from 'moment'
import { ref, onMounted, computed } from 'vue';
import { chatWindowStore } from '@/store/chatWindowStore';
import { clickMenu } from '@/tools/menu'
import { userInfoStore } from '@/store/userStore';
import Personal from '@/components/personal/Personal.vue';
import $axios from '@/api';
import router from '@/router';
const userStore = userInfoStore()
const windowStore = chatWindowStore()
const props = defineProps({
    chatFriendInfo: Object,
})
const times = computed(() => { return moment(props.chatFriendInfo.lastTime).fromNow() })
const friendCard = ref(null), menu = ref(null)
onMounted(() => {
    clickMenu(friendCard.value, menu.value)
})
const deleteChat = async () => {
    const { data: res } = await $axios.delete('/chat/delete', { params: { sid: userStore._id, rid: props.chatFriendInfo._id } })
    if (res.status === 200) {
        windowStore.clearStatus()
        router.go(0)
    }
}
const hideChat = async () => {
    const { data: res } = await $axios.put('/chat/hide', { uid: userStore._id, fid: props.chatFriendInfo._id })
    if (res.status === 200) {
        windowStore.clearStatus()
        router.go(0)
    }
}
</script>
<style lang="less" scoped>
@normal-color: #1d90f5;
@shadow-color: rgb(0, 136, 255);

.friendCard {
    position: relative;
    min-width: 250px;
    min-height: 80px;
    border-radius: 10px;
    background-color: rgb(50, 54, 68);
    margin: 25px 0;
    cursor: pointer;
    transition: .3s;

    .item {
        position: absolute;
        right: 0;
    }

    :deep(.el-badge__content) {
        border: none;
    }

    .info {
        display: flex;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 90%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        align-items: center;

        .info-msg {
            flex: 1;
            margin-left: 18px;

            .name {
                color: #fff;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 5px;
                font-family: serif;
            }

            .detail {
                color: #5c6675;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 12px;
            }
        }

        .info-time {
            .time {
                font-size: 12px;
                color: #5c6675;
                white-space: nowrap;
            }
        }
    }

    &:hover {
        background-color: @normal-color !important;
        transition: .3s;
        box-shadow: 0 0 10px 0 @shadow-color;

        .info {
            .info-msg {
                .detail {
                    color: #fff !important;
                }
            }
        }
    }

    .menu {
        display: none;
        position: absolute;
        width: 150px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 5px;
        border-radius: 4px;
        box-shadow: 1px 1px 5px 1px #ccc;
        background-color: #fff;
        z-index: 10;
        overflow: visible !important;
    }

    .menu li {
        list-style: none;
        font-size: 14px;
        font-family: system-ui;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        padding: 8px;
    }

    .menu li:hover {
        background-color: #dfdfdf;
    }
}

.activeCard {
    background-color: @normal-color !important;
    transition: .5s;
    box-shadow: 3px 2px 10px 0 @shadow-color;

    .info {
        .info-msg {
            .detail {
                color: #fff !important;
            }
        }
    }

    .info-time {
        .time {
            color: #fff !important;
        }
    }
}

.unread {
    &::after {
        content: "";
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: #FF0033;
        position: absolute;
        top: 6px;
        right: 6px;
        z-index: 100;
        border: none;
    }
}
</style>