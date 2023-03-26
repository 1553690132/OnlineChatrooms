<template>
    <div class="findGroup" :class="{ search: search }">
        <div class="avatar">群</div>
        <div class="right-part">
            <span class="group-name">{{ item.groupName }}</span>
            <span class="group-nums">
                <el-icon>
                    <UserFilled />
                </el-icon>
                {{ item.groupMembers.length }}
            </span>
            <button class="add-btn" @click="joinGroup" v-if="!search">加入群</button>
            <button class="add-btn" v-else>去聊天</button>
        </div>
    </div>
</template>

<script setup>
import $axios from '@/api';
import { UserFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
const props = defineProps({ item: Object, search: Boolean })
const emit = defineEmits(['closeSearchCard'])
const joinGroup = async () => {
    const { data: res } = await $axios.post('groupChat/join', { gid: props.item.gid })
    if (res.status !== 200) return ElMessage.error(res.message)
    emit('closeSearchCard')
    return ElMessage.success('添加成功!')
}

</script>

<style lang="less" scoped>
.search {
    width: 100% !important;
    background-color: #282a37 !important;
    box-shadow: 0 0 2px 0 #5aa4ff !important;

    .avatar {
        width: 44px !important;
        height: 44px !important;
        font-size: 16px !important;
        line-height: 44px !important;
        background-color: #3f90f6 !important;
    }

    .add-btn  {
        width: 50px !important;
    }

    .group-name {
        font-size: 16px !important;
    }
}

.findGroup {
    width: 30%;
    height: auto;
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 10px 0 #ccc;
    border-radius: 5px;
    min-height: 70px;

    .avatar {
        width: 50px;
        height: 50px;
        background-color: #282a37;
        border-radius: 8px;
        color: #fff;
        font-weight: 700;
        font-size: 24px;
        line-height: 50px;
        text-align: center;
    }

    .right-part {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-left: 20px;
        align-items: flex-start;

        .group-name {
            font-size: 20px;
        }

        .group-nums {
            color: #aaa;
        }

        .add-btn {
            cursor: pointer;
            background-color: #3f90f6;
            border: none;
            color: #fff;
            height: 24px;
            width: 70px;
            border-radius: 4px;

            &:hover {
                background-color: #5aa4ff;
            }
        }
    }
}
</style>