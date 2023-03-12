<template>
    <div class="container">
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content"></div>
    </div>
</template>

<script>
import TabLeft from '@/components/TabLeft.vue';
import assetItem from '@/components/assetItem.vue';
import Header from '@/components/Header.vue';
export default {
    components: {
        TabLeft,
        assetItem,
        Header,
    },
};
</script>

<style></style>
