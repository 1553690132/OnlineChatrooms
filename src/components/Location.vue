<template>
    <div class="map">
        <div class="map-wrapper">
            <div id="allmap"></div>
            <el-button :icon="Close" circle class="closeBtn" @click="emit('showLocation')" />
            <el-button :icon="Check" type="success" circle class="sendBtn" @click="sendLocation"></el-button>
        </div>
    </div>
</template>
<script setup>
import { getLocation } from '@/tools';
import { onMounted, defineEmits, ref } from 'vue';
import { ElButton, ElMessage } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';
import axios from 'axios';
const emit = defineEmits(['showLocation', 'sendLocation'])
onMounted(() => {
    getLocation("allmap")
})
const sendLocation = () => {
    axios.get(`/api/reverse_geocoding/v3/?output=json&coordtype=wgs84ll&ak=OiL9s730uNG9SPmKLqQn9ISM6xPf1EGI&`, {
        params: {
            location: `${sessionStorage.getItem('latitude')},${sessionStorage.getItem('longitude')}`
        }
    }).then(res => {
        ElMessage({ message: '地址发送成功!', type: 'success' })
        sessionStorage.setItem('address', res.data.result.formatted_address)
        emit('sendLocation')
    }).catch(err => {
        ElMessage({ message: '地址无法获取! 请联系相关人员！', type: 'error' })
    })
    emit('showLocation')
}
</script>
<style lang="less" scoped>
.map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    .map-wrapper {
        position: relative;
        width: 80%;
        height: 80%;
        box-shadow: 3px 2px 10px 0 #0088ff;
        border-radius: 10px;

        #allmap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 10px;
            margin: 0;
            font-family: "微软雅黑";
        }

        .closeBtn {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 100;
        }

        .sendBtn {
            position: absolute;
            bottom: 20px;
            right: 60px;
            z-index: 100;
        }
    }
}
</style>