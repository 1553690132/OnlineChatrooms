<template>
    <div class="chat-text" v-if="item.chatType == 0">{{ item.msg }}</div>
    <!-- 文件图和表情 -->
    <div class="chat-img" v-if="item.chatType == 1">
        <img :src="item.msg" alt="emoji" v-if="item.extend.imgType == 1">
        <el-image :src="item.msg" v-else></el-image>
    </div>
    <div class="chat-img" v-if="item.chatType == 2">
        <div class="word-file">
            <FileCard :fileType="item.extend.fileType" :file="item.msg"></FileCard>
        </div>
    </div>
    <div class="info-time">
        <img :src="item.headImg" alt="headimg">
        <span class="item_name">{{ item.name }}</span>
        <span class="item_time">{{ item.time }}</span>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import FileCard from './FileCard.vue';
const props = defineProps({
    item: Object
})
</script>
<style lang="less" scoped>
.chat-friend {
    .chat-text {
        max-width: 90%;
        padding: 20px;
        border-radius: 20px 20px 20px 5px;
        background-color: rgb(56, 60, 75);
        color: #fff;

        &:hover {
            background-color: rgb(39, 42, 55);
        }
    }

    .chat-img {
        img {
            width: 100px;
            height: 100px;
        }
    }

    .info-time {
        margin: 10px 0;
        color: #fff;
        font-size: 14px;

        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
        }

        .item_time {
            color: rgb(101, 104, 115);
            margin-left: 10px;
            vertical-align: middle;
        }

    }
}

.chat-me {
    .chat-text {
        max-width: 90%;
        padding: 20px;
        border-radius: 20px 20px 5px 20px;
        background-color: rgb(29, 144, 245);
        color: #fff;

        &:hover {
            background-color: rgb(26, 129, 219);
        }
    }

    .chat-img {
        img {
            width: 100px;
            height: 100px;
        }
    }

    .info-time {
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;
        color: #fff;
        font-size: 14px;

        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
        }

        span {
            line-height: 30px;
        }


        .item_name {
            color: rgb(101, 104, 115);
            margin-right: 10px;
            vertical-align: middle;
        }
    }
}
</style>