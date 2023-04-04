<style scoped>
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
    display: flex;
    align-items: center;
    width: 430px;
    height: 40px;
    padding: 0.5rem 0.75rem;
    line-height: 1rem;
    font-size: 16px;
    box-shadow: inset 0 0 0 1px #89888d;
    border-style: none;

    border-radius: 4px;
}
input:focus {
    outline-color: #363740;
}
.user-name-container,
.password-container {
    position: relative;
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
    box-shadow: #3c3d470d 0px 6px 24px 0px, #3c3d4709 0px 0px 0px 3px;
    transition: all 0.2s ease;
}
.input-describe {
    font-size: 15px;
    font-weight: 600;
}
.submit-btn {
    width: 430px;
    height: 40px;
    margin-top: 24px;
    font-size: 16px;
    padding: 0.5rem 0.75rem;
    color: #ffff;
    font-weight: 600;
    background: #363740;
    border: solid 1px #363740;
    border-radius: 4px;
    cursor: pointer;
}
.submit-btn:hover {
    background: #3c3d47;
}
.eye-icn {
    width: 16px;
    position: absolute;
    right: 20px;
    top: 37px;
    cursor: pointer;
}
.err {
    width: 100%;
    padding-left: 60px;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    bottom: 140px;
    color: #ff4433;
}
</style>

<template>
    <div class="page-login">
        <Notification
            :type="'failure'"
            :content="'Đăng nhập thất bại!'"
            v-if="showNoti"
        ></Notification>
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
                        >Username
                        <small style="color: red; font-size: 16px"
                            >*</small
                        ></label
                    >
                    <input
                        type="text"
                        id="username"
                        v-model="username"
                        autocomplete="on"
                    />
                </div>
                <div class="password-container">
                    <label for="password" class="input-describe"
                        >Password
                        <small style="color: red; font-size: 16px"
                            >*</small
                        ></label
                    >
                    <input
                        type="password"
                        id="password"
                        v-show="!isShowPass"
                        v-model="password"
                        autocomplete="on"
                    />
                    <input
                        type="text"
                        id="password"
                        v-show="isShowPass"
                        v-model="password"
                        autocomplete="on"
                    />
                    <img
                        class="eye-icn"
                        v-show="isShowPass"
                        src="../static/icons/eye-slash.svg"
                        alt=""
                        @click="isShowPass = !isShowPass"
                    />
                    <img
                        class="eye-icn"
                        v-show="!isShowPass"
                        src="../static/icons/eye.svg"
                        alt=""
                        @click="isShowPass = !isShowPass"
                    />
                </div>
                <div class="err">
                    {{ errContent }}
                </div>
                <button class="submit-btn" type="submit">Sign in</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            isShowPass: false,
            errContent: '',
            showNoti: false,
        };
    },
    watch: {
        username(newVal) {
            this.errContent = '';
        },
        password(newVal) {
            this.errContent = '';
        },
    },
    methods: {
        async login() {
            try {
                await this.$auth
                    .loginWith('local', {
                        data: {
                            username: this.username,
                            password: this.password,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        localStorage.setItem(
                            'currentRole',
                            res['data']['role']
                        );
                        localStorage.setItem(
                            'currentUser',
                            res['data']['username']
                        );
                        this.$router.push('/home?page=1');
                    });
            } catch (error) {
                this.$handleErrorApi(error, (message) => {
                    this.errContent = message;
                });
                this.showNoti = true;
                setTimeout(() => {
                    this.showNoti = false;
                }, 3000);
                console.error('LOG ----------> ' + this.errContent);
            }
        },
    },
    
};
</script>
