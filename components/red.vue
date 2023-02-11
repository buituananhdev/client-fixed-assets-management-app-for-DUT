<template>
    <div class="container">
        <h1>this is red component</h1>
        <h3>Count = {{ countProps }}</h3>
        <button @click="changeName">Click to change name</button>
    </div>
</template>

<script>
export default {
    props: ['countProps'],
    data(){
        return {
            count: 3,
        }
    },
    methods: {
        changeName() {
            this.$emit('changeName_component', this.count);
        }
    },
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 30%;
    background-color: red;
}
</style>