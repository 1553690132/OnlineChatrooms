<template>
    <div class="groupCard" ref="groupCard" :class="{ activeCard: groupChatInfo._id == windowStore.preCurrent }"
        @click="setColor">
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
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { generateRandomColors } from '@/tools/index'
import { chatWindowStore } from '@/store/chatWindowStore';
const windowStore = chatWindowStore()
const props = defineProps({ groupChatInfo: Object })
const avatar = ref(null)
onMounted(() => {
    generateRandomColors(avatar.value)
})

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