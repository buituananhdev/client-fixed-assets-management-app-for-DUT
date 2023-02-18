<template>
  <div>
    <h1>Đăng nhập</h1>
    <form @submit.prevent="login">
      <label for="username">username:</label>
      <input type="text" id="username" v-model="username">

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password">

      <button type="submit">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    // async Login() {
    //   try {
    //     await this.$auth.loginWith('local', { data: { username: this.username, password: this.password } })
    //     const token = this.$auth.getToken('local')
    //     this.$axios.setToken(token, 'Bearer')
    //     // sử dụng dữ liệu lấy được
    //     this.$router.push('/abc');
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    async login() {
      try {
				await this.$auth.loginWith('local', {
					data: {
            username: this.username,
            password: this.password,
          }
				})
        this.$router.push('/abc');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
