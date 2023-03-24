<template>
    <div class="headImg-upload">
        <div class="headImg-upload-wrapper" v-if="dialogVisible">
            <div class="upload-header">
                <h4>上传头像</h4>
                <el-icon>
                    <CloseBold @click="emit('showHeadImgConfig')" />
                </el-icon>
            </div>
            <el-upload class="upload-demo" drag :before-upload="beforeAvatarUpload" :http-request="uploadAvatar">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    点击上传或<em>拖拽图片至此处</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                    </div>
                </template>
            </el-upload>
        </div>
        <AvatarDialog @changeDialog="changeDialog" :avatarUrl="avatarUrl" @showAvatarConfig="showAvatarConfig" v-else>
        </AvatarDialog>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import AvatarDialog from './AvatarDialog.vue'
const emit = defineEmits(['showHeadImgConfig'])
const dialogVisible = ref(true), avatarUrl = ref('')
// 切换显示域
const changeDialog = () => dialogVisible.value = !dialogVisible.value
// 头像上传检验
const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('头像必须为JPG格式!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像图片大小不能超过2MB!')
        return false
    }
    return true
}
// 头像上传
const uploadAvatar = (data) => {
    changeDialog()
    const avatar = data.file
    const reader = new FileReader()

    reader.readAsDataURL(avatar)
    reader.addEventListener('loadend', function () {
        avatarUrl.value = this.result
        // formData.append('avatar-url', this.result)
        // const { data: res } = await axios.post('info/updateAvatar', formData, { 'Content-type': 'multipart/form-data' })
        // if (res.status !== 200) return ElMessage.error('更新失败!')
        // return ElMessage.success('更新成功')
    })
}
const showAvatarConfig = () => emit('showHeadImgConfig')
</script>

<style lang="less" scoped>
.headImg-upload {
    position: absolute;
    top: 0;
    background-color: rgba(151, 157, 167, .6);
    z-index: 100;
    width: 100%;
    height: 100%;

    .headImg-upload-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 600px;
        transform: translate(-50%, -50%);
        z-index: 20;
        padding: 10px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 6px;

        .upload-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .el-icon {
                cursor: pointer;
            }
        }
    }
}
</style>