<template>
    <div class="friend-home">
        <div class="friend-title">
            <h1>好友列表</h1>
        </div>
        <div class="friend-body">
            <div class="friend-left">
                <div class="search-part">
                    <el-input v-model.lazy="searchContext" :prefix-icon="Search" placeholder="搜索"
                        :class="{ actived: isFocus }" clearable @focus="focus" @change="searchFor" @blur="blur"
                        @clear="closeCard"></el-input>
                    <el-popconfirm title="请选择您的操作" icon="warning" confirm-button-text="加好友/加群" cancel-button-text="创建群聊"
                        cancel-button-type="success" @confirm="showSearchPart" @cancel="showCreateGroup" width="200">
                        <template #reference>
                            <el-button :icon="Plus" circle />
                        </template>
                    </el-popconfirm>
                </div>
                <div class="choice-part">
                    <span :class="{ isActive: switchPartValue }" @click="switchPart">好友</span>
                    <span :class="{ isActive: !switchPartValue }" @click="switchPart">群聊</span>
                </div>
                <div class="friend-list">
                    <friendList v-if="switchPartValue" />
                    <groupList v-else></groupList>
                </div>
                <el-card class="box-card" shadow="always" v-if="showSearchArea">
                    <template #header>
                        <div class="card-header">
                            <span>输入搜索</span>
                        </div>
                        <el-icon>
                            <Close @click="closeCard" />
                        </el-icon>
                    </template>
                    <div class="searchResult">
                        <div class="friend-part" v-if="searchFriendResult.length">
                            <div class="friend-title">好友</div>
                            <div class="friend-item" v-for="item in searchFriendResult" :key="item._id">
                                <FindFriend :item="item" :search="true"></FindFriend>
                            </div>
                        </div>
                        <div class="group-part" v-if="searchGroupResult.length">
                            <div class="group-title">群聊</div>
                            <div class="group-item" v-for="item in searchGroupResult" :key="item._id">
                                <FindGroup :item="item" :search="true"></FindGroup>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="friend-right">
                <friendInfo v-if="_friendInfoStore.showFriendInfo" />
                <groupInfo v-else-if="groupChatStore.showGroupInfo"></groupInfo>
                <img src="../../../assets/img/loadingFriend.png" alt="blank" v-else>
            </div>
        </div>
    </div>
    <SearchCard @showSearchPart="showSearchPart" v-if="showSearch"></SearchCard>
    <CreateGroupCard @showCreateGroup="showCreateGroup" v-if="showCreateArea"></CreateGroupCard>
</template>
<script setup>
import friendList from './friendList.vue';
import friendInfo from './friendInfo.vue';
import groupInfo from './groupInfo.vue'
import groupList from './groupList.vue'
import FindGroup from '@/components/group/FindGroup.vue';
import FindFriend from '@/components/friend/FindFriend.vue';
import SearchCard from '@/components/search/SearchCard.vue';
import CreateGroupCard from '@/components/group/CreateGroupCard.vue';
import { Plus, Search } from '@element-plus/icons-vue';
import { friendListInfoStore } from '@/store/friendList';
import { friendInfoStore } from '@/store/friendInfo';
import { groupChatInfoStore } from '@/store/groupChat';
import { onMounted, onBeforeUnmount, ref } from 'vue';
const friendListStore = friendListInfoStore()
const groupChatStore = groupChatInfoStore()
const _friendInfoStore = friendInfoStore()
const searchContext = ref(''), isFocus = ref(false), showSearch = ref(false), showSearchArea = ref(false), showCreateArea = ref(false)
const switchPartValue = ref(true), searchGroupResult = ref([]), searchFriendResult = ref([])
const showSearchPart = () => showSearch.value = !showSearch.value
const showCreateGroup = () => showCreateArea.value = !showCreateArea.value
const switchPart = () => {
    switchPartValue.value = !switchPartValue.value
    _friendInfoStore.clearStatus()
    groupChatStore.clearStatus()
}
const searchFor = () => {
    if (!searchContext.value) return
    searchGroupResult.value = groupChatStore.searchGroup(searchContext.value)
    searchFriendResult.value = friendListStore.searchFriend(searchContext.value)
}
onMounted(async () => {
    await friendListStore.getGroupList()
    await groupChatStore.getGroupChatList()
})
onBeforeUnmount(() => {
    _friendInfoStore.clearStatus()
    groupChatStore.clearStatus()
})
const focus = () => {
    isFocus.value = true
    showSearchArea.value = true
}
const blur = () => { isFocus.value = false }
const closeCard = () => { showSearchArea.value = false }
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
        height: 76vh;

        .friend-left {
            position: relative;
            width: 300px;
            min-width: 280px;
            color: #fff;
            overflow: hidden;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                display: none;
            }

            .search-part {
                display: flex;
                margin: 30px 10px 0 10px;
                box-sizing: border-box;
                width: 270px;
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


            .choice-part {
                display: flex;
                width: 100%;
                height: auto;
                padding: 20px;
                box-sizing: border-box;
                justify-content: center;
                align-items: center;

                span {
                    cursor: pointer;
                    margin: 0 20px;
                    font-size: 16px;
                    padding-bottom: 4px;
                }

                .isActive {
                    color: #3f90f6;
                    border-bottom: 2px solid #3f90f6;
                }
            }

            .friend-list {
                position: relative;
                height: 65vh;
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
                height: 60vh;
                background-color: #282a37;
                color: #fff;
                border-color: #323644;
                overflow: hidden;
                overflow-y: scroll;

                &::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                    display: none;
                }

                .searchResult {
                    display: flex;
                    flex-direction: column;

                    .friend-part {
                        width: 100%;

                        .friend-title {
                            color: #ddd;
                            font-size: 16px;
                            padding-bottom: 10px;
                            padding-left: 0px;
                        }
                    }

                    .group-part {
                        width: 100%;

                        .group-title {
                            color: #ddd;
                            font-size: 16px;
                            padding: 10px 0;
                            border-top: 1px solid #ccc;
                        }

                        .group-item {
                            display: flex;
                            justify-content: center;
                        }
                    }
                }
            }


            :deep(.el-card__header) {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .el-icon {
                    cursor: pointer;
                }
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