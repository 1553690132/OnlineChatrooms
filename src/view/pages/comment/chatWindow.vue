<template>
    <div class="chatWindow">
        <div class="top-part">
            <div class="infos">
                <div class="head-sculpture">
                    <Personal v-if="chatWay" :imgUrl="windowStore.chatWindowInfo.headImg" :showOnline="false">
                    </Personal>
                    <div class="avatar" ref="avatar" v-else>
                        <span>群</span>
                    </div>
                </div>
                <div class="info-detail">
                    <div class="info-name">{{ _name }}</div>
                    <div class="info-sculpture">{{ windowStore.chatWindowInfo.detail }}</div>
                </div>
            </div>
            <div class="other-functions">
                <el-tooltip v-if="!chatWay" effect="dark" content="邀请加入群聊" placement="bottom">
                    <MoreFilled @click="invitePeople" />
                </el-tooltip>
                <el-tooltip effect="dark" content="发送地址" placement="bottom">
                    <LocationFilled @click="showLocation" />
                </el-tooltip>
                <el-tooltip effect="dark" content="拍照发送" placement="bottom">
                    <CameraFilled @click="sendCamera" />
                </el-tooltip>
                <label for="img">
                    <el-tooltip effect="dark" content="发送图片" placement="bottom">
                        <PictureFilled />
                    </el-tooltip>
                </label>
                <input type="file" id="img" accept="image/*" @change="sendPicture">
                <label for="doc">
                    <el-tooltip effect="dark" content="发送文件" placement="bottom">
                        <UploadFilled />
                    </el-tooltip>
                </label>
                <input type="file" id="doc" accept="application/*,text/*" @change="sendFile">
            </div>
        </div>
        <div class="bottom-part" v-loading="loading.isLoading" element-loading-background="rgba(0, 0, 0, 0.7)">
            <div class="chat-content" ref="chatPart">
                <div class="chat-wrapper" v-for="item in chatMsg" :key="item._id">
                    <div class="chat-friend" v-if="item.username !== userStore.username">
                        <ChatArea :item="item" :chatWay="chatWay"></ChatArea>
                    </div>
                    <div class="chat-me" v-else>
                        <ChatArea :item="item" :chatWay="chatWay"></ChatArea>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <div class="emoji-btn sendMsg" @click="chooseEmoji">
                    <img src="@/assets/img/emoji/slightly-smiling-face.png" alt="emoji">
                </div>
                <div class="emoji-content">
                    <Emoji v-show="showEmojiList" @closeEmoji="chooseEmoji" @sendEmoji="sendEmoji"></Emoji>
                </div>
                <input type="text" v-model="message" @keyup.enter="sendMessage" class="input-part">
                <div class="send-btn sendMsg" @click="sendMessage">
                    <img src="@/assets/img/emoji/rocket.png" alt="send-btn">
                </div>
            </div>
        </div>
    </div>
    <CameraTake v-if="cameraShow" @showCamera="showCamera" @sendMsg="sendMsg"></CameraTake>
    <Location v-if="locationShow" @showLocation="showLocation" @sendLocation="sendLocation"></Location>
    <CreateGroupCard v-if="inviteShow" @invitePeople="invitePeople" :invite="inviteShow"></CreateGroupCard>
</template> 
<script setup>
import Personal from '@/components/personal/Personal.vue';
import ChatArea from '@/components/chats/ChatArea.vue'
import CameraTake from '@/components/camera/CameraTake.vue'
import Location from '@/components/location/Location.vue';
import CreateGroupCard from '@/components/group/CreateGroupCard.vue';
import Emoji from '@/components/chats/Emoji.vue';
import { ref, watch, onMounted, reactive, nextTick, computed, getCurrentInstance } from 'vue';
import { animationScroll } from '@/tools/index'
import { ElMessage, ElMessageBox } from 'element-plus';
import { chatWindowStore } from '@/store/chatWindowStore';
import { userInfoStore } from '@/store/userStore';
import { loadingStore } from '@/store/lodingStore';
import { groupChatInfoStore } from '@/store/groupChat';
import qs from 'qs';
import socket from '@/tools/socket';
import axios from 'axios';
const windowStore = chatWindowStore()
const userStore = userInfoStore()
const loading = loadingStore()
const groupChatStore = groupChatInfoStore()
const avatar = ref(null)
const showEmojiList = ref(false), chatMsg = reactive([])
const { proxy } = getCurrentInstance()
const cameraShow = ref(false), locationShow = ref(false), inviteShow = ref(false)
const props = defineProps({ chatWay: Boolean })
const _name = computed(() => { return props.chatWay ? windowStore.chatWindowInfo.nickname : windowStore.chatWindowInfo.groupName })


const chooseEmoji = () => showEmojiList.value = !showEmojiList.value
// 切换时更新窗口个人聊天数据
const updateMsg = async (info) => {
    loading.showLoading
    const res = await proxy.$api.chatMsg.gainMsg({ sid: userStore._id, rid: info._id })
    loading.hideLoading
    if (res.status !== 200) return ElMessage({ type: 'error', message: res.message })
    chatMsg.length = 0
    if (!res.message.sendMsg) {
        chatMsg.push(...res.message.recMsg.chats)
    } else if (!res.message.recMsg) {
        chatMsg.push(...res.message.sendMsg.chats)
    } else {
        chatMsg.push(...res.message.sendMsg.chats, ...res.message.recMsg.chats)
    }
    chatMsg.sort((a, b) => {
        return a.time - b.time
    })
    chatMsg.forEach(e => { if (e.chatType === 1 && e.imgType === 2) thumbnail.push(e.msg) })
    scrollBottom()
}
// 更新群组消息
const updateGroupMsg = async info => {
    await groupChatStore.getGroupChatList()
    chatMsg.length = 0
    const msgs = groupChatStore.getChatInfo(info)
    chatMsg.push(...msgs)
    scrollBottom()
}

onMounted(() => {
    if (props.chatWay) {
        updateMsg(windowStore.chatWindowInfo)
        socket.on('upMsg', (data) => {
            chatMsg.push(data.msg)
            scrollBottom()
        })
    } else {
        setBackgroundColor()
        updateGroupMsg(windowStore.chatWindowInfo.gid)
        socket.on('upGroupMsg', data => {
            chatMsg.push(data.msg)
            scrollBottom()
        })
    }
})

watch(() => windowStore.chatWindowInfo, () => {
    if (props.chatWay) {
        updateMsg(windowStore.chatWindowInfo)
    } else {
        updateGroupMsg(windowStore.chatWindowInfo.gid)
        setBackgroundColor()
    }
}, { deep: true })

// 获取窗口高度并滑动至最底层
const chatPart = ref(null) //vue3获取原生dom对象
const scrollBottom = () => {
    nextTick(() => {
        const chatPartDom = chatPart.value
        animationScroll(chatPartDom, chatPartDom.scrollHeight - chatPartDom.offsetHeight)
    })
}


let message = ref("")
// 发送消息
const sendMessage = () => {
    if (message.value) {
        let newMsg = {
            username: userStore.username,
            time: new Date().getTime(),
            msg: message,
            chatType: 0,
        }
        sendMsg(newMsg, 'text')
        message.value = ""
    } else ElMessage({ message: '消息不能为空!', type: 'warning' })
}

const sendMsg = async (msgs, type = '') => {
    let chats = msgs;
    // 纯文本处理响应式
    if (type === 'text') {
        chats = JSON.stringify({ ...msgs, msg: msgs.msg.value })
    } else if (type === 'image') {
        chats = JSON.stringify({ ...msgs, msg: qs.parse(msgs.msg) })
    } else if (type === 'file') {
        const formData = new FormData()
        formData.append("sid", userStore._id)
        formData.append("rid", windowStore.chatWindowInfo._id)
        formData.append("file", msgs.msg)
        formData.append("others", JSON.stringify({ ...msgs, msg: '' }))
        const { data: res } = await axios.post('chat/file', formData, {
            'Content-type': 'multipart/form-data'
        })
        if (res.status !== 200) return ElMessage({ type: 'error', message: res.message })
        updateMsg(windowStore.chatWindowInfo)
        userStore.listSort(windowStore.chatWindowInfo._id)
        scrollBottom()
        return;
    } else {
        chats = JSON.stringify({ ...msgs })
    }

    if (props.chatWay) {
        socket.emit('privateChat', {
            sid: userStore._id,
            rid: windowStore.chatWindowInfo._id,
            msg: chats,
        })

        const res = await proxy.$api.chatMsg.sendMessage({ sid: userStore._id, rid: windowStore.chatWindowInfo._id, chats })
        if (res.status !== 200) return ElMessage({ type: 'error', message: res.message })
        // 发送后重新获取
        updateMsg(windowStore.chatWindowInfo)
        userStore.listSort(windowStore.chatWindowInfo._id)
        await windowStore.alreadyRead(windowStore.chatWindowInfo._id)
        scrollBottom()
    } else {
        chats = JSON.stringify({ ...JSON.parse(chats), headImg: userStore.userImg })
        socket.emit('groupChat', {
            sid: userStore._id,
            rid: windowStore.chatWindowInfo._id,
            msg: chats
        })
        const res = await proxy.$api.groupChat.sendGroupMsg({ gid: windowStore.chatWindowInfo._id, message: chats })
        if (res.status !== 200) return ElMessage.error('fail!')
        updateGroupMsg(windowStore.chatWindowInfo.gid)
        scrollBottom()
    }

}

// 发送表情
const sendEmoji = (msg) => {
    let newMsg = {
        username: userStore.username,
        time: new Date().getTime(),
        msg,
        chatType: 1,
        extend: {
            imgType: 1
        }
    }
    sendMsg(newMsg)
    scrollBottom()
    chooseEmoji()
}

const sendPicture = (e) => {
    let newMsg = {
        username: userStore.username,
        time: new Date().getTime(),
        msg: "",
        chatType: 1,
        extend: {
            imgType: 2
        }
    }
    let fileName = e.target.files[0]
    if (!e || !window.FileReader) return // 是否支持file Reader
    let reader = new FileReader()
    reader.readAsDataURL(fileName)
    reader.addEventListener('loadend', function () {
        newMsg.msg = this.result
        sendMsg(newMsg, 'image')
    })
    e.target.fileName = null
}

const sendFile = (e) => {
    let newMsg = {
        username: userStore.username,
        time: new Date().getTime(),
        msg: "",
        chatType: 2,
        extend: {
            fileType: 0
        },
    }
    let fileName = e.target.files[0]
    newMsg.msg = fileName
    if (fileName) {
        switch (fileName.type) {
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                newMsg.extend.fileType = 1;
                break;
            case "application/vnd.ms-excel":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                newMsg.extend.fileType = 2;
                break;
            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                newMsg.extend.fileType = 3;
                break;
            case "application/pdf":
                newMsg.extend.fileType = 4;
                break;
            case "application/zip":
            case "application/x-zip-compressed":
                newMsg.extend.fileType = 5;
                break;
            case "text/plain":
                newMsg.extend.fileType = 6;
                break;
            default:
                newMsg.extend.fileType = 0;
        }
        sendMsg(newMsg, 'file')
        e.target.files = null
    }
}

const showCamera = () => cameraShow.value = !cameraShow.value

const sendCamera = () => {
    ElMessageBox.confirm(
        '我们需要获取您的摄像头权限，是否继续？',
        '摄像',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            showCamera()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}

const showLocation = () => locationShow.value = !locationShow.value
const sendLocation = () => {
    let newMsg = {
        username: userStore.username,
        time: new Date().getTime(),
        msg: "",
        chatType: 3,
    }
    let address = sessionStorage.getItem('address')
    if (address) {
        newMsg.msg = address
        sendMsg(newMsg)
    }
    showLocation()
}

const setBackgroundColor = () => {
    const color = sessionStorage.getItem('backgroundColor')
    avatar.value.style.backgroundColor = color
}

const invitePeople = () => {
    inviteShow.value = !inviteShow.value
}

</script>
<style lang="less" scoped>
.chatWindow {
    position: relative;
    width: 100%;
    height: 100%;
    margin-left: 25px;

    .top-part {
        display: flex;
        margin-top: 10px;
        margin-bottom: 40px;
        justify-content: space-between;
        align-items: center;

        .infos {
            display: flex;

            .info-detail {
                margin: 2px 20px 0;

                .info-name {
                    font-size: 20px;
                    font-weight: 600;
                    color: #fff;
                }

                .info-sculpture {
                    color: #9e9e9e;
                    font-size: 12px;
                    margin-top: 2px;
                }
            }
        }

        .other-functions {
            margin-top: 20px;

            svg {
                color: rgb(158, 161, 177);
                cursor: pointer;
                width: 30px;
                height: 30px;
                margin-left: 30px;
                border: none !important;
            }

            input {
                display: none;
            }
        }
    }

    .bottom-part {
        position: relative;
        height: 70vh;
        background-color: rgb(50, 54, 68);
        padding: 20px;
        border-radius: 10px;
        box-sizing: border-box;

        .chat-content {
            width: 100%;
            height: 85%;
            overflow-y: scroll;
            padding: 20px;
            box-sizing: border-box;

            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                display: none;
            }

            .chat-wrapper {
                position: relative;
                word-break: break-all;

                .chat-friend {
                    width: 100%;
                    display: flex;
                    margin-bottom: 30px;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: flex-start;
                }

                .chat-me {
                    width: 100%;
                    margin-bottom: 25px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    align-items: flex-end;
                }
            }
        }

        .chat-input {
            position: absolute;
            width: 92%;
            margin: 2%;
            display: flex;

            .sendMsg {
                position: relative;
                width: 50px;
                height: 50px;
                background-color: rgb(66, 70, 86);
                border-radius: 15px;
                border: 1px solid rgb(80, 85, 103);
                cursor: pointer;

                img {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            .emoji-btn {
                transition: .5s;

                &:hover {
                    background-color: rgb(46, 49, 61);
                    border: 1px solid rgb(71, 73, 82);
                }
            }

            .input-part {
                width: 90%;
                height: 50px;
                background-color: rgb(66, 70, 86);
                border-radius: 15px;
                border: 2px solid rgb(34, 135, 225);
                box-sizing: border-box;
                margin: 0 20px;
                font-size: 20px;
                color: #fff;
                font-weight: 100;
                padding: 10px;

                &:focus {
                    outline: red;
                }
            }

            .send-btn {
                background-color: rgb(29, 144, 245);
                border: 0;
                transition: .3s;
                box-shadow: 0 0 5px 0 rgb(0, 136, 255);

                &:hover {
                    box-shadow: 0 0 10px 0 rgb(0, 136, 255);
                }
            }
        }
    }

    .avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: #5079d3;
        text-align: center;

        span {
            color: #fff;
            font-weight: 700;
            line-height: 45px;
            font-size: 20px;
        }
    }
}
</style>