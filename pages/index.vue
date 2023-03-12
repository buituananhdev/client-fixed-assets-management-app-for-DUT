<style scoped>
.page-login {
    width: 100%;
    height: 99.6vh;
}
.background-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(30%);
    filter: blur(1px);
}
.container {
    flex-direction: column;
    gap: 32px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 32px 60px;
    padding-bottom: 86px;
    border-radius: 8px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
.app-name {
    font-weight: 600;
    font-size: 20px;
}
.login-form {
    flex-direction: column;
    gap: 20px;
}

input {
    width: 430px;
    height: 36px;
    padding: 0.5rem 0.75rem;
    line-height: 1rem;
    font-size: 16px;
    box-shadow: inset 0 0 0 1px #89888d;
    border-style: none;
    border: solid 1px #dfe0eb;
    border-radius: 4px;
}
input:focus {
    outline-color: #008cde;
}
.user-name-container,
.password-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 6px;
}
.logo-container {
    position: relative;
    width: 100%;
    height: 90px;
    padding-top: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-img {
    width: 70px;
    height: auto;
    box-shadow: rgba(255, 230, 0, 0.1) 0px 6px 24px 0px,
        rgba(255, 251, 0, 0.1) 0px 0px 0px 3px;
    transition: all 0.2s ease;
}
.input-describe {
    font-size: 15px;
    font-weight: 600;
}
.submit-btn {
    width: 430px;
    height: 36px;
    margin-top: 24px;
    padding: 0.5rem 0.75rem;
    color: #ffff;
    font-weight: 600;
    background: #008cde;
    border: solid 1px #0085d1;
    border-radius: 4px;
    cursor: pointer;
}
.submit-btn:hover {
    background: #0085d1;
}
</style>

<template>
    <div class="page-login">
        <img
            class="background-img"
            src="../static/images/login-bg.jpg"
            alt=""
        />
        <div class="container div-center">
            <div class="logo-container">
                <img
                    class="logo-img"
                    src="../static/images/logo-dut.jpg"
                    alt=""
                />
            </div>
            <p class="app-name">DUT | Assets Management</p>
            <form class="login-form div-center" @submit.prevent="login">
                <div class="user-name-container">
                    <label for="username" class="input-describe"
                        >Username <small style="color: red;font-size: 16px;">*</small></label
                    >
                    <input type="text" id="username" v-model="username" />
                </div>
                <div class="password-container">
                    <label for="password" class="input-describe"
                        >Password <small style="color: red;font-size: 16px;">*</small></label
                    >
                    <input type="password" id="password" v-model="password" />
                </div>
                <button class="submit-btn" type="submit">Sign in</button>
            </form>
        </div>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
export default {
    components: {
        Footer,
    },
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
                })
                this.$router.push(`/home?page=1`);
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
