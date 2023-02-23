<template>
    <div class="home">
        <el-container height="100%">
            <el-aside width="100px">
                <Nav></Nav>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
  
<script setup>
import Nav from '@/components/Nav.vue';
</script>
  
<style lang="less">
.home {
    position: absolute;
    width: 90vw;
    height: 90vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(39, 42, 55);
    border-radius: 15px;
}


</style>
  