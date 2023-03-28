<template>
    <div class="noticeHome">
        <div class="notice-title">
            <h1>通知中心</h1>
        </div>
        <div class="notice-body">
            <div class="notice-panel">
                <div class="panel-title">
                    <h3>最近收到的通知</h3>
                </div>
                <el-scrollbar>
                    <div class="notification-list">
                        <noticeInfo v-if="notifications.length" :notifications="notifications" @getNotice="getNotice"></noticeInfo>
                        <img src="@/assets/img/blankNotice.png" alt="blank" v-else>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script setup>
import $axios from '@/api';
import noticeInfo from './noticeInfo.vue';
import { userInfoStore } from '@/store/userStore';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
const userStore = userInfoStore()
const notifications = ref([])
const getNotice = async () => {
    const { data: res } = await $axios.get('/notice/gain', { params: { uid: userStore._id } })
    if (res.status !== 200) return ElMessage.error('获取失败')
    notifications.value = res.message
}
onMounted(async () => {
    await userStore.getUserInfo()
    await getNotice()
})
</script>

<style lang="less" scoped>
.noticeHome {
    .notice-title {
        color: #fff;
        padding-left: 10px;
    }

    .notice-body {
        display: flex;
        margin-top: 20px;
        background-color: #323644;
        border-radius: 5px;
        height: 76vh;

        .notice-panel {
            width: 100%;
            box-sizing: border-box;
            padding: 30px;
            overflow: hidden;
            min-width: 600px;

            .panel-title {
                width: 100%;
                color: #fafafa;
                padding-bottom: 10px;
                border-bottom: 1px solid #4b4e60;
            }

            .notification-list {
                display: flex;
                width: 100%;
                height: 100%;
                overflow: hidden;
                padding: 10px 0;
                box-sizing: border-box;
                justify-content: center;

                img {
                    width: 340px;
                    height: 340px;
                }
            }
        }
    }
}
</style>