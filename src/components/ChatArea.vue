<template>
    <div class="info-time" v-if="item.uid === '1001'" v-show="showTime">
        <span class="item_time">{{ item.time }}</span>
    </div>
    <div class="item_info" v-else>
        <img :src="item.headImg" alt="headimg">
    </div>

    <!-- 文字内容 -->
    <div class="chat-text" v-if="item.chatType == 0" @dblclick="showTime = !showTime" onselectstart="return false">{{ item.msg
    }}</div>
    <div class="chat-img" v-if="item.chatType == 1">
        <img :src="item.msg" alt="emoji" v-if="item.extend.imgType == 1">
        <el-image style="max-width: 300px; border-radius: 10px; margin: 0 20px;" :src="item.msg"
            :preview-src-list="thumbnail" v-else></el-image>
    </div>
    <div class="chat-img" v-if="item.chatType == 2">
        <div class="word-file">
            <FileCard :fileType="item.extend.fileType" :file="item.msg"></FileCard>
        </div>
    </div>
    <div class="chat-img" v-if="item.chatType == 3">
        <LocationCard></LocationCard>
    </div>

    <div class="item_info" v-if="item.uid === '1001'">
        <img :src="item.headImg" alt="headimg">
    </div>
    <div class="info-time" v-else v-show="showTime">
        <span class="item_time">{{ item.time }}</span>
    </div>
</template>
<script setup>
import { defineProps, ref } from 'vue';
import FileCard from './FileCard.vue';
import LocationCard from './LocationCard.vue';
const props = defineProps({
    item: Object,
    thumbnail: Array
})
const showTime = ref(false)
</script>
<style lang="less" scoped>
.chat-friend {
    .item_info {
        img {
            width: 34px;
            height: 34px;
            border-radius: 5px;
            vertical-align: middle;
        }
    }

    .chat-text {
        max-width: 90%;
        padding: 14px;
        border-radius: 10px 20px 20px 20px;
        background-color: rgb(56, 60, 75);
        color: #fff;
        margin-left: 10px;

        &:hover {
            background-color: rgb(39, 42, 55);
        }
    }

    .chat-img {
        img {
            margin-left: 20px !important;
            width: 100px;
            height: 100px;
        }
    }

    .info-time {
        display: flex;
        align-self: flex-start;
        margin-top: 10px;
        color: #fff;
        font-size: 12px;

        .item_time {
            color: rgb(101, 104, 115);
            margin-left: 10px;
        }
    }
}

.chat-me {
    .item_info {
        display: flex;
        align-self: flex-start;


        img {
            width: 34px;
            height: 34px;
            border-radius: 5px;
            vertical-align: middle;
        }
    }

    .chat-text {
        max-width: 90%;
        padding: 14px;
        border-radius: 20px 10px 20px 20px;
        background-color: rgb(29, 144, 245);
        color: #fff;
        margin-right: 10px;

        &:hover {
            background-color: rgb(26, 129, 219);
        }
    }

    .chat-img {
        img {
            margin-right: 20px;
            width: 100px;
            height: 100px;
        }
    }

    .info-time {
        display: flex;
        align-self: flex-start;
        margin-top: 10px;
        color: #fff;
        font-size: 12px;

        .item_time {
            color: rgb(101, 104, 115);
            margin-right: 10px;
        }

    }
}
</style>