<template>
    <div class="groupList">
        <div class="group-item" v-for="(groupChatInfo, index) in groupChatStore.groupChatList" :key="groupChatInfo._id"
            @click="chooseGroupInfo(groupChatInfo.gid, index)"
            :class="{ isChoose: groupChatStore.groupChatInfos.groupName === groupChatInfo.groupName }">
            <div class="avatar" ref="avatar">
                <span>群</span>
            </div>
            <div class="group-name">{{ groupChatInfo.groupName }}</div>
        </div>
    </div>
</template>

<script setup>
import { generateRandomColors } from '@/tools/index';
import { groupChatInfoStore } from '@/store/groupChat';
import { ref, onMounted } from 'vue';
const groupChatStore = groupChatInfoStore(), avatar = ref(null)
const chooseGroupInfo = async (gid, index) => {
    sessionStorage.setItem('background-color', avatar.value[index].style.backgroundColor)
    await groupChatStore.getChooseGroupInfo(gid)
}
onMounted(() => {
    avatar.value.forEach(element => {
        generateRandomColors(element)
    })
})
</script>

<style lang="less" scoped>
.groupList {

    .isChoose {
        background-color: #1e2128 !important;
    }

    .group-item {
        display: flex;
        min-height: 40px;
        background-color: #292c35;
        align-items: center;
        padding: 10px;
        cursor: pointer;

        &:hover {
            background-color: #121315;
        }

        .avatar {
            background-color: #3f90f6;
            border-radius: 10px;
            height: 40px;
            width: 40px;
            font-weight: 700;
            line-height: 40px;
            text-align: center;
        }

        .group-name {
            margin-left: 20px;
            font-size: 14px;
        }
    }
}
</style>