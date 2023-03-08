<template>
    <div class="personal" :class="{ online: online }">
        <el-avatar :src="imgUrl" :size="45"></el-avatar>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    imgUrl: String,
    online: Boolean
})
</script>

<style lang="less" scoped>
.personal {
    position: relative;

    &::before {
        content: "";
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #ccc;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 100;
    }
}

.online {
    &::before {
        background-color: rgb(144, 225, 80) !important;
    }
}
</style>