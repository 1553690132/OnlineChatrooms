<template>
    <div class="config-info">
        <el-card>
            <div class="card-header">
                <h3>编辑资料</h3>
                <el-icon>
                    <CloseBold @click="emit('showConfigInfoCard')" />
                </el-icon>
            </div>
            <div class="card-body">
                <el-form size="small" label-width="50px" :model="InfoForm">
                    <el-form-item label="昵 称" prop="nickname">
                        <el-input v-model="InfoForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="签 名" prop="detail">
                        <el-input type="textarea" v-model="InfoForm.detail"></el-input>
                    </el-form-item>
                    <el-form-item label="性 别" prop="sex">
                        <el-radio-group v-model="InfoForm.sex">
                            <el-radio label="男">男</el-radio>
                            <el-radio label="女">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生 日" prop="age">
                        <el-date-picker v-model="InfoForm.age"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="所在地" prop="location">
                        <el-input v-model="InfoForm.location"></el-input>
                    </el-form-item>
                    <el-form-item label="职 业" prop="occupation">
                        <el-select v-model="InfoForm.occupation" size="small" placeholder="职业选择">
                            <el-option v-for="item in jobs" :key="item.job" :label="item.job" :value="item.job"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公 司" prop="corporation">
                        <el-input v-model="InfoForm.corporation"></el-input>
                    </el-form-item>
                    <el-form-item label="学 校" prop="school">
                        <el-input v-model="InfoForm.school"></el-input>
                    </el-form-item>
                    <el-form-item label="电 话" prop="telephone">
                        <el-input v-model="InfoForm.telephone"></el-input>
                    </el-form-item>
                </el-form>
                <div class="end-btns">
                    <el-button type="primary" plain @click="saveInfo">保存</el-button>
                    <el-button type="info" plain @click="emit('showConfigInfoCard')">关闭</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script setup>
import $axios from '@/api';
import { ElMessage } from 'element-plus';
import { defineEmits, onMounted, reactive } from 'vue';
import { userInfoStore } from '@/store/userStore';
import { infoStore } from '@/store/infoStore';
const emit = defineEmits(['showConfigInfoCard', 'showPersonalConfig'])
const jobs = reactive([])
const userStore = userInfoStore()
const _infoStore = infoStore()
const InfoForm = reactive({
    nickname: userStore.nickname,
    detail: userStore.detail,
    ..._infoStore.userInfo,
})
const getJobs = async () => {
    const { data: res } = await $axios.get('/occupation/job')
    jobs.push(...res.message)
}
const saveInfo = async () => {
    const { data: res } = await $axios.post('/info/configInfo', { username: userStore.username, ...InfoForm })
    if (res.status !== 200) return ElMessage({ type: 'error', message: '更新失败!' })
    ElMessage({ type: 'success', message: '更新成功!' })
    emit('showPersonalConfig')
    emit('showConfigInfoCard')
}
onMounted(() => {
    getJobs()
})
</script>
<style lang="less" scoped>
.config-info {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    min-height: 500px;
    transform: translate(-50%, -50%);
    z-index: 20;
    padding: 10px;
    box-sizing: border-box;

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;

        .el-icon {
            cursor: pointer;
        }
    }

    .card-body {
        margin-top: 10px;

        .end-btns {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>