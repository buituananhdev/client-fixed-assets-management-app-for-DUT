<template>
    <div class="container">
        <Notification
            :type="notiType"
            :object="notiObject"
            :action="notiAction"
            v-if="showNotification"
        ></Notification>
        <PopUp
            class="popup"
            :type="'warning'"
            :action="notiAction"
            :object="notiObject"
            v-show="isShowPopup"
            @closePopup="closePopup"
            @submitForm="submitForm"
        ></PopUp>
        <CreateUser
            :type="'update'"
            :assetProp="currentUser"
            v-show="isShowPopup == 'thêm mới'"
            @closePopup="closePopup"
            @submitForm="submitForm"
        >
        </CreateUser>
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <h1 class="page-main-title">Danh sách người dùng</h1>
                <div class="action-container">
                    <div class="btn-container">
                        <button
                            class="create-btn"
                            @click="isShowPopup = 'thêm mới'"
                        >
                            Thêm người dùng
                        </button>
                    </div>
                </div>
                    
                <div class="table-assets">
                    <span class="table-assets-title div-center">
                        <p class="div-center stt-user-col">STT</p>
                        <p class="div-center account-col">Tên đăng nhập</p>
                        <p class="div-center name-user-col">Họ và tên</p>
                        <p class="div-center roll-col">Chức vụ</p>
                        <p class="div-center show-action-user-col">Action</p>
                    </span>
                    <div class="empty-icn div-center" v-show="!isHaveContent">
                        <img
                            src="../../static/icons/file-question.svg"
                            alt="file-rong"
                        />
                        <h1 class="empty-err-mess">Không có dữ liệu</h1>
                    </div>
                    
                </div>
                <div class="pagination">
                    <div
                        class="pagination-content div-center"
                        v-show="isHaveContent"
                    >
                        <span class="total-page div-center"
                            >Total page: {{ meta.totalPages }}</span
                        >
                        <span class="pagination-btn div-center">
                            <img
                                v-show="meta.hasPreviousPage"
                                style="cursor: pointer"
                                src="../../static/icons/chevron-left.svg"
                                alt=""
                                @click="goToPrevPage()"
                            />
                            <p
                                v-show="meta.currentPage >= 3"
                                style="cursor: context-menu"
                            >
                                ...
                            </p>
                            <p
                                v-show="meta.hasPreviousPage"
                                @click="goToPrevPage()"
                            >
                                {{ meta.currentPage - 1 }}
                            </p>
                            <p class="active-page">{{ meta.currentPage }}</p>
                            <p
                                v-show="meta.hasNextPage"
                                @click="goToNextPage()"
                            >
                                {{ meta.currentPage + 1 }}
                            </p>
                            <p
                                v-show="meta.currentPage + 1 < meta.totalPages"
                                style="cursor: context-menu"
                            >
                                ...
                            </p>
                            <img
                                v-show="meta.hasNextPage"
                                style="cursor: pointer"
                                src="../../static/icons/chevron-right.svg"
                                alt=""
                                @click="goToNextPage()"
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listUsers: [],
            meta: [],
            currentPage: 1,
            isHaveContent: false,
            isShowPopup: false,
            showNotification: false,
            notiAction: '',
            notiObject: '',
            notiType: '',
            selectedOption: '',
            currentUser: {},
        };
    },
    computed: {
        pageParam() {
            return this.$route.query.page;
        },
    },
    mounted() {
        this.fetchData();
    },
    watch: {
        pageParam: async function () {
            this.fetchData();
        },
        listUsers: {
            deep: true,
            immediate: true,
            handler(newVal) {
                if (newVal.length > 0) {
                    this.isHaveContent = true;
                } else {
                    this.isHaveContent = false;
                }
            },
        },
    },
    methods: {
        async fetchData() {
            try {
                const response = await this.$axios.get(
                    `/user?pageNumber=${this.currentPage}&pageSize=10`
                );
                this.listUsers = response.data.data;
                this.meta = response.data.meta;
                console.log(this.listUsers);
            } catch (error) {
                console.log(error);
                this.notiAction = 'Tải';
                this.notiObject = 'dữ liệu';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
            }
        },
        async addUser(user) {
            try {
                await this.$axios.post(`/user`, {
                    userID: user.userID,
                    username: user.username,
                    password: user.password,
                    fullName: user.fullName,
                    userRole: user.userRole,
                });
                this.fetchData();
                this.notiAction = 'Thêm mới';
                this.notiObject = 'user';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
            } catch (error) {
                this.notiAction = 'Thêm mới';
                this.notiObject = 'user';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                console.log(error);
            }
        },
        async deleteUser() {
            try {
                await this.$axios.delete(`/user/${this.UserID}`);
                this.notiAction = 'Xóa';
                this.notiObject = 'người dùng';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                this.fetchData();
            } catch (error) {
                this.notiAction = 'Xóa';
                this.notiObject = 'người dùng';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                console.log(error);
            }
        },
        async updateUser(user) {
            try {
                await this.$axios.put(`/user/${asset.assetID}`, {
                    userID: user.userID,
                    username: user.username,
                    password: user.password,
                    fullName: user.fullName,
                    userRole: user.userRole,
                });
                this.fetchData();
                this.notiAction = 'Cập nhật';
                this.notiObject = 'user';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
            } catch (error) {
                this.notiAction = 'Cập nhật';
                this.notiObject = 'user';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                console.log(error);
            }
        },
        closeTab() {
            document
                .querySelector('.main-content')
                .classList.add('close-collapse');
            document
                .querySelector('.main-content')
                .classList.remove('open-collapse');
            document.querySelector('.page-top').classList.add('close-collapse');
            document
                .querySelector('.page-top')
                .classList.remove('open-collapse');
        },
        openTab() {
            document
                .querySelector('.main-content')
                .classList.add('open-collapse');
            document
                .querySelector('.main-content')
                .classList.remove('close-collapse');
            document.querySelector('.page-top').classList.add('open-collapse');
            document
                .querySelector('.page-top')
                .classList.remove('close-collapse');
        },
        showPopup(action, object, id) {
            if (action == 'thêm mới') {
                this.fetchDetail(id);
                this.isShowPopup = action;
            } else if (action == 'xuất file') {
                this.notiObject = object;
                this.isShowPopup = true;
            } else {
                this.isShowPopup = true;
                this.assetID = id;
                console.log(id);
            }
            this.notiAction = action;
        },
        submitForm(action, user) {
            console.log(action);
            console.log(user);
            this.isShowPopup = false;
            if (action === 'xóa') {
                this.deleteUser();
            } else if (action === 'thêm mới') {
                if (!user.userID) {
                    this.addUser(user);
                } else {
                    this.updateUser(user);
                }
            } else {
                this.downloadFile();
            }
        },
        closePopup() {
            this.isShowPopup = '';
            this.currentUser = {};
        },
        goToIndexPage() {
            const query = {};
            query.page = this.currentPage;
            if (this.selectedOption) {
                query.status = this.selectedOption;
            }
            this.$router.push({
                query: query,
            });
        },
        goToNextPage() {
            this.goToIndexPage(this.currentPage++);
        },
        goToPrevPage() {
            this.goToIndexPage(this.currentPage--);
        },
    },
};
</script>

<style scoped src="../../static/css/table_assets.css"></style>
<style>

</style>
