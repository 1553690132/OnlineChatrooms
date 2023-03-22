<template>
    <div class="friend-home">
        <div class="friend-title">
            <h1>好友列表</h1>
        </div>
        <div class="friend-body">
            <div class="friend-left">
                <div class="search-part">
                    <el-input v-model="searchContext" :prefix-icon="Search" placeholder="搜索" @focus="focus" @blur="focus"
                        :class="{ actived: isFocus }" clearable></el-input>
                    <el-button :icon="Plus" circle @click="showSearchPart" />
                </div>
                <div class="friend-list">
                    <friendList />
                </div>
                <el-card class="box-card" v-if="showSearchArea" shadow="always">
                    <template #header>
                        <div class="card-header">
                            <span>输入搜索</span>
                        </div>
                    </template>
                </el-card>
            </div>
            <div class="friend-right">
                <friendInfo v-if="_friendInfoStore.showFriendInfo" />
                <img src="../../../assets/img/loadingFriend.png" alt="" v-else>
            </div>
        </div>
    </div>
    <searchCard @showSearchPart="showSearchPart" v-if="showSearch"></searchCard>
</template>
<script setup>
import friendList from './friendList.vue';
import friendInfo from './friendInfo.vue';
import searchCard from '@/components/search/searchCard.vue';
import { Plus, Search } from '@element-plus/icons-vue';
import { friendListInfoStore } from '@/store/friendList';
import { friendInfoStore } from '@/store/friendInfo';
import { onMounted, onBeforeUnmount, ref } from 'vue';
const friendListStore = friendListInfoStore()
const _friendInfoStore = friendInfoStore()
const searchContext = ref(''), isFocus = ref(false), showSearch = ref(false), showSearchArea = ref(false)
const showSearchPart = () => showSearch.value = !showSearch.value
onMounted(async () => {
    await friendListStore.getGroupList()
})
onBeforeUnmount(() => {
    _friendInfoStore.clearStatus()
})
const focus = () => {
    isFocus.value = !isFocus.value
    showSearchArea.value = !showSearchArea.value
}
</script>
<style lang="less" scoped>
@normal-color: #282a37;

.friend-home {
    .friend-title {
        color: #fff;
        padding-left: 10px;
    }

    .friend-body {
        display: flex;
        margin-top: 20px;
        background-color: #323644;
        border-radius: 5px;

        .friend-left {
            position: relative;
            width: 300px;
            min-width: 280px;
            color: #fff;
            overflow: hidden;

            .search-part {
                display: flex;
                margin: 30px 10px 0 10px;
                box-sizing: border-box;
                width: 260px;
                height: 32px;

                :deep(.el-input__wrapper) {
                    background-color: @normal-color;
                    box-shadow: 0 0 0 1px @normal-color inset;
                    color: #fff;
                }

                :deep(.actived) {
                    border: 1px solid #3f90f6;
                    border-radius: 4px;
                    box-sizing: border-box;
                }

                :deep(.el-input__inner) {
                    color: #fff;
                }

                :deep(.el-button) {
                    background-color: @normal-color;
                    border-color: @normal-color;

                    &:focus {
                        color: #606266;
                    }
                }

                button {
                    margin-left: 10px;
                }
            }


            .friend-list {
                position: relative;
                height: 65vh;
                margin-top: 25px;
                box-sizing: border-box;

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 1px;
                    background-image: linear-gradient(0deg, #fff 50%, transparent 50%);
                }
            }

            :deep(.box-card) {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 70px;
                z-index: 10;
                width: 90%;
                border-radius: 4px;
            }
        }

        .friend-right {
            flex: 1;
            background-color: #393d4b;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 300px;
            }
        }
    }

}
</style>