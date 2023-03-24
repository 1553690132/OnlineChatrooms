<template>
    <el-form :class="{ loginForm: props.loginOrRegister, registerForm: !props.loginOrRegister }" ref="InfoFormRef"
        :model="InfoForm" :rules="rules">
        <el-form-item prop="username">
            <el-input class="input-text" v-model="InfoForm.username" placeholder="请输入用户名" size="large">
                <template #prefix>
                    <el-icon>
                        <User />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input class="input-text" v-model="InfoForm.password" type="password" show-password placeholder="请输入密码"
                size="large">
                <template #prefix>
                    <el-icon>
                        <Lock />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="repeatPwd" v-if="!props.loginOrRegister">
            <el-input class="input-text" v-model="InfoForm.repeatPwd" placeholder="请重复输入密码" size="large">
                <template #prefix>
                    <el-icon>
                        <Check />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="btns">
            <el-button type="primary" size="large" class="loginBtn" round @click="submitForm(InfoFormRef)">{{ msgFirst
            }}</el-button>
            <el-button type="info" size="large" class="loginBtn" round @click="emit('changePart', props.loginOrRegister)">{{
                msgSecond }}</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import $axios from '@/api';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { ref, reactive, watch } from 'vue'
import { userInfoStore } from '@/store/userStore'
import socket from '@/tools/socket';
const userStore = userInfoStore()
const props = defineProps({ loginOrRegister: Boolean })
const emit = defineEmits(['changePart'])
let msgFirst = ref('登录'), msgSecond = ref('注册')
watch(() => props.loginOrRegister, () => {
    msgFirst.value = props.loginOrRegister ? '登录' : '注册'
    msgSecond.value = props.loginOrRegister ? '注册' : '取消'
})
const InfoFormRef = ref('')
const InfoForm = reactive({
    username: 'Admin',
    password: '12345678',
    repeatPwd: ''
})

const validatePwd = (rule, value, callback) => {
    if (value === '') callback(new Error('重复密码不能为空!'))
    else if (value !== InfoForm.password) callback(new Error('两次密码输入应一致!'))
    else { callback(); console.log(value[0]); }
}

const rules = reactive({
    username: [
        { required: true, message: '请输入用户账号', trigger: 'blur' },
        { min: 5, max: 12, message: '账号长度在5到12字符之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入用户密码', trigger: 'blur' },
        { min: 8, max: 12, message: '账号密码在8到12字符之间', trigger: 'blur' },
    ],
    repeatPwd: [
        { validator: validatePwd, trigger: 'blur' }
    ]
})

const submitForm = async (fromEl) => {
    if (!fromEl) return
    await fromEl.validate(async (valid, field) => {
        if (!valid) {
            ElMessage({ type: 'error', message: 'fail!' })
            return;
        }
        if (props.loginOrRegister) {
            // 登录
            const { data: res } = await $axios.post('api/login', InfoForm)
            if (res.status !== 200) return ElMessage({ type: 'error', message: res.message })
            ElMessage({ type: 'success', message: '登录成功!' })
            sessionStorage.setItem('token', res.token)
            socket.emit('logins', res.uid)
            router.replace('/home')
        } else {
            // 注册
            const { data: res } = await $axios.post('api/reg', InfoForm)
            if (res.status !== 200) return ElMessage({ type: 'error', message: res.message })
            ElMessage({ type: 'success', message: '注册成功,请去登录!' })
            emit('changePart', props.loginOrRegister)
        }
    })
}
</script>

<style lang="less" scoped>
.registerForm {
    padding: 20px;
    box-sizing: border-box;

    .btns {
        margin-top: 30px;

        .loginBtn {
            width: 100px;
        }
    }
}

.loginForm {
    padding: 20px;
    box-sizing: border-box;

    .el-form-item {
        margin-bottom: 30px;
    }

    .btns {
        margin-top: 40px;

        .loginBtn {
            width: 100px;
        }
    }
}
</style>