<template>
    <div class="container">
        <h1>this is abc page</h1>
        <nuxt-link to="/">back to index</nuxt-link>
        <h3>Name is {{ name }}</h3>
        <red :countProps="count" @changeName_component="changeName"></red>
    </div>
</template>

<script>
import red from '@/components/red.vue';
export default {
    components: {
        red,
    },
    data () {
        return {
            count: 10,
            name: "Nhan",
        }
    },
    methods: {
        changeName(tmp) {
            this.name = 'Tuan Anh';
            this.count = tmp;
        }
    },
}
</script>

<style scoped>

</style>