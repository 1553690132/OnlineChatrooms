<template>
    <div class="createCard">
        <el-dialog v-model="dialogVisible" title="创建群聊" draggable @close="closeCreateCard">
            <div class="dialog-body">
                <div class="left-part">
                    <el-input v-model="searchContext" :prefix-icon="Search" placeholder="搜索" clearable></el-input>
                    <el-collapse>
                        <div class="collapse" v-for="items in friendListStore.groupList" :key="items.groupName">
                            <el-collapse-item :title="items.groupName">
                                <div class="friend-part" v-for="item in items.users" :key="item._id">
                                    <GroupCreateFriend :item="item" @addGroupMember="addGroupMember"></GroupCreateFriend>
                                </div>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                </div>
                <div class="right-part">
                    <span class="title">已选联系人：{{ member_length }}</span>
                    <div class="group-member">
                        <GroupCreateFriend :item="users_msg" :isChecked="true"></GroupCreateFriend>
                        <div id="other-member" v-for="item in member_msg">
                            <GroupCreateFriend :item="item" :isChecked="true"></GroupCreateFriend>
                        </div>
                    </div>
                    <el-input v-model="groupName" placeholder="请填写群名称" class="name-input"></el-input>
                </div>
            </div>

            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submitGroup" :disabled="isDisabled" ref="submit_btn">确认</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import GroupCreateFriend from './GroupCreateFriend.vue';
import { Search } from '@element-plus/icons-vue';
import { ref, computed } from 'vue'
import { userInfoStore } from '@/store/userStore';
import { friendListInfoStore } from '@/store/friendList';
import $axios from '@/api';
import { async } from 'q';
import { ElMessage } from 'element-plus';
const userStore = userInfoStore()
const friendListStore = friendListInfoStore()
const emit = defineEmits(['showCreateGroup'])
const dialogVisible = ref(true), searchContext = ref(''), member_msg = ref([]), groupName = ref(''), isDisabled = ref(true)
const users_msg = computed(() => {
    return { username: userStore.username, nickname: userStore.nickname, headImg: userStore.userImg }
})
const member_length = computed(() => { return 1 + member_msg.value.length })
const closeCreateCard = () => {
    dialogVisible.value = false
    emit('showCreateGroup')
}
const addGroupMember = (item, checked) => {
    if (checked) member_msg.value.push(item)
    else member_msg.value.splice(member_msg.value.indexOf(item), 1)
    if (member_msg.value.length) isDisabled.value = false
    else isDisabled.value = true
}
const submitGroup = async () => {
    if (groupName.value) {
        dialogVisible.value = false
        const res = await $axios.post('groupChat/create', { groupName: groupName.value, members: JSON.stringify(member_msg.value) })
        console.log(res);
    }
    else return ElMessage.error('群名不能为空!')
}
</script>

<style lang="less" scoped>
.createCard {
    .dialog-body {
        display: flex;
        height: 380px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;

        .left-part {
            flex: 1;
            box-sizing: border-box;
            padding: 10px 14px;
            border-right: 1px solid #ccc;
            overflow: hidden;
            overflow-y: scroll;


            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                display: none;
            }

            .friend-part {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: auto;
                padding: 10px;
                box-sizing: border-box;

                &:hover {
                    background-color: #ccc;
                }

            }
        }

        .right-part {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 10px 14px;

            .title {
                color: #999;
            }

            .group-member {
                flex: 1;
                padding: 10px;

                #other-member {
                    margin: 10px 0;
                }
            }



        }
    }

    :deep(.el-dialog__header) {
        padding: 20px;
        border-bottom: 1px solid #ccc;
        margin-right: 0;
    }

    :deep(.el-dialog__body) {
        padding: 0px;
    }

    :deep(.el-dialog__footer) {
        padding: 10px;
    }
}
</style>