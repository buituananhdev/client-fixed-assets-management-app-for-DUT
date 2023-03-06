<template>
<div class="main">

    <div v-for="item in itemProp" :key="item.id">
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
    display: flex;
    gap: 20px;
}
.item-property{
    width: 140px;
}
</style>