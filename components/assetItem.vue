<template>
<div class="main">
    <div style="width: 100%;" v-for="item in itemProp" :key="item.id">
        <p class="item-property">{{ item }}</p>
    </div>
</div>
</template>

<script>
export default {
    props: ['itemProp'],
    methods: {
        check() {
            
        }
    },
}
</script>

<style scoped>
.main{
    width: 100%;
    display: flex;
    gap: 20px;
    background: red;
}
.item-property{
    width: 100%;
}
</style>