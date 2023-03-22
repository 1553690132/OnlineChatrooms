<template>
    <div class="searchCard">
        <el-dialog v-model="dialogVisible" title="添加好友" @close="closeSearchCard" center draggable>
            <div class="search-body">
                <el-input v-model="searchCondition" :prefix-icon="Search" placeholder="请输入对方的账号或昵称"
                    @keydown.enter="inquireAbout" clearable></el-input>
                <el-button type="primary" @click="inquireAbout">查找</el-button>
            </div>
            <template #footer v-if="showResult">
                <el-result icon="info" title="无匹配项" sub-title="请重新输入查询条件" v-if="showInfo">
                </el-result>
                <div class="search-results" v-for="(item, index) in searchResult" :key="index" v-else>
                    <FindFriend :item="item"></FindFriend>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import $axios from '@/api';
import FindFriend from '../friend/FindFriend.vue';
import { ref, defineEmits, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
const emit = defineEmits(['showSearchPart'])
const dialogVisible = ref(true), showResult = ref(false), searchCondition = ref(''), searchResult = ref([])
const showInfo = computed(() => { return searchResult.value.length === 0 ? true : false })
const closeSearchCard = () => {
    dialogVisible.value = false
    emit('showSearchPart')
}
const inquireAbout = async () => {
    if (!searchCondition.value) return ElMessage.info('请先填写查询条件!')
    const { data: res } = await $axios.get('/search/people', { params: { searchCondition: searchCondition.value } })
    if (res.status !== 200) return ElMessage.error('查询失败!')
    showResult.value = true
    searchResult.value = []
    if (res.message instanceof Array) searchResult.value.push(...res.message)
    else searchResult.value.push(res.message)
    console.log(searchResult.value);
}
</script>

<style lang="less" scoped>
.searchCard {
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