<template>
    <div class="findFriend">
        <img :src="item.headImg" alt="avatar" class="avatar">
        <div class="right-part">
            <span class="nickname">{{ item.nickname }} ({{ item.username }})</span>
            <span class="sex"><el-icon :class="{ female: sex }">
                    <Avatar />
                </el-icon> {{ item.location }}</span>
            <button class="addBtn">加好友</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps({ item: Object })
const sex = computed(() => { return props.item.sex === '女' ? true : false })
</script>

<style lang="less" scoped>
.findFriend {
    width: 33%;
    height: auto;
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    align-items: center;

    img {
        width: 60px;
        height: 60px;
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
            height: 20px;
            border-radius: 4px;
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