<template>
    <div class="friendPart">
        <div class="context">
            <img :src="item.headImg" alt="avatar">
            <span class="nickname">{{ item.nickname }}({{ item.username }})</span>
        </div>
        <el-checkbox v-if="!isChecked" v-model="checked" size="large" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ item: Object, isChecked: Boolean })
const emit = defineEmits(['addGroupMember'])
const checked = ref(false)
watch(checked, () => {
    emit('addGroupMember', props.item, checked.value)
})
</script>

<style lang="less" scoped>
.friendPart {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .context {
        display: flex;
        align-items: center;

        img {
            width: 40px;
            height: 40px;
            margin-right: 20px;
        }
    }

}
</style>