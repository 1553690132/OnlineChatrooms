<template>
    <div class="nav">
        <div class="nav-menu">
            <ul class="menu-list">
                <li v-for="(item, index) in routerSvg" :class="{ activeNav: index == navStore.current }" :key="index"
                    @click="navStore.changeMenu(index)" :data="navStore.current">
                    <router-link :to="item.path">
                        <div class="block"></div>
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                            <path fill="currentColor" :d="item.svg">
                            </path>
                        </svg>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="user-part">
            <Personal :imgUrl="userStore.userImg" :online="userStore.online" @click="showPersonalConfig"
                :showOnline="true" />
        </div>
    </div>
    <Information v-if="configShow" @showPersonalConfig="showPersonalConfig"></Information>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Personal from '../personal/Personal.vue'
import routerSvg from '../../localData/routerSvg'
import { userInfoStore } from '@/store/userStore'
import { navInfoStore } from '@/store/navStore'
import Information from '../information/Information.vue';
import { ElNotification } from 'element-plus'
const userStore = new userInfoStore()
const navStore = new navInfoStore()
const configShow = ref(false), times = ref(0), gap_times = ref(0)
// 发送登录状态
const sendBreakage = async () => {
    const blob = new Blob([JSON.stringify({ username: userStore.username })], {
        type: 'application/x-www-form-urlencoded; charset=UTF-8'
    })
    navigator.sendBeacon('http://localhost:3007/api/breakage', blob)
}
const showPersonalConfig = () => configShow.value = !configShow.value
const beforeHandler = () => {
    times.value = new Date().getTime()
}
// 刷新误差大于五毫秒
const unloadHandler = () => {
    gap_times.value = new Date().getTime() - times.value
    if (gap_times.value <= 5) {
        console.log(123);
        sendBreakage()
    }
}
onMounted(async () => {
    ElNotification.success({
        title: '登录成功',
        message: '欢迎回到聊天室',
    })
    await userStore.getUserInfo()
    navStore.changeMenu(sessionStorage.getItem('current'))
    window.addEventListener('beforeunload', beforeHandler)
    window.addEventListener('unload', unloadHandler)
})
onUnmounted(() => {
    window.removeEventListener('beforeunload', beforeHandler)
    window.removeEventListener('unload', unloadHandler)
})

</script>
  
<style lang="less" scoped>
@main-color: rgb(29, 144, 245);
@main-size: 34px;

.nav {
    position: relative;
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .nav-menu {
        display: flex;
        flex: 3;
        align-items: inherit;

        li {
            list-style: none;
            cursor: pointer;

            a {
                display: flex;
            }

            &:hover {
                svg {
                    color: @main-color;
                }

                .block {
                    background-color: @main-color;
                }
            }

            svg {
                transition: 0.7s;
                width: @main-size;
                height: @main-size;
                color: rgb(158, 161, 177);
            }

            .block {
                position: absolute;
                left: 0;
                height: @main-size;
                width: 5px;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                transition: .5s;
            }

            margin-bottom: 40px;
        }
    }

    .user-part {
        display: flex;
        flex: 1;
        align-items: center;
    }

    .activeNav {
        svg {
            color: @main-color !important;
        }

        .block {
            background-color: @main-color !important;
        }
    }
}
</style>
  