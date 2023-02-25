<template>
    <div class="fileCard">
        <img src="@/assets/img/fileImg/unknowfile.png" alt="unknowFile" v-if="fileType == 0" />
        <img src="@/assets/img/fileImg/word.png" alt="word" v-else-if="fileType == 1" />
        <img src="@/assets/img/fileImg/excel.png" alt="excel" v-else-if="fileType == 2" />
        <img src="@/assets/img/fileImg/ppt.png" alt="ppt" v-else-if="fileType == 3" />
        <img src="@/assets/img/fileImg/pdf.png" alt="pdf" v-else-if="fileType == 4" />
        <img src="@/assets/img/fileImg/zpi.png" alt="zpi" v-else-if="fileType == 5" />
        <img src="@/assets/img/fileImg/txt.png" alt="txt" v-else />
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    fileType: Number
})
</script>

<style></style>