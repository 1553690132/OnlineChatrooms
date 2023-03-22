<template>
    <div class="information">
        <el-card class="box-card" shadow="always">
            <div class="card-header">
                <div class="info-header">
                    <img class="headImg" :src="userStore.userImg">
                    <el-icon class="headImg-filter">
                        <CameraFilled @click="showHeadImgConfig" color="white" />
                    </el-icon>
                    <div class="infos">
                        <div class="username">{{ userStore.nickname }}</div>
                        <div class="occupation">{{ _infoStore.userInfo.occupation }}</div>
                        <div class="detail">{{ userStore.detail }}</div>
                    </div>
                </div>
                <el-icon>
                    <CloseBold @click="emit('showPersonalConfig')" />
                </el-icon>
            </div>
            <div class="card-body">
                <ul>
                    <li><span class="msg-title">账 号</span><span class="msg-body">{{ _infoStore.userInfo.username }}</span>
                    </li>
                    <li><span class="msg-title">个 人</span><span class="msg-body">{{ _infoStore.userInfo._age }} {{
                        _infoStore.userInfo.sex
                    }}</span></li>
                    <li><span class="msg-title">所在地</span><span class="msg-body">{{ _infoStore.userInfo.location }}</span>
                    </li>
                    <li><span class="msg-title">电 话</span><span class="msg-body">{{ _infoStore.userInfo.telephone }}</span>
                    </li>
                    <li><span class="msg-title">职 业</span><span class="msg-body">{{ _infoStore.userInfo.occupation }}</span>
                    </li>
                    <li><span class="msg-title">公 司</span><span class="msg-body">{{ _infoStore.userInfo.corporation
                    }}</span>
                    </li>
                    <li><span class="msg-title">学 校</span><span class="msg-body">{{ _infoStore.userInfo.school }}</span>
                    </li>
                </ul>
                <div class="configInfo">
                    <button @click="showConfigInfoCard">编辑资料</button>
                </div>
            </div>
        </el-card>
    </div>
    <ConfigInfo v-if="showConfig" @showConfigInfoCard="showConfigInfoCard"
        @showPersonalConfig="emit('showPersonalConfig')" />
    <HeadImgConfig v-if="showHeadImg" @showHeadImgConfig="showHeadImgConfig" />
</template>

<script setup>
import { defineEmits, onMounted, ref } from 'vue';
import { userInfoStore } from '@/store/userStore';
import { infoStore } from '@/store/infoStore';
import ConfigInfo from './ConfigInfo.vue';
import HeadImgConfig from './HeadImg.vue';
const emit = defineEmits(['showPersonalConfig'])
const userStore = userInfoStore()
const _infoStore = infoStore()
let showConfig = ref(false), showHeadImg = ref(false)
const showConfigInfoCard = () => showConfig.value = !showConfig.value
const showHeadImgConfig = () => showHeadImg.value = !showHeadImg.value
onMounted(() => {
    _infoStore.getSpecificInfo(userStore.username)
})
</script>

<style lang="less" scoped>
.information {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 380px;
    height: 460px;
    transform: translate(-50%, -50%);
    z-index: 15;
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
                margin-bottom: 50px;

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

                }
            }

            .configInfo {
                display: flex;
                width: 100%;
                justify-content: center;

                button {
                    width: 80%;
                    height: 40px;
                    border: none;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    background-color: #fff;
                    cursor: pointer;

                    &:hover {
                        border-color: rgb(30, 111, 255);
                        color: rgb(30, 111, 255);
                    }
                }
            }
        }
    }
}
</style>