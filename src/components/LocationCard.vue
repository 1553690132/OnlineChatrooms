<template>
    <div class="location-card">
        <div class="location-card-wrapper">
            <div class="location-pic"><img src="@/assets/img/location.png" alt="address"></div>
            <div class="location-title">
                {{ locName }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const locName = ref(sessionStorage.getItem('address'))
</script>

<style lang="less" scoped>
.location-card {
    background-color: rgb(45, 48, 63);
    width: 280px;
    height: 110px;
    padding: 10px;
    border-radius: 20px;
    box-sizing: border-box;
    cursor: pointer;
    margin: 0 20px;

    &:hover {
        background-color: rgb(33, 36, 54);
    }

    .location-card-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .location-title {
            color: #fff;
            font-family: serif;
        }

        .location-pic {
            img {
                max-width: 100px;
                max-height: 100px;
            }
        }
    }
}
</style>