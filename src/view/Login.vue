<template>
    <div class="login">
        <div class="login-part">
            <div class="login-left">
                <div class="login-left-title">
                    <h2>HM-7 聊天室</h2>
                    <span>主动一点，世界会更大。</span>
                </div>
                <img src="../assets/img/login.png" alt="login">
            </div>
            <div class="login-right" :class="{ noLogin: !areas }">
                <div class="form-part">
                    <div class="form-title">
                        <div class="logins-title" v-if="areas">
                            <span @click="changePart('pwd')" :class="{ actived: operate == 'pwd' }">密码登录</span>
                            <span @click="changePart('code')" :class="{ actived: operate == 'code' }">验证码登录</span>
                        </div>
                        <div class="other-title" v-else>
                            <span v-if="operate == 'reg'">注 册</span>
                            <span v-else>重置密码</span>
                        </div>
                    </div>
                    <div class="form-body">
                        <LoginCard :operate="operate" @changePart="changePart"></LoginCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import LoginCard from '@/components/login/LoginCard.vue';
const operate = ref('pwd')
const areas = computed(() => { return operate.value == 'pwd' || operate.value == 'code' ? true : false })
const changePart = (value) => {
    operate.value = value
}

</script>

<style lang="less" scoped>
@normal-color: #435ee4;

.login {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url(../assets/img/BG.jpg);
    min-width: 850px;
    min-height: 650px;

    .login-part {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        height: 500px;
        display: flex;

        .login-left {
            height: 100%;
            width: 380px;
            background-color: @normal-color;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            box-sizing: border-box;
            border-radius: 4px 0 0 4px;
            box-shadow: 0 0 4px 0 #6C74F7;

            .login-left-title {
                color: #fff;
                margin-top: 10px;
                margin-left: 40px;

                h2 {
                    margin-bottom: 10px;
                }

                span {
                    font-family: serif;
                }

                img {
                    width: 100%;
                }
            }

        }

        .login-right {
            width: 420px;
            height: 100%;
            background-color: #fff;
            border-radius: 0 4px 4px 0;
            box-shadow: 0 0 4px 0 #fff;
            padding: 50px 40px 40px 40px;
            box-sizing: border-box;

            .form-part {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                align-items: center;
            }


            .form-title {
                font-size: 18px;
                font-weight: 700;
                color: #444;
                margin-bottom: 40px;
                cursor: pointer;

                .logins-title {
                    span {
                        display: inline-block;
                        padding-bottom: 5px;

                        &:first-child {
                            margin-right: 40px;
                        }
                    }
                }

                .other-title {
                    span {
                        color: #000;
                        font-size: 22px;
                    }
                }

                .actived {
                    color: @normal-color;
                    border-bottom: 3px solid @normal-color;
                }
            }

            .form-body {
                flex: 1;
                width: 100%;
            }


            .form-footer {
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
                        background-color: normal-color;

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

            }
        }

        .noLogin {
            padding-top: 20px !important;
            padding-bottom: 30px !important;

            .form-title {
                margin-bottom: 20px !important;
            }
        }
    }
}
</style>