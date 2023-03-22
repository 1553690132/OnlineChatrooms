<template>
    <div class="friendInfo">
        <el-card class="box-card" shadow="always">
            <div class="card-header">
                <div class="info-header">
                    <img class="headImg" :src="_friendInfoStore.friendInfo.headImg">
                    <div class="infos">
                        <div class="username">{{ _friendInfoStore.friendInfo.nickname }}</div>
                        <div class="occupation">{{ _friendInfoStore.friendInfo.occupation }}</div>
                        <div class="detail">{{ _friendInfoStore.friendInfo.detail }}</div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <ul>
                    <li><span class="msg-title">账 号</span><span class="msg-body">{{ _friendInfoStore.friendInfo.username
                    }}</span>
                    </li>
                    <li>
                        <span class="msg-title">昵 称</span><span class="msg-body">{{ _friendInfoStore.friendInfo.nickname
                        }}</span>
                    </li>
                    <li>
                        <span class="msg-title divide">分 组</span><span class="msg-body">
                            <el-select v-model="_friendInfoStore.groupName" size="small"
                                :placeholder="_friendInfoStore.groupName" @change="submitDivide">
                                <el-option v-for="item in friendGroupStore.groupList" :key="item.groupName"
                                    :value="item.groupName" :label="item.groupName"></el-option>
                            </el-select>
                        </span>
                    </li>
                    <li><span class="msg-title">个 人</span><span class="msg-body">{{ _friendInfoStore.friendInfo._age }} {{
                        _friendInfoStore.friendInfo.sex
                    }}</span></li>
                    <li><span class="msg-title">所在地</span><span class="msg-body">{{ _friendInfoStore.friendInfo.location
                    }}</span>
                    </li>
                    <li><span class="msg-title">电 话</span><span class="msg-body">{{ _friendInfoStore.friendInfo.telephone
                    }}</span>
                    </li>
                    <li><span class="msg-title">职 业</span><span class="msg-body">{{ _friendInfoStore.friendInfo.occupation
                    }}</span>
                    </li>
                    <li><span class="msg-title">公 司</span><span class="msg-body">{{ _friendInfoStore.friendInfo.corporation
                    }}</span>
                    </li>
                    <li><span class="msg-title">学 校</span><span class="msg-body">{{ _friendInfoStore.friendInfo.school
                    }}</span>
                    </li>
                </ul>
                <div class="configInfo">
                    <button @click="sendMessageToFriend">发送消息</button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import $axios from '@/api';
import router from '@/router';
import { friendInfoStore } from '@/store/friendInfo';
import { friendListInfoStore } from '@/store/friendList'
import { ElMessage } from 'element-plus';
import { navInfoStore } from '@/store/navStore';
import { chatWindowStore } from '@/store/chatWindowStore'
import { userInfoStore } from '@/store/userStore';
const userStore = userInfoStore()
const navStore = navInfoStore()
const _friendInfoStore = friendInfoStore()
const friendGroupStore = friendListInfoStore()
const chatWindowInfoStore = chatWindowStore()
const submitDivide = () => {
    $axios.post('/friendGroup/changeFriendGroup', { uid: userStore._id, groupName: _friendInfoStore.groupName, friendName: _friendInfoStore.friendInfo.username }).then(async res => {
        _friendInfoStore.clearStatus()
        await friendGroupStore.getGroupList()
        return ElMessage.success('更新分组成功!')
    }).catch(err => {
        return ElMessage.error(err)
    })
}

const sendMessageToFriend = () => {
    $axios.post('/friendGroup/sendMsgTo', { uid: userStore._id, friendName: _friendInfoStore.friendInfo.username }).then(res => {
        if (res.status !== 200) return ElMessage.error('发生了一些错误!')
        router.push('/home/comment')
        chatWindowInfoStore.chooseChat(_friendInfoStore.friendInfo)
        navStore.changeMenu(0)
    })
}

</script>

<style lang="less" scoped>
.friendInfo {
    width: 380px;
    height: 500px;
    z-index: 10;
    padding: 10px;
    box-sizing: border-box;

    .box-card {
        width: 100%;
        height: 100%;

        .card-header {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;

            .info-header {
                display: flex;

                .headImg {
                    width: 70px;
                    height: 70px;
                    border-radius: 10px;
                    margin-right: 20px;
                }

                .headImg-filter {
                    position: absolute;
                    left: 85px;
                    top: 85px;
                    background-color: rgba(0, 0, 0, .5);
                    border-radius: 50%;

                    &:hover {
                        background-color: rgba(0, 0, 0, .9);
                    }
                }

                .infos {

                    .username {
                        font-weight: 700;
                        margin: 5px 0;
                    }

                    .occupation {
                        font-size: 12px;
                        margin: 5px 0;
                    }

                    .detail {
                        color: #bbb;
                        font-size: 12px;
                    }
                }
            }

            .el-icon {
                cursor: pointer;
            }
        }

        .card-body {
            ul {
                padding: 0 10px;
                margin-bottom: 30px;

                li {
                    display: flex;
                    font-size: 13px;
                    list-style: none;
                    margin: 15px 0;

                    .msg-title {
                        flex: 1;
                        color: #8b8b8b;
                    }

                    .msg-body {
                        flex: 3;
                        color: #000;
                    }

                    .divide {
                        display: flex;
                        align-items: center;
                    }

                }
            }

            .configInfo {
                display: flex;
                width: 100%;
                justify-content: center;

                button {
                    color: #fff;
                    width: 80%;
                    height: 40px;
                    border: none;
                    font-size: 14px;
                    background-color: #1d90f5;
                    cursor: pointer;

                    &:hover {
                        background-color: #3aa1fb;
                    }
                }
            }
        }
    }
}
</style>