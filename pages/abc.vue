<template>
    <div class="container">
        <h1>this is abc page</h1>
        <nuxt-link to="/">back to index</nuxt-link>
        <h3>Name is {{ name }}</h3>
        <red :countProps="count" @changeName_component="changeName"></red>
        <div v-for="item in listAssets" :key="item">
          <p v-for="index in item" :key="index.id">{{ index }}</p>
        </div>
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
            listAssets: [],
        }
    },
    mounted () {
      this.fetchData();
    },
    methods: {
        changeName(tmp) {
            this.name = 'Tuan Anh';
            this.count = tmp;
        },
        async fetchData(){
          try {
            await this.$axios.get('https://localhost:7011/api/Asset').then(res => {
              this.listAssets = res['data'];
            });
          } catch (error) {
            console.log(error);
          }
        }
    },
}
</script>

<style scoped>

</style>
