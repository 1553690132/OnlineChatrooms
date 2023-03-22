<template>
    <div class="login">
        <div class="login-wrapper">
            <div class="login-img">
                <img src="@/assets/img/login.png" alt="login">
            </div>
            <div class="login-forms">
                <div class="login-title">
                    <p v-if="loginOrRegister">聊天系统登录页</p>
                    <p v-else>聊天系统注册页</p>
                </div>
                <LoginInfo :loginOrRegister="loginOrRegister" @changePart="changePart"></LoginInfo>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import LoginInfo from '@/components/login/LoginInfo.vue';
let loginOrRegister = ref(true)
const changePart = () => {
    loginOrRegister.value = !loginOrRegister.value
}

</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/BG.jpg');
    overflow: hidden;

    .login-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 720px;
        height: 350px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        padding: 10px;
        box-sizing: border-box;

        .login-img {
            position: relative;
            flex: 1;

            img {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
            }
        }

        .login-forms {
            flex: 1;

            .login-title {
                text-align: center;
                font-size: 26px;
                font-weight: 600;
                margin: 20px 0;
            }
        }
    }
}
</style>