<template>
    <transition name="el-zoom-in-center">
        <div class="groupCard" ref="groupCard" :class="{ activeCard: groupChatInfo._id == windowStore.preCurrent }"
            @click="setColor" v-show="isShow">
            <div class="info">
                <div class="info-avatar">
                    <div class="avatar" ref="avatar">
                        <span>群</span>
                    </div>
                </div>
                <div class="info-msg">
                    <div class="name">{{ groupChatInfo.groupName }}</div>
                </div>
            </div>
            <ul class="menu" ref="menu">
                <li @click.stop="deleteChat">删除聊天</li>
                <li @click.stop="hideChat">不显示该聊天</li>
            </ul>
        </div>
    </transition>
</template>
<script setup>
import router from '@/router';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { generateRandomColors } from '@/tools/index'
import { chatWindowStore } from '@/store/chatWindowStore';
import { clickMenu } from '@/tools/menu';
const windowStore = chatWindowStore()
const { proxy } = getCurrentInstance()
const props = defineProps({ groupChatInfo: Object })
const avatar = ref(null), groupCard = ref(null), menu = ref(null), isShow = ref(true)
onMounted(() => {
    generateRandomColors(avatar.value)
    clickMenu(groupCard.value, menu.value)
})
const deleteChat = () => {
    return ElMessage.info('该功能开发中')
}
const hideChat = async () => {
    const res = await proxy.$api.groupChat.hideGroupMessage({ gid: props.groupChatInfo.gid })
    if (res.status === 200) {
        windowStore.clearStatus()
        isShow.value = false
        sessionStorage.setItem('chatWay', false)
        router.go(0)
    }
}
const setColor = () => {
    sessionStorage.setItem('backgroundColor', avatar.value.style.backgroundColor)
}

</script>
<style lang="less" scoped>
@normal-color: #1d90f5;
@shadow-color: rgb(0, 136, 255);

.groupCard {
    position: relative;
    min-width: 250px;
    min-height: 80px;
    border-radius: 10px;
    background-color: rgb(50, 54, 68);
    margin: 25px 0;
    cursor: pointer;
    transition: .3s;

    .info {
        display: flex;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 90%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        align-items: center;

        .info-avatar {
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

        .info-msg {
            margin: 5px 0 0 20px;

            .name {
                color: #fff;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 5px;
                font-family: serif;
            }

            .detail {
                color: #5c6675;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 12px;
            }
        }
    }

    &:hover {
        background-color: @normal-color !important;
        transition: .3s;
        box-shadow: 0 0 10px 0 @shadow-color;

        .info {
            .info-msg {
                .detail {
                    color: #fff !important;
                }
            }
        }
    }

    .menu {
        display: none;
        position: absolute;
        width: 150px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 5px;
        border-radius: 4px;
        box-shadow: 1px 1px 5px 1px #ccc;
        background-color: #fff;
        z-index: 10;
        overflow: visible !important;
    }

    .menu li {
        list-style: none;
        font-size: 14px;
        font-family: system-ui;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        padding: 8px;
    }

    .menu li:hover {
        background-color: #dfdfdf;
    }
}

.activeCard {
    background-color: @normal-color !important;
    transition: .5s;
    box-shadow: 3px 2px 10px 0 @shadow-color;

    .info {
        .info-msg {
            .detail {
                color: #fff !important;
            }
        }
    }
}
</style>