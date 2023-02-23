<template>
    <div class="nav">
        <div class="nav-menu">
            <ul class="menu-list">
                <li v-for="(item, index) in routerSvg" :class="{ activeNav: index == current }" :key="index"
                    @click="changeMenu(index)" :data="current">
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
            <Personal :imgUrl="imgUrl" />
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import Personal from './Personal.vue'
import routerSvg from '../localData/routerSvg'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const current = ref(0)
const imgUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
const router = useRouter()
const changeMenu = function (index) {
    if (index !== 0) {
        ElMessage('开发中，敬请期待！')
        router.push('/')
    }
    this.current = index;
}


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
        align-items: flex-end;

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
  