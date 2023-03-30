<template>
    <div class="searchCard">
        <el-dialog v-model="dialogVisible" @close="closeSearchCard" center draggable>
            <template #header>
                <div class="title-text">
                    <h3 :class="{ activePart: partChange }" @click="switchModule">添加好友</h3>
                    <h3 :class="{ activePart: !partChange }" @click="switchModule">添加群组</h3>
                </div>
            </template>
            <div class="search-body" v-if="partChange">
                <el-input v-model="searchCondition" placeholder="请输入对方的账号或昵称" @keydown.enter="inquireAbout" clearable>
                    <el-icon class="el-icon--left"><i-ep-search></i-ep-search></el-icon>
                </el-input>
                <el-button type="primary" @click="inquireAbout">查找</el-button>
            </div>
            <div class="search-body" v-else>
                <el-input v-model="searchCondition" placeholder="请输入群名" @keydown.enter="findGroups" clearable>
                    <el-icon class="el-icon--left"><i-ep-search></i-ep-search></el-icon>
                </el-input>
                <el-button type="primary" @click="findGroups">查找</el-button>
            </div>
            <template #footer v-if="showResult">
                <el-result icon="info" title="无匹配项" sub-title="请重新输入查询条件" v-if="showInfo">
                </el-result>
                <div class="search-results" v-for="(item, index) in searchResult" :key="index" v-else>
                    <FindFriend v-if="partChange" :item="item" @closeSearchCard="closeSearchCard"></FindFriend>
                    <FindGroup v-else :item="item" @closeSearchCard="closeSearchCard"></FindGroup>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import FindFriend from '../friend/FindFriend.vue';
import FindGroup from '../group/FindGroup.vue';
import { ref, computed, getCurrentInstance } from 'vue';
const emit = defineEmits(['showSearchPart'])
const dialogVisible = ref(true), showResult = ref(false), searchCondition = ref(''), searchResult = ref([]), partChange = ref(true)
const { proxy } = getCurrentInstance()
const showInfo = computed(() => { return searchResult.value.length === 0 ? true : false })
const closeSearchCard = () => {
    dialogVisible.value = false
    emit('showSearchPart')
}
const inquireAbout = async () => {
    if (!searchCondition.value) return ElMessage.info('请先填写查询条件!')
    const res = await proxy.$api.search.searchPeople({ searchCondition: searchCondition.value })
    if (res.status !== 200) return ElMessage.error('查询失败!')
    showResult.value = true
    searchResult.value = []
    if (res.message instanceof Array) searchResult.value.push(...res.message)
    else searchResult.value.push(res.message)
}
const findGroups = async () => {
    if (!searchCondition.value) return ElMessage.info('请先填写查询条件!')
    const res = await proxy.$api.search.searchGroup({ searchCondition: searchCondition.value })
    if (res.status !== 200) return ElMessage.error('查询失败!')
    showResult.value = true
    searchResult.value = []
    console.log(res.message);
    searchResult.value.push(...res.message)
}
const switchModule = () => {
    partChange.value = !partChange.value
    searchCondition.value = ''
    showResult.value = false
}
</script>

<style lang="less" scoped>
.searchCard {
    .title-text {
        display: flex;
        justify-content: center;

        h3 {
            cursor: pointer;
            margin: 0 10px;
            padding: 2px;
        }

        .activePart {
            color: #3f90f6;
            border-bottom: 2px solid #3f90f6;
        }
    }

    .search-body {
        display: flex;

        :deep(.el-button) {
            margin-left: 20px;
        }
    }

    :deep(.el-dialog__footer) {
        margin-top: 20px;
        border-top: 1px solid #ddd;
        background-color: #f7f7f7;
        overflow: hidden;
    }
}
</style>