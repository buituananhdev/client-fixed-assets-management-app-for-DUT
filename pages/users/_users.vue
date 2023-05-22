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
        <!-- <CreateUser
            :type="'update'"
            :assetProp="currentUser"
            v-show="isShowPopup == 'thêm mới'"
            @closePopup="closePopup"
            @submitForm="submitForm"
        >
        </CreateUser> -->
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <h1 class="page-main-title">Danh sách tài khoản</h1>
                <div class="action-container">
                    <div class="search">
                        <input
                            type="text"
                            class="inp-search"
                            placeholder="Tìm kiếm..."
                            v-model="searchValue"
                            @input="onSearchInput"
                        />
                        <img
                            class="icn-search"
                            src="../../static/icons/search.svg"
                            alt=""
                        />
                    </div>
                    <multiselect
                        class="multiselect"
                        :options="listPermission"
                        v-model="permission"
                        placeholder="Chọn hoặc tìm kiếm chức vụ"
                        @input="Search"
                    ></multiselect>
                    <div class="btn-container">
                        <button
                            class="create-btn"
                            @click="isShowPopup = 'thêm mới'"
                        >
                            Thêm tài khoản
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
                    <UserItem
                        v-for="(item, index) in listUsers"
                        :type="'room'"
                        :key="index"
                        :itemProp="item"
                        :itemIndex="index + 1"
                        @showPopup="showPopup"
                        style="width: 100%"
                    ></UserItem>
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
import CreateUser from '@/components/Users/CreateUser.vue';
import UserItem from '@/components/Users/UserItem.vue';
export default {
    components: {
        UserItem,
        CreateUser,
    },
    data() {
        return {
            UserID: '',
            searchValue: '',
            listUsers: [],
            meta: [],
            currentPage: 1,
            isHaveContent: false,
            isShowPopup: false,
            showNotification: false,
            notiAction: '',
            notiObject: '',
            notiType: '',
            permission: '',
            listPermission: ['Quản trị viên', 'Nhân viên'],
            currentUser: {},
        };
    },
    computed: {
        pageParam() {
            return this.$route.query.page;
        },
        pageSearch() {
            return this.$route.query.search;
        },
        pagePermission() {
            return this.$route.query.permission;
        },
    },
    mounted() {
        this.permission = this.pagePermission;
        this.searchValue = this.pageSearch;
        this.refreshData();
    },
    watch: {
        pageParam: async function () {
            this.refreshData();
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
        refreshData() {
            if (this.searchValue !== '' || this.permission !== '') {
                this.Search();
            } else {
                this.fetchData();
            }
        },
        async fetchData() {
            try {
                const response = await this.$axios.get(
                    `/users?pageNumber=${this.currentPage}&pageSize=10`
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
        async Search() {
            console.log('search');
            this.currentPage = this.pageParam;
            try {
                const { currentPage, permission, searchValue } = this;
                let url = `/users?pageNumber=${currentPage}&pageSize=10`;
                if (permission && permission != '') {
                    url += `&permission=${permission}`;
                }
                if (searchValue) {
                    url += `&searchQuery=${searchValue}`;
                }
                const {
                    data: { data, meta },
                } = await this.$axios.get(url);
                this.listUsers = data;
                this.meta = meta;
                console.log(this.listUsers);
                // Lưu trạng thái của permission và searchValue vào URL của trang web
                const query = {};
                if (permission != '') {
                    query.permission = permission;
                }
                if (searchValue) {
                    query.search = searchValue;
                }
                this.$router.push({
                    path: `/users?page=${currentPage}`,
                    query,
                });
            } catch (error) {
                console.error(error);
                this.notiAction = 'Tải';
                this.notiObject = 'dữ liệu';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
            }
        },
        // debounce
        onSearchInput() {
            clearTimeout(this.timeoutId); // xóa bỏ setTimeout() trước đó (nếu có)
            this.timeoutId = setTimeout(() => {
                this.Search();
            }, 700); // tạo mới setTimeout() với thời gian chờ là 700ms
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
                await this.$axios.delete(`/users/${this.UserID}`);
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
                this.notiObject = object;
                this.isShowPopup = true;
                this.UserID = id;
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
            if (this.permission) {
                query.status = this.permission;
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
<style></style>
