<template>
    <div class="main">
        <TabLeft></TabLeft>
        <div class="page-main">
            <h1>this sdfdsfdsfdsfsdfsdfsdfsdfsdfsdfsdfis test</h1>
        </div>
    </div>
</template>

<script>
import TabLeft from '@/components/TabLeft.vue';
export default {
    components: {
        TabLeft,
    },
};
</script>

<style  scoped>
.page-main{
    position: absolute;
    right: 0;
    width: calc(100% - 255px);
}
</style>
