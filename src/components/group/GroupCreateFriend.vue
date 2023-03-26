<template>
    <div class="friendPart">
        <div class="context">
            <img :src="item.headImg" alt="avatar">
            <span class="nickname">{{ item.nickname }}({{ item.username }})</span>
        </div>
        <el-checkbox v-if="!isChecked && !invite" v-model="checked" size="large" />
        <el-checkbox v-else-if="invite" v-model="inviteChecked" size="large" :disabled="disabled" />
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUpdated } from 'vue'
import { chatWindowStore } from '@/store/chatWindowStore';
const windowStore = chatWindowStore()
const props = defineProps({ item: Object, isChecked: Boolean, invite: Boolean, member_msg: Array })
const emit = defineEmits(['addGroupMember'])
const checked = ref(false), inviteChecked = ref(false)
watch(checked, () => {
    emit('addGroupMember', props.item, checked.value)
})
watch(inviteChecked, () => {
    emit('addGroupMember', props.item, inviteChecked.value)
})
onMounted(() => {
    changeCheck()
})
onUpdated(() => {
    changeCheck()
})
const changeCheck = () => {
    if (props.member_msg !== undefined) {
        props.member_msg.forEach(e => {
            if (props.item.username === e.username) {
                checked.value = true
                inviteChecked.value = true
            }
        })
    }
}
const disabled = computed(() => {
    if (windowStore.chatWindowInfo.groupMembers) return windowStore.chatWindowInfo.groupMembers.indexOf(props.item.username) !== -1
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