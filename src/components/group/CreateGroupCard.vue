<template>
    <div class="createCard">
        <el-dialog v-model="dialogVisible" :title="titles" draggable @close="closeCreateCard">
            <div class="dialog-body">
                <div class="left-part">
                    <el-input v-model.lazy="searchContext" :prefix-icon="Search" placeholder="搜索" clearable
                        @change="searchForFriend" @clear="closeSearchCard"></el-input>
                    <el-collapse v-if="!searchResultShow">
                        <div class="collapse" v-for="items in friendListStore.groupList" :key="items.groupName">
                            <el-collapse-item :title="items.groupName">
                                <div class="friend-part" v-for="item in items.users" :key="item._id">
                                    <GroupCreateFriend :item="item" @addGroupMember="addGroupMember"
                                        :member_msg="member_msg" :invite="invite">
                                    </GroupCreateFriend>
                                </div>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                    <div class="friend-part" v-else v-for="item in searchResults" :key="item._id">
                        <GroupCreateFriend :item="item" @addGroupMember="addGroupMember" :member_msg="member_msg">
                        </GroupCreateFriend>
                    </div>
                </div>
                <div class="right-part" v-if="!invite">
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
import router from '@/router';
import GroupCreateFriend from './GroupCreateFriend.vue';
import { Search } from '@element-plus/icons-vue';
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { userInfoStore } from '@/store/userStore';
import { friendListInfoStore } from '@/store/friendList';
import { chatWindowStore } from '@/store/chatWindowStore';
import { ElMessage } from 'element-plus';
const props = defineProps({ invite: Boolean })
const { proxy } = getCurrentInstance()
const userStore = userInfoStore()
const windowStore = chatWindowStore()
const friendListStore = friendListInfoStore()
const emit = defineEmits(['showCreateGroup', 'invitePeople'])
const dialogVisible = ref(true), searchContext = ref(''), member_msg = ref([]), groupName = ref(''), isDisabled = ref(true), searchResults = ref([]), searchResultShow = ref(false)
const titles = computed(() => {
    return props.invite ? '邀请进群' : '创建群聊'
})
const users_msg = computed(() => {
    return { username: userStore.username, nickname: userStore.nickname, headImg: userStore.userImg }
})
const member_length = computed(() => { return 1 + member_msg.value.length })
const closeCreateCard = () => {
    dialogVisible.value = false
    emit('showCreateGroup')
    emit('invitePeople')
}
const addGroupMember = (item, checked) => {
    if (checked && member_msg.value.indexOf(item) === -1) member_msg.value.push(item)
    else if (!checked) member_msg.value.splice(member_msg.value.indexOf(item), 1)
    if (member_msg.value.length) isDisabled.value = false
    else isDisabled.value = true
}
const submitGroup = async () => {
    if (props.invite) {
        const res = await proxy.$api.groupChat.inviteMember({ gid: windowStore.chatWindowInfo.gid, members: JSON.stringify(member_msg.value), groupName: windowStore.chatWindowInfo.groupName })
        dialogVisible.value = false
        if (res.status !== 200) return ElMessage.error('邀请失败!')
        router.go(0)
        sessionStorage.setItem('chatWay', false)
        ElMessage.success('邀请成功!')
    }
    else {
        if (groupName.value) {
            const res = await proxy.$api.groupChat.createGroupChat({ groupName: groupName.value, members: JSON.stringify(member_msg.value) })
            dialogVisible.value = false
            if (res.status !== 200) return ElMessage.error('创建失败!')
            router.go(0)
            ElMessage.success('创建成功!')
        }
        else return ElMessage.error('群名不能为空!')
    }
}
const searchForFriend = () => {
    if (searchContext.value) {
        searchResultShow.value = true
        searchResults.value = friendListStore.searchFriend(searchContext.value)
    }
}
const closeSearchCard = () => {
    searchResultShow.value = false
}
onMounted(async () => {
    await friendListStore.getGroupList()
})
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