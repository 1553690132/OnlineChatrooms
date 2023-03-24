<template>
    <div class="modify-avatar">
        <el-dialog v-model="dialogVisible" title="修改头像" class="avatar-dialog" draggable @close="emit('changeDialog')">
            <div class="modify-body">
                <div class="modify-area">
                    <div class="avatar-wrapper">
                        <img :src="avatarUrl" class="drawPanel" ref="drawPanel" @click="changeCanvas"
                            v-show="!isCanvasShow">
                        <canvas ref="canvas_avatar" class="canvas_avatar" v-show="isCanvasShow"></canvas>
                    </div>
                    <el-slider v-model="measurement" :show-tooltip="false" />
                </div>
                <div class="show-area">
                    <div class="show-body">
                        <canvas ref="canvas_show_avatar" class="canvas_show_avatar"></canvas>
                    </div>
                    <div class="show-title">
                        <span>头像预览</span>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="emit('changeDialog')">上一步</el-button>
                    <el-button type="primary" @click="updateAvatar">上传并保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';
import { drawAvatar, changeAvatarSize } from '@/tools/avatar'
import axios from 'axios';
const emit = defineEmits(['changeDialog', 'showAvatarConfig'])
const props = defineProps({ avatarUrl: String })
const isCanvasShow = ref(false), dialogVisible = ref(true)
const measurement = ref(0), canvas_avatar = ref(null), canvas_show_avatar = ref(null), drawPanel = ref(null)
watch(() => measurement.value, () => {
    isCanvasShow.value = true
    changeAvatarSize(canvas_avatar.value, measurement.value, drawPanel.value, canvas_show_avatar.value)
})
// 切换事件
const changeCanvas = () => {
    isCanvasShow.value = true
    drawAvatar(canvas_avatar.value, drawPanel.value, canvas_show_avatar.value, 200, 200)
}
// 头像更新
const updateAvatar = async () => {
    dialogVisible.value = false
    const avatar_url = canvas_show_avatar.value.toDataURL()
    emit('showAvatarConfig')
    const formData = new FormData()
    formData.append('avatar_url', avatar_url)
    const { data: res } = await axios.post('info/updateAvatar', formData, { 'Content-type': 'multipart/form-data' })
    if (res.status !== 200) return ElMessage.error('更新失败!')
    return ElMessage.success('更新成功')
}
</script>

<style lang="less" scoped>
.modify-avatar {
    width: 100%;

    .modify-body {
        display: flex;
        justify-content: space-around;

        .modify-area {
            width: 200px;
            height: 200px;

            .avatar-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
                box-sizing: border-box;
                border: 1px solid #ccc;
                background-color: #ccc;

                .drawPanel {
                    width: 200px;
                    height: 200px;
                }

                .canvas_avatar {
                    position: absolute;
                    cursor: move;
                }
            }
        }

        .show-area {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .show-body {
                position: relative;
                width: 200px;
                height: 200px;
                border: 1px solid #ccc;
                border-radius: 50%;
                overflow: hidden;
            }

            .show-title {
                margin-top: 10px;
                font-weight: 700;
            }
        }
    }
}
</style>