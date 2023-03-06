<template>
    <div>
        <h1>Đăng nhập</h1>
        <form @submit.prevent="login">
            <label for="username">username:</label>
            <input type="text" id="username" v-model="username" />

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" />

            <button type="submit">Đăng nhập</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                await this.$auth.loginWith('local', {
                    data: {
                        username: this.username,
                        password: this.password,
                    },
                });
                this.$router.push('/home');
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
