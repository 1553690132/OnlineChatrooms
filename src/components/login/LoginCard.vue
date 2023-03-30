<template>
    <div class="loginPart">
        <div class="login-form">
            <el-form :model="InfoForm" ref="InfoFormRef" :rules="rules" @keyup.enter="submitForm(InfoFormRef)">
                <el-form-item prop="username" :class="{ forget: !showForget }" v-if="operate != 'code'">
                    <el-input class=" input-text" v-model="InfoForm.username" placeholder="用户名" size="large">
                        <template #prefix>
                            <el-icon>
                                <i-ep-user />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="phone" :class="{ forget: !showForget }" v-if="operate != 'pwd'">
                    <el-input class="input-text" v-model="InfoForm.phone" placeholder="手机号" size="large">
                        <template #prefix>
                            <el-icon>
                                <i-ep-iphone />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" v-if="operate == 'pwd'">
                    <el-input class="input-text" v-model="InfoForm.password" type="password" show-password placeholder="密码"
                        size="large">
                        <template #prefix>
                            <el-icon>
                                <i-ep-lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" v-else :class="{ forget: !showForget }">
                    <el-input class="input-text" v-model="InfoForm.code" type="password" show-password placeholder="请输入验证码"
                        size="large">
                        <template #prefix>
                            <el-icon>
                                <i-ep-help />
                            </el-icon>
                        </template>
                        <template #append>
                            <el-button @click="getCode" :disabled="disabled">{{ btn_text }}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" v-if="!showForget" :class="{ forget: !showForget }">
                    <el-input class="input-text" v-model="InfoForm.password" type="password" show-password
                        placeholder="设置密码" size="large">
                        <template #prefix>
                            <el-icon>
                                <i-ep-lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="showForget">
                    <div class="forget-part">
                        <span class="forget" @click="changeParts('forget')">忘记密码</span>
                    </div>
                </el-form-item>
                <el-form-item v-else>
                    <el-checkbox v-model="checked" label="我已阅读并同意" />
                    <span class="agree"><a href="javascript:;">《聊天室服务政策》</a><a href="javascript:;">《隐私政策》</a></span>
                </el-form-item>
            </el-form>
        </div>
        <div class="login-footer">
            <div class="btn-part">
                <button @click="submitForm(InfoFormRef)"><a href="javascript:;">{{ btn_content }}</a></button>
            </div>
            <div class="reg-part" v-if="areas">
                <span>没有账号? </span><a @click="changeParts('reg')">立即注册</a>
            </div>
            <div class="log-part" v-else>
                <span>已有账号? </span><a @click="changeParts('pwd')">立即登录</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref, reactive, getCurrentInstance, computed, watch } from 'vue'
import socket from '@/tools/socket';
const props = defineProps({ operate: String })
const emit = defineEmits(['changePart'])
const areas = computed(() => { return props.operate == 'reg' ? false : true })
const showForget = computed(() => { return props.operate !== 'reg' && props.operate !== 'forget' ? true : false })
const btn_content = computed(() => { return areas ? '登录' : '注册' })
const InfoForm = reactive({
    username: '',
    password: '',
    code: '',
    phone: ''
})
const InfoFormRef = ref(''), checked = ref(false), disabled = ref(false), btn_text = ref('获取验证码'), sec = ref(10)
const { proxy } = getCurrentInstance()
watch(() => props.operate, (value) => {
    console.log(value);
    if (value == 'pwd') {
        InfoForm.username = sessionStorage.getItem('username')
        InfoForm.password = sessionStorage.getItem('password')
        sessionStorage.clear()
    }
})
const validatePhone = (rule, value, callback) => {
    const regex = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
    return value.test(regex)
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
    code: [
        { required: true, message: '验证码不能为空!', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '手机号不能为空!', trigger: 'blur' },
        { validatePhone, message: '手机号非法!', trigger: 'blur' }
    ]
})
const changeParts = (part) => {
    for (const key in InfoForm) {
        InfoForm[key] = ''
    }
    emit('changePart', part)
}
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, field) => {
        if (!valid) {
            ElMessage({ type: 'error', message: 'fail!' })
            return;
        }
        if (props.operate == 'pwd') {
            const res = await proxy.$api.login.loginProcess(InfoForm)
            if (res.status !== 200) return ElMessage.error(res.message)
            sessionStorage.setItem('token', res.token)
            socket.emit('logins', res.uid)
            router.replace('/home')
        } else if (props.operate == 'code') {
            const res = await proxy.$api.login.loginByCode(InfoForm)
            if (res.status !== 200) return ElMessage.error(res.message)
            sessionStorage.setItem('token', res.token)
            socket.emit('logins', res.uid)
            router.replace('/home')
        } else if (props.operate == 'reg') {
            const res = await proxy.$api.login.registerProcess(InfoForm)
            if (res.status !== 200) return ElMessage.error(res.message)
            ElMessage.success('注册成功，现在去登录吧~')
            sessionStorage.setItem('username', InfoForm.username)
            sessionStorage.setItem('password', InfoForm.password)
            changeParts('pwd')
        } else {
            const res = await proxy.$api.login.resetPassword(InfoForm)
            if (res.status !== 200) return ElMessage.error(res.message)
            ElMessage.success('更改密码成功！')
            sessionStorage.setItem('username', InfoForm.username)
            sessionStorage.setItem('password', InfoForm.password)
            changeParts('pwd')
        }
    })
}
const getCode = async () => {
    if (!InfoForm.phone) return ElMessage.error('手机号不能为空!')
    const regex = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
    if (!regex.test(InfoForm.phone)) return ElMessage.error('手机号格式不正确!')
    disabled.value = true
    const timer = setInterval(() => {
        btn_text.value = `请${sec.value}s后再试`
        sec.value = sec.value - 1
        if (sec.value == -2) {
            clearInterval(timer)
            disabled.value = false
            btn_text.value = '发送验证码'
        }
    }, 1000);
    timer
    sec.value = 60
    const res = await proxy.$api.login.gainCode({ phone: InfoForm.phone, operate: props.operate })
    if (res.status !== 200) return ElMessage.error(res.message)
    return ElMessage.success('请稍等，验证码已发送!')
}
</script>

<style lang="less" scoped>
@normal-color: #435ee4;

.loginPart {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .login-form {
        width: 100%;
        flex: 1;

        .el-form-item {
            margin-top: 30px;


            :deep(.el-input__wrapper) {
                height: 48px;
                font-size: 14px;
            }

            .is-checked {
                :deep(.el-checkbox__inner) {
                    background-color: @normal-color;
                    border-color: @normal-color;
                }

                :deep(.el-checkbox__label) {
                    color: @normal-color;
                }
            }


            .forget-part {
                display: flex;
                justify-content: flex-end;
                width: 100%;

                .forget {
                    cursor: pointer;
                    color: #888;
                }
            }
        }

        .forget {
            margin-top: 0px;
        }

        .agree {
            a {
                text-decoration: none;
                color: @normal-color;
            }
        }
    }

    .login-footer {
        display: flex;
        flex-direction: column;
        align-items: center;


        .btn-part {
            width: 100%;

            button {
                width: 260px;
                height: 45px;
                border-radius: 8px;
                border: none;
                background-color: @normal-color;
                cursor: pointer;

                a {
                    font-size: 16px;
                    color: #fff;
                    text-decoration: none;
                }
            }
        }

        .reg-part {
            margin-top: 20px;
            font-size: 14px;

            a {
                color: @normal-color;
                cursor: pointer;
            }
        }

        .log-part {
            margin-top: 20px;
            font-size: 14px;

            a {
                color: @normal-color;
                cursor: pointer;
            }
        }
    }
}
</style>