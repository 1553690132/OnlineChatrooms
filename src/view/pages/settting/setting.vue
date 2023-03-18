<template>
    <div class="setting">
        <div class="setting-header">
            <h2>设置中心</h2>
        </div>
        <div class="setting-body">
            <systemSetting></systemSetting>
        </div>
    </div>
</template>

<script setup>
import systemSetting from './systemSetting.vue';
</script>

<style lang="less" scoped>
.setting {
    .setting-header {
        padding-bottom: 20px;

        h2 {
            color: #fff;
        }

        border-bottom: 1px solid #d7d7d7;
    }
       
}
</style>