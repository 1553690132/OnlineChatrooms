<template>
    <div class="chatWindow">
        <div class="top-part">
            <div class="infos">
                <div class="head-sculpture">
                    <Personal :imgUrl="chatWindowInfo.headImg"></Personal>
                </div>
                <div class="info-detail">
                    <div class="info-name">{{ chatWindowInfo.name }}</div>
                    <div class="info-sculpture">{{ chatWindowInfo.detail }}</div>
                </div>
            </div>
            <div class="other-functions">
                <LocationFilled />
                <CameraFilled />
                <label for="img">
                    <PictureFilled />
                </label>
                <input type="file" id="img" accept="image/*">
                <label for="doc">
                    <UploadFilled />
                </label>
                <input type="file" id="doc" accept="application/*,text/*">
            </div>
        </div>
        <div class="bottom-part">
            <div class="chat-content">
                <div class="chat-wrapper" v-for="item in chatMsg" :key="item.id">
                    <div class="chat-friend" v-if="item.uid !== '1001'">
                        <ChatArea :item="item"></ChatArea>
                    </div>
                    <div class="chat-me" v-else>
                        <ChatArea :item="item"></ChatArea>
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
                <input type="text" @keyup.enter="sendMessage" class="input-part">
                <div class="send-btn sendMsg" @click="sendMessage">
                    <img src="@/assets/img/emoji/rocket.png" alt="send-btn">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Personal from '@/components/Personal.vue';
import ChatArea from '@/components/ChatArea.vue'
import Emoji from '@/components/Emoji.vue';
import { defineProps, ref, watch, onMounted, reactive } from 'vue';
import { getChatMsg } from '@/api/getData'
const props = defineProps({ chatWindowInfo: Object })
let showEmojiList = ref(false), chatMsg = reactive([])
const chooseEmoji = () => showEmojiList.value = !showEmojiList.value
const sendEmoji = () => showEmojiList.value = !showEmojiList.value

const updateMsg = async (info) => {
    let res = await getChatMsg(info)
    chatMsg.length = 0
    chatMsg.push(...res)
}
onMounted(() => {
    updateMsg(props.chatWindowInfo)
})
watch(() => props.chatWindowInfo, () => {
    updateMsg(props.chatWindowInfo)
})


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
                    margin-bottom: 20px;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                }

                .chat-me {
                    width: 100%;
                    margin-bottom: 20px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
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
}
</style>