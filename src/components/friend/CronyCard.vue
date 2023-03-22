<template>
    <div class="cronyCard">
        <div class="crony" v-for="friend in friends" :key="friend._id"
            @click="_friendInfoStore.chooseFriendInfo(friend, groupName)"
            :class="{ actived: friend.username === _friendInfoStore.friendInfo.username }">
            <img :src="friend.headImg" alt="avatar">
            <span>{{ friend.nickname }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { friendInfoStore } from '@/store/friendInfo';
const props = defineProps({ friends: Array, groupName: String })
const _friendInfoStore = friendInfoStore()
</script>

<style lang="less" scoped>
.cronyCard {

    .crony {
        display: flex;
        align-items: center;
        padding: 14px;
        cursor: pointer;

        img {
            width: 30px;
            margin-right: 10px;
        }

        span {
            color: #fff;
        }

        &:hover {
            background-color: #1e2128;
        }
    }

    .actived {
        background-color: #1e2128;
    }
}
</style>