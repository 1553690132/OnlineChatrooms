<template>
    <div class="camera">
        <div class="camera-wrapper">
            <video ref="_video" autoplay class="video"></video>
            <canvas ref="_canvas"></canvas>
            <div class="shutter" @click="_shutter" v-show="!isSend">
                <div class="shutter-btn"></div>
            </div>
            <div class="chance-btns" v-show="isSend">
                <el-button class="sendPhoto" type="success" circle @click="savePhoto">
                    <el-icon>
                        <i-ep-check></i-ep-check>
                    </el-icon>
                </el-button>
                <el-button class="cancel" type="danger" circle @click="closeCamera">
                    <el-icon>
                        <i-ep-delete></i-ep-delete>
                    </el-icon>
                </el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { turnOnCamera, shutter, download, changePhotoPart } from '@/tools/index'
import { userInfoStore } from '@/store/userStore';
const _video = ref(null), _canvas = ref(null), isSend = ref(false)
const userStore = userInfoStore()
const emit = defineEmits(['showCamera', 'sendMsg'])
onMounted(() => {
    turnOnCamera(_video.value)
})
const _shutter = () => {
    isSend.value = true
    shutter(_canvas.value, _video.value)
}
const closeCamera = () => {
    changePhotoPart(false, _canvas.value, _video.value)
    isSend.value = false
    emit('showCamera')
}
const savePhoto = () => {
    download(_canvas.value)
    changePhotoPart(false, _canvas.value, _video.value)
    const newMsg = {
        username: userStore.username,
        time: new Date().getTime(),
        msg: _canvas.value.toDataURL(),
        chatType: 1,
        extend: {
            imgType: 2
        }
    }
    emit('sendMsg', newMsg, 'image')
    ElMessage({ message: '已成功保存至本地！', type: 'success' })
    emit('showCamera')
}
</script>

<style lang="less">
.camera {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    .camera-wrapper {
        position: relative;
        width: 500px;
        height: 380px;
        box-shadow: 3px 2px 10px 0 #0088ff;
        border-radius: 10px;
        padding: 7px;
        box-sizing: border-box;

        .video {
            background-color: #fff;
            width: 100%;
            height: 100%;
        }

        canvas {
            display: none;
        }


        .shutter {
            position: absolute;
            left: 50%;
            bottom: 10%;
            padding: 5px;
            box-sizing: border-box;
            transform: translateX(-50%);
            width: 50px;
            height: 50px;
            background-color: transparent;
            border-radius: 50%;
            border: 3px solid #fff;

            .shutter-btn {
                background-color: #fff;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }


        .chance-btns {
            position: absolute;
            right: 0;
            bottom: 0;
            margin: 0 20px 20px 0;
        }

    }
}
</style>