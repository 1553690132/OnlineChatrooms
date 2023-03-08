<template>
    <div class="friendCard" :class="{ activeCard: props.chatFriendInfo._id == windowStore.preCurrent }">
        <div class="info">
            <Personal :imgUrl="props.chatFriendInfo.headImg" :online="props.chatFriendInfo.online"></Personal>
            <div class="info-msg">
                <div class="name">{{ props.chatFriendInfo.nickname }}</div>
                <div class="detail">{{ props.chatFriendInfo.detail }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import {chatWindowStore } from '@/store/chatWindowStore'
import Personal from '@/components/Personal.vue'
const windowStore = chatWindowStore()
const props = defineProps({
    chatFriendInfo: Object,
})
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

    .info {
        display: flex;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 90%;
        transform: translate(-50%, -50%);
        overflow: hidden;

        .info-msg {
            margin: 5px 0 0 20px;

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
}
</style>