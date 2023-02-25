<template>
    <div class="emoji">
        <div class="emoji-content">
            <div class="emoji-wrapper">
                <ul class="emoji-list">
                    <li class="emoji-item" v-for="(item, index) in emojiList" :key="index" @click="sendEmoji(item)">
                        <img :src="item" alt="emoji">
                    </li>
                </ul>
            </div>
        </div>
        <div class="emoji-close" @click="closeEmoji"></div>
    </div>
</template>

<script setup>
import emojiList from "@/localData/emoji"
import { defineEmits } from "vue";
const emit = defineEmits(['closeEmoji', 'sendEmoji'])
const sendEmoji = (item) => emit('sendEmoji', item)
const closeEmoji = () => emit('closeEmoji')
</script>

<style lang="less" scoped>
@normal-color: rgb(39, 42, 55);

.emoji {
    .emoji-content {
        position: absolute;
        top: -220px;
        left: -10px;
        width: 400px;
        height: 200px;
        background-color: @normal-color;
        z-index: 2;
        border-radius: 10px;
        transition: .3s;

        &::after {
            position: absolute;
            display: block;
            left: 25px;
            bottom: -10px;
            content: "";
            z-index: 10;
            border-top: 10px solid @normal-color;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
        }

        .emoji-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            padding: 10px;
            box-sizing: border-box;

            // 设置滚动条样式
            &::-webkit-scrollbar {
                width: 4px;
                height: 1px;
            }

            &::-webkit-scrollbar-thumb {
                // 滚动条块样式
                border-radius: 10px;
                box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
                background: rgb(95, 101, 122);
            }

            &::-webkit-scrollbar-track {
                // 轨道样式
                box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
                border-radius: 10px;
                background: rgb(39, 42, 55);
            }

            .emoji-list {
                display: flex;
                flex-wrap: wrap;
                margin-left: 10px;
                justify-content: flex-start;

                .emoji-item {
                    position: relative;
                    list-style: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                    cursor: pointer;
                    margin: 5px;

                    &:hover {
                        background-color: rgb(50, 54, 68);
                    }

                    img {
                        position: absolute;
                        height: 35px;
                        width: 35px;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
        }

    }

    .emoji-close {
        width: 100%;
        height: 100%;
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
        background-color: transparent;
    }
}
</style>