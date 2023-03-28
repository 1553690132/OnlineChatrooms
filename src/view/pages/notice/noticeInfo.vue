<template>
    <div class="noticeInfo">
        <div class="notice-item" v-for="item in notifications" :key="item.nid">
            <div class="avatar">
                <el-icon>
                    <BellFilled />
                </el-icon>
            </div>
            <div class="content">
                <div class="el-text" truncated>{{ item.content }}</div>
            </div>
            <div class="methods">
                <div class="times">{{ moment(item.times).format('lll') }}</div>
                <el-button type="danger" :icon="Delete" circle @click="deleteNotice(item)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';
import { userInfoStore } from '@/store/userStore';
import { Delete } from '@element-plus/icons-vue';
import $axios from '@/api';
import { ElMessage } from 'element-plus';
moment.locale('zh-CN')
const userStore = userInfoStore()
const props = defineProps({ notifications: Array })
const emit = defineEmits(['getNotice'])
const deleteNotice = async (item) => {
    const { data: res } = await $axios.delete('/notice/delete', { params: { uid: userStore._id, nid: item.nid } })
    if (res.status !== 200) return ElMessage.error('删除失败!')
    emit('getNotice')
}
</script>

<style lang="less" scoped>
.noticeInfo {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .notice-item {
        display: flex;
        padding: 15px;
        border-radius: 10px;
        background-color: #2d303c;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        margin-bottom: 10px;
        transition: .3s linear;
        margin: 0 10px 10px;

        &:hover {
            transform: translateY(-3px);
            -webkit-box-shadow: 0 0 6px #3f90f6;
            box-shadow: 0 0 6px #3f90f6;
            -webkit-transition: all .5s ease-out;
            transition: all .5s ease-out;
        }

        .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            background-color: #3f90f6;
            border-radius: 50%;

            .el-icon {
                font-size: 26px;
                color: #fff;
            }
        }

        .content {
            flex: 1;
            margin-left: 40px;
            color: #eee;
            white-space: nowrap;
        }

        .methods {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ddd;
            font-size: 12px;

            .times {
                margin-right: 15px;
            }
        }
    }
}
</style>