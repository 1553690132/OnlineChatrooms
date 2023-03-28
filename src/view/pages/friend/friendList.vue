<template>
    <div class="friendList" ref="friendList">
        <div class="cronyCard" ref="cronyCard" v-for="item in friendListStore.groupList" :key="item.groupName">
            <el-collapse>
                <el-collapse-item :title="`${item.groupName} ${item.onlineNumber}/${item.peopleNumber}`">
                    <CronyCard :friends="item.users" :groupName="item.groupName" @click="emit('chooseFriendInfo')">
                    </CronyCard>
                </el-collapse-item>
            </el-collapse>
        </div>
        <ul class="menu" ref="menu">
            <li @click="createGroup">新建分组</li>
        </ul>
    </div>
    <el-dialog v-model="dialogVisible" class="insertGroupCard" title="新增分组" width="40%" center>
        <el-input v-model="divideGroupName" placeholder="输入分组名称" clearable :prefix-icon="HelpFilled"></el-input>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="insertdivideGroup">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import CronyCard from '@/components/friend/CronyCard.vue';
import { HelpFilled } from '@element-plus/icons-vue';
import { friendListInfoStore } from '@/store/friendList';
import { ref, onMounted } from 'vue';
import { clickMenu } from '@/tools/menu';
import $axios from '@/api';
import { ElMessage } from 'element-plus';
const friendListStore = friendListInfoStore()
const emit = defineEmits(['chooseFriendInfo'])
const menu = ref(null), friendList = ref(null), dialogVisible = ref(false), divideGroupName = ref('')
onMounted(() => {
    clickMenu(friendList.value, menu.value)
})
const createGroup = () => {
    dialogVisible.value = true
}
const insertdivideGroup = async () => {
    if (!divideGroupName.value) return ElMessage.info('请输入分组名!')
    const { data: res } = await $axios.post('friendGroup/insertFriendGroup', { divideGroupName: divideGroupName.value })
    if (res.status !== 200) return ElMessage.error(res.message)
    await friendListStore.getGroupList()
    dialogVisible.value = false
    divideGroupName.value = ''
}
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

.menu {
    display: none;
    position: absolute;
    width: 150px;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 1px 1px 5px 1px #3f90f6;
    background-color: #282a37;
    z-index: 10;
    overflow: visible !important;

    li {
        list-style: none;
        font-size: 14px;
        font-family: system-ui;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        padding: 8px;

        &:hover {
            background-color: #393d4b;
        }
    }
}
</style>