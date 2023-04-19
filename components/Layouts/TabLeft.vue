<style scoped>
.popup {
    width: 100vw !important;
    height: 100vh !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.page-left {
    width: 255px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: #363740;
    border-left: #8c8d90 solid 1px;
}
.page-left-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
#app-name {
    color: #ffff;
    padding: 0 12px;
    text-align: center;
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
    cursor: pointer;
    width: 70px;
    height: auto;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 6px 24px 0px,
        rgba(255, 255, 255, 0.2) 0px 0px 0px 3px;
    transition: all 0.2s ease;
}

.logo-img--position {
    width: 45px;
    position: absolute;
    right: 8px;
    top: 12px;
}
.list-features {
    padding: 0;
}

.list-features li {
    position: relative;
    cursor: pointer;
    color: #ffffff;
    display: flex;
    gap: 24px;
    padding: 18px 23px;
    font-size: 22px;
    list-style-type: none;
    font-style: normal;
    letter-spacing: 0.5px;
    line-height: 20px;
    margin-bottom: 1px;
}

.list-features li:hover {
    background: #4c4e5a;
}

.isActive {
    background: #4c4e5a;
    border-left: solid 4px #dde2ff;
    animation: active 0.2s ease-in-out;
}
@keyframes active {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.feature-name {
    cursor: pointer;
    /* Regular/16px */
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    /* identical to box height */
    letter-spacing: 0.2px;
    color: #dde2ff;
}

.collapse-sidebar {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.collapse-sidebar:hover {
    background: #4c4e5a;
}

.to-left-side,
.to-right-side {
    width: 100%;
    display: flex;
    gap: 12px;
    padding: 12px;
}

.to-left-side p {
    color: #ffff;
    letter-spacing: 1px;
}

.to-right-side {
    margin-right: 12px;
    justify-content: flex-end;
}

.isClose {
    transform: translate(-195px);
    transition: all 0.3s ease;
}
.isOpen {
    transform: translate(0);
    transition: all 0.3s ease;
}
.display-none {
    display: none;
}
.feature-icn {
    cursor: pointer;
    transition: all 0.3s ease;
}
.feature-icn--position {
    position: absolute;
    right: 22px;
}
</style>
<template>
    <div
        class="page-left"
        :class="{ isClose: isCloseTab, isOpen: !isCloseTab }"
    >
        <div class="page-left-container">
            <div class="logo-container">
                <img
                    class="logo-img"
                    src="../../static/images/logo-dut.jpg"
                    alt=""
                    @click="$router.push('/home?page=1')"
                />
            </div>
            <h1 id="app-name">
                HỆ THỐNG QUẢN LÝ TÀI SẢN CỐ ĐỊNH TẠI TRƯỜNG ĐẠI HỌC BÁCH KHOA
            </h1>
            <ul class="list-features">
                <li
                    :class="{ isActive: pageParam == '/home' }"
                    @click="$router.push('/home?page=1')"
                >
                    <img
                        class="feature-icn"
                        src="../../static/icons/light.svg"
                        alt=""
                    />
                    <p class="feature-name">Tài sản</p>
                </li>
                <li
                    :class="{ isActive: pageParam == '/disposed_assets' }"
                    @click="$router.push('/disposed_assets?page=1')"
                >
                    <img
                        class="feature-icn"
                        src="../../static/icons/light-off.svg"
                        alt=""
                    />
                    <p class="feature-name">Tài sản đã thanh lý</p>
                </li>
                <li
                    :class="{ isActive: pageParam == '/organizations' }"
                    @click="$router.push('/organizations?page=1')"
                >
                    <img
                        class="feature-icn"
                        src="../../static/icons/building.svg"
                        alt=""
                    />
                    <p class="feature-name">Khoa, phòng ban,...</p>
                </li>
                <li
                    :class="{ isActive: pageParam == '/users' }"
                    @click="$router.push('/users?page=1')"
                    v-show="currentRole == 'admin'"
                >
                    <img
                        class="feature-icn"
                        src="../../static/icons/people-fill.svg"
                        alt=""
                    />
                    <p class="feature-name">Users</p>
                </li>
                <li
                    :class="{ isActive: pageParam == '/statistics' }"
                    @click="$router.push('/statistics')"
                >
                    <img
                        class="feature-icn"
                        src="../../static/icons/pie-chart.svg"
                        alt=""
                    />
                    <p class="feature-name">Thống kê</p>
                </li>
                <li
                    style="border-top: 0.5px solid #dfe0ebb7"
                    @click="showPopup = true"
                >
                    <img
                        class="feature-icn"
                        src="../../static/icons/box-arrow-right.svg"
                        alt=""
                    />
                    <p class="feature-name">Đăng xuất</p>
                </li>
            </ul>
            <div class="collapse-sidebar">
                <span class="to-left-side" @click="checkTab('close')">
                    <img
                        class="chevron-left"
                        src="../../static/icons/chevron-double-left.svg"
                        alt=""
                    />
                    <p>Collapse sidebar</p>
                </span>
                <span
                    class="to-right-side display-none"
                    @click="checkTab('open')"
                >
                    <img
                        src="../../static/icons/chevron-double-right.svg"
                        alt=""
                    />
                </span>
            </div>
        </div>
        <PopUp
            class="popup"
            :type="'warning'"
            :action="'đăng xuất'"
            :object="''"
            v-show="showPopup"
            @closePopup="closePopup"
            @submitForm="submitForm"
        ></PopUp>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCloseTab: false,
            showPopup: false,
            currentRole: '',
        };
    },
    mounted() {
        this.currentRole = localStorage.getItem("currentRole");
    },
    computed: {
        pageParam() {
            return this.$route.path;
        },
    },
    methods: {
        closePopup() {
            this.showPopup = false;
        },
        signOut() {
            try {
                this.$auth.logout();
                this.$router.push('/');
            } catch (error) {
                console.log(error);
            }
        },
        submitForm() {
            this.signOut();
        },
        checkTab(key) {
            const featureIcons = document.querySelectorAll('.feature-icn');
            switch (key) {
                case 'close':
                    this.isCloseTab = true;
                    document
                        .getElementById('app-name')
                        .classList.add('display-none');
                    document
                        .querySelector('.to-left-side')
                        .classList.add('display-none');
                    document
                        .querySelector('.to-right-side')
                        .classList.remove('display-none');
                    document
                        .querySelector('.logo-img')
                        .classList.add('logo-img--position');
                    featureIcons.forEach((icon) =>
                        icon.classList.add('feature-icn--position')
                    );
                    this.$emit('closeTab');
                    break;
                case 'open':
                    this.isCloseTab = false;
                    document
                        .getElementById('app-name')
                        .classList.remove('display-none');
                    document
                        .querySelector('.to-right-side')
                        .classList.add('display-none');
                    document
                        .querySelector('.to-left-side')
                        .classList.remove('display-none');
                    document
                        .querySelector('.logo-img')
                        .classList.remove('logo-img--position');
                    featureIcons.forEach((icon) =>
                        icon.classList.remove('feature-icn--position')
                    );
                    this.$emit('openTab');
                    break;
            }
        },
    },
};
</script>
