<template>
    <div class="friendList">
        <div class="cronyCard" v-for="item in friendListStore.groupList" :key="item.groupName">
            <el-collapse>
                <el-collapse-item :title="`${item.groupName} ${item.onlineNumber}/${item.peopleNumber}`">
                    <CronyCard :friends="item.users" :groupName="item.groupName" @click="emit('chooseFriendInfo')">
                    </CronyCard>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script setup>
import CronyCard from '@/components/friend/CronyCard.vue';
import { friendListInfoStore } from '@/store/friendList';
import { defineEmits } from 'vue';
const friendListStore = friendListInfoStore()
const emit = defineEmits(['chooseFriendInfo'])
</script>

<style lang="less">
.cronyCard {
    .el-collapse {
        border: none;

        .el-collapse-item__header {
            background-color: #323644;
            color: #fff;
            border: none;
            padding: 0 20px;
            font-size: 14px;
            font-family: serif;

            &:hover {
                background-color: #1e2128;
            }
        }

        .el-collapse-item__content {
            padding: 0;
            background-color: #292c35;
        }

        .el-collapse-item__wrap {
            border: none;
        }
    }

}
</style>