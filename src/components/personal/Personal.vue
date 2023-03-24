<template>
    <div class="personal" :class="{ online: online, showOnline: showOnline }">
        <el-avatar :src="imgUrl" :size="45"></el-avatar>
    </div>
</template>

<script setup>
const props = defineProps({
    imgUrl: String,
    online: Boolean,
    showOnline: Boolean
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
        display: none;
    }
}

.online {
    &::before {
        background-color: rgb(144, 225, 80) !important;
    }
}

.showOnline {
    &::before {
        display: block;
    }
}
</style>