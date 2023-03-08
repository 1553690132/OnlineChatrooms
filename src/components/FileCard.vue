<template>
    <div class="file-card">
        <img src="@/assets/img/fileImg/unknowfile.png" alt="unknowFile" v-if="fileType == 0" />
        <img src="@/assets/img/fileImg/word.png" alt="word" v-else-if="fileType == 1" />
        <img src="@/assets/img/fileImg/excel.png" alt="excel" v-else-if="fileType == 2" />
        <img src="@/assets/img/fileImg/ppt.png" alt="ppt" v-else-if="fileType == 3" />
        <img src="@/assets/img/fileImg/pdf.png" alt="pdf" v-else-if="fileType == 4" />
        <img src="@/assets/img/fileImg/zpi.png" alt="zpi" v-else-if="fileType == 5" />
        <img src="@/assets/img/fileImg/txt.png" alt="txt" v-else />

        <div class="word">
            <span>{{ file.originalFilename }}</span>
            <span>{{ size }}</span>
        </div>
    </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps({
    fileType: Number,
    file: Object
})
const size = computed({
    get() {
        if (props.file.size >= 1024) {
            return `${Math.floor(props.file.size / 1024)}KB`
        } else return `${props.file.size}B`
    }
})
</script>

<style lang="less">
.file-card {
    width: 250px;
    height: 100px;
    background-color: rgb(45, 48, 63);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 20px;

    &:hover {
        background-color: rgb(33, 36, 54);
    }

    img {
        width: 70px;
        height: 70px;
    }

    .word {
        width: 60%;
        margin-left: 10px;
        overflow: hidden;

        span {
            width: 90%;
            display: inline-block;
            color: #fff;
        }

        span:first-child {
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        span:last-child {
            font-size: 12px;
            color: rgb(180, 180, 180);
        }
    }
}
</style>