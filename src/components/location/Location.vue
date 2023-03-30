<template>
    <div class="map">
        <div class="map-wrapper">
            <div id="allmap"></div>
            <el-button circle class="closeBtn" @click="emit('showLocation')">
                <i-ep-close></i-ep-close>
            </el-button>
            <el-button type="success" circle class="sendBtn" @click="emit('sendLocation')">
                <i-ep-check></i-ep-check>
            </el-button>
        </div>
    </div>
</template>
<script setup>
import { getLocations } from '@/tools';
import { onMounted } from 'vue';
const emit = defineEmits(['showLocation', 'sendLocation'])
onMounted(() => {
    getLocations("allmap")
})

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