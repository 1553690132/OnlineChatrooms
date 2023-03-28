<template>
    <div class="groupInfoCard">
        <div class="top-area">
            <div class="avatar" ref="avatar">
                <span>群</span>
            </div>
            <div class="right-part">
                <div class="group-name">{{ groupChatStore.groupChatInfos.groupName }}</div>
                <div class="group-number">{{ groupChatStore.groupChatInfos.gid.substring(0, 8) }}</div>
            </div>
        </div>
        <div class="body-area">
            <div class="members">
                <span class="group-member">群成员</span>
                <span>({{ groupChatStore.groupChatInfos.groupMembers.length }}/200)</span>
                <el-scrollbar>
                    <div class="member-img">
                        <span class="img-item" v-for="item in groupChatStore.groupMemberAvatar">
                            <img :src="item" alt="avatar">
                        </span>
                    </div>
                </el-scrollbar>
            </div>
            <div class="star-value">
                <p>本群星级</p>
                <div class="stars">
                    <el-rate v-model="starValue" disabled show-score text-color="#ff9900" />
                    <span>该群一切正常</span>
                </div>
            </div>
        </div>
        <div class="footer-area">
            <button class="sendMessage" @click="sendGroupShow">发消息</button>
            <button class="deleteGroup" @click="deleteGroup">退出群聊</button>
        </div>
    </div>
</template>

<script setup>
import $axios from '@/api';
import router from '@/router';
import { navInfoStore } from '@/store/navStore';
import { groupChatInfoStore } from '@/store/groupChat';
import { chatWindowStore } from '@/store/chatWindowStore';
import { userInfoStore } from '@/store/userStore';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, onMounted, watch } from 'vue';
const groupChatStore = groupChatInfoStore()
const windowStore = chatWindowStore()
const navStore = navInfoStore()
const userStore = userInfoStore()
const avatar = ref(null), starValue = ref(5)
const setBackgroundColor = () => {
    avatar.value.style.backgroundColor = sessionStorage.getItem('background-color')
}
const sendGroupShow = () => {
    $axios.post('/groupChat/show', { gid: groupChatStore.groupChatInfos.gid }).then(async res => {
        if (res.status !== 200) return ElMessage.error('发生了一些错误')
        router.push('/home/comment')
        sessionStorage.setItem('chatWay', false)
        await windowStore.chooseChat(groupChatStore.groupChatInfos)
        navStore.changeMenu(0)
    })
}
const deleteGroup = () => {
    ElMessageBox.confirm(
        `您确定要退出群聊 ${groupChatStore.groupChatInfos.groupName} 吗?`,
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            dangerouslyUseHTMLString: true
        }).then(async () => {
            const { data: res } = await $axios.delete('/groupChat/delete', { params: { uid: userStore._id, gid: groupChatStore.groupChatInfos.gid, groupName: groupChatStore.groupChatInfos.groupName } })
            if (res.status !== 200) return ElMessage.error('退出失败!')
            ElMessage.success('退出成功!')
            await groupChatStore.getGroupChatList()
            groupChatStore.clearStatus()
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消退出',
            })
        })
}
watch(() => groupChatStore.groupChatInfos, () => {
    setBackgroundColor()
})
onMounted(() => {
    setBackgroundColor()
})
</script>

<style lang="less" scoped>
@normal-color: #282a37;

.groupInfoCard {
    display: flex;
    flex-direction: column;
    width: 520px;
    height: 480px;
    background-color: @normal-color;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 0 0 10px 0 @normal-color;

    .top-area {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .avatar {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            background-color: skyblue;
            text-align: center;
            line-height: 60px;

            span {
                color: #fff;
                font-weight: 700;
                font-size: 20px;
            }
        }

        .right-part {
            margin-left: 30px;

            .group-name {
                font-size: 18px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 10px;
            }

            .group-number {
                font-size: 14px;
                color: #aaa;
            }
        }
    }

    .body-area {
        display: flex;
        flex-direction: column;
        height: 380px;

        .members {
            flex: 2;
            color: #fff;
            font-family: serif;
            overflow: hidden;

            .group-member {
                font-weight: 700;
                margin-right: 10px;
            }

            .member-img {
                margin-top: 10px;
                width: 100%;
                padding: 10px;

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    margin-right: 10px;
                }
            }
        }

        .star-value {
            flex: 1;
            margin-top: 20px;

            p {
                color: #fff;
            }

            .stars {
                display: flex;
                align-items: center;

                span {
                    color: #ccc;
                    font-size: 14px;
                }
            }
        }
    }

    .footer-area {
        display: flex;
        width: 100%;
        justify-content: center;

        .sendMessage {
            color: #fff;
            width: 40%;
            height: 40px;
            border: none;
            font-size: 14px;
            background-color: #1e6fff;
            cursor: pointer;
            margin-right: 20px;

            &:hover {
                background-color: #2f7cff;
            }
        }

        .deleteGroup {
            color: #000;
            width: 40%;
            height: 40px;
            border: none;
            font-size: 14px;
            background-color: #e9e9eb;
            cursor: pointer;

            &:hover {
                background-color: #fdfdfd;
            }
        }
    }
}
</style>