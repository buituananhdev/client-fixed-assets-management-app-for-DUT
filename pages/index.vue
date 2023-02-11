<template>
  <div class="container">
    <h1>This is index page</h1>
    <nuxt-link to="/abc">click to abc</nuxt-link>
    <p v-for="item in todos" :key="item.id">
      {{ item }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'IndexPage',
  data(){
    return{
      todos: [],
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      //http://jsonplaceholder.typicode.com/todos
      try {
        await this.$axios.$get('http://jsonplaceholder.typicode.com/todos').then(res => {
          this.todos = res;
          //alert("aaaa");
        });
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>

</style>
