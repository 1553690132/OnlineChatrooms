<template>
    <div class="chatWindow">
        <div class="top-part">
            <div class="infos">
                <div class="head-sculpture">
                    <Personal :imgUrl="chatWindowInfo.headImg"></Personal>
                </div>
                <div class="info-detail">
                    <div class="info-name">{{ chatWindowInfo.name }}</div>
                    <div class="info-sculpture">{{ chatWindowInfo.detail }}</div>
                </div>
            </div>
            <div class="other-functions">
                <LocationFilled />
                <CameraFilled />
                <label for="img">
                    <PictureFilled />
                </label>
                <input type="file" id="img" accept="image/*">
                <label for="doc">
                    <UploadFilled />
                </label>
                <input type="file" id="doc" accept="application/*,text/*">
            </div>
        </div>
        <div class="bottom-part">

        </div>
    </div>
</template>
<script setup>
import Personal from '@/components/Personal.vue';
import { defineProps } from 'vue';
const props = defineProps({ chatWindowInfo: Object })

</script>
<style lang="less" scoped>
.chatWindow {
    position: relative;
    width: 100%;
    height: 100%;
    margin-left: 25px;

    .top-part {
        display: flex;
        margin-top: 10px;
        margin-bottom: 40px;
        justify-content: space-between;
        align-items: center;
        .infos {
            display: flex;

            .info-detail {
                margin: 2px 20px 0;

                .info-name {
                    font-size: 20px;
                    font-weight: 600;
                    color: #fff;
                }

                .info-sculpture {
                    color: #9e9e9e;
                    font-size: 12px;
                    margin-top: 2px;
                }
            }
        }

        .other-functions {
            margin-top: 20px;
            svg {
                color: rgb(158, 161, 177);
                cursor: pointer;
                width: 30px;
                height: 30px;
                margin-left: 30px;
            }

            input {
                display: none;
            }
        }
    }

    .bottom-part {
        height: 70vh;
        background-color: rgb(50, 54, 68);
        padding: 20px;
        border-radius: 10px;
        box-sizing: border-box;
    }
}
</style>