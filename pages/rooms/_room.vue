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
            v-if="isShowPopup ==  true"
            @closePopup="closePopup"
            @submitForm="submitForm"
        ></PopUp>
        <CreateRoom
            :type="'update'"
            :roomProp="currentRoom"
            :listOrganizations="listOrganizations"
            v-if="isShowPopup === 'thêm mới'"
            @closePopup="closePopup"
            @submitForm="submitForm"
        >
        </CreateRoom>
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <h1 class="page-main-title">Danh sách phòng</h1>
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
                        :options="listOrganizations"
                        v-model="selectedOption"
                        label="organizationName"
                        placeholder="Chọn hoặc tìm kiếm tổ chức"
                        @input="Search"
                    ></multiselect>
                    <div class="btn-container">
                        <button
                            class="create-btn"
                            @click="showPopup('xuất file', 'bảng dữ liệu')"
                        >
                            Xuất file excel
                        </button>
                        <button
                            class="create-btn"
                            @click="isShowPopup = 'thêm mới'"
                        >
                            Thêm phòng
                        </button>
                    </div>
                </div>
                <div class="table-assets">
                    <span class="table-assets-title div-center">
                        <p class="div-center stt-col">STT</p>
                        <p class="div-center organization-type-col">Mã phòng</p>
                        <p class="div-center organization-name-col">
                            Tên Phòng
                        </p>
                        <p class="div-center show-action-col">Action</p>
                    </span>
                    <div class="empty-icn div-center" v-show="!isHaveContent">
                        <img
                            src="../../static/icons/file-question.svg"
                            alt="file-rong"
                        />
                        <h1 class="empty-err-mess">Không có dữ liệu</h1>
                    </div>
                    <RoomItem
                        v-for="(item, index) in listRooms"
                        :type="'room'"
                        :key="index"
                        :itemProp="item"
                        :itemIndex="index + 1"
                        @showPopup="showPopup"
                        style="width: 100%"
                    ></RoomItem>
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
import RoomItem from '@/components/Room/RoomItem.vue';
import CreateRoom from '@/components/Room/CreateRoom.vue';
export default {
    components: {
        RoomItem,
        CreateRoom,
    },
    data() {
        return {
            listOrganizations: [],
            listRooms: [],
            currentRoom: {},
            meta: [],
            currentPage: 1,
            roomID: {},
            isHaveContent: false,
            isShowPopup: '',
            showNotification: false,
            notiAction: '',
            notiObject: '',
            notiType: '',
            searchValue: '',
            timeoutId: null, // thêm biến timeoutId vào component
            selectedOption: '',
            options: ['Tất cả', 'Khoa', 'Phòng ban', 'Trung tâm'],
        };
    },
    computed: {
        pageParam() {
            return this.$route.query.page;
        },
        pageSearch() {
            return this.$route.query.search;
        },
        pageOrganization() {
            return this.$route.query.organization_id;
        },
    },
    mounted() {
        this.searchValue = this.pageSearch;
        this.organizationID = this.pageOrganization;
        if (this.pageOrganization != undefined) {
            this.fetchDetailOrganization();
        }
        this.refreshData();
        this.fetchListOrganization();
    },
    watch: {
        pageParam: async function () {
            this.refreshData();
        },
        listRooms: {
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
            console.log(this.searchValue);
            console.log(this.organizationID);
            if (
                this.searchValue !== undefined ||
                this.organizationID !== undefined
            ) {
                this.Search();
            } else {
                this.fetchData();
            }
        },
        async downloadFile() {
            const { selectedOption, searchValue, organizationID } = this;
            let apiURL = `/rooms?pageNumber=1&pageSize=10&isConvert=true`;
            if (selectedOption) {
                apiURL += `&organization_id=${selectedOption.organizationID}`;
            }
            if (selectedOption === '' && organizationID) {
                apiURL += `&organization_id=${organizationID}`;
            }
            if (searchValue) {
                apiURL += `&searchQuery=${searchValue}`;
            }
            try {
                const response = await this.$axios({
                    method: 'get',
                    url: apiURL,
                    responseType: 'blob', // yêu cầu Axios trả về dữ liệu dạng blob (binary large object)
                });
                // Tạo đường dẫn đến tệp được tải xuống
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                // Tạo một thẻ a để kích hoạt tải xuống tệp
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'SoTheoDoiPhong.xlsx');
                document.body.appendChild(link);
                link.click();
                // Xóa đối tượng thẻ a để tránh hiển thị thừa trên trang
                document.body.removeChild(link);
                this.notiAction = 'Export';
                this.notiObject = 'file';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
            } catch (error) {
                this.notiAction = 'Export';
                this.notiObject = 'file';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
            }
        },
        async fetchData() {
            try {
                const response = await this.$axios.get(
                    `/rooms?pageNumber=${this.currentPage}&pageSize=10`
                );
                this.listRooms = response.data.data;
                this.meta = response.data.meta;
                console.log(this.meta);
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
            this.currentPage = this.pageParam;
            try {
                const {
                    currentPage,
                    selectedOption,
                    searchValue,
                    organizationID,
                } = this;
                let url = `/rooms?pageNumber=${currentPage}&pageSize=10`;
                if (selectedOption) {
                    url += `&organization_id=${selectedOption.organizationID}`;
                }
                if (selectedOption === '' && organizationID) {
                    url += `&organization_id=${organizationID}`;
                }
                if (searchValue) {
                    url += `&searchQuery=${searchValue}`;
                }
                const {
                    data: { data, meta },
                } = await this.$axios.get(url);
                this.listRooms = data;
                this.meta = meta;
                console.log(this.listRooms);
                // Lưu trạng thái của selectedOption và searchValue vào URL của trang web
                const query = {};
                if (selectedOption) {
                    query.organization_id = selectedOption.organizationID;
                }
                if (selectedOption === '') {
                    query.organization_id = organizationID;
                }
                if (searchValue) {
                    query.search = searchValue;
                }
                this.$router.push({
                    path: `/rooms?page=${currentPage}`,
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
        async addRoom(room) {
            try {
                await this.$axios.post(`/rooms`, {
                    roomID: room.roomID,
                    roomName: room.roomName,
                    organizationID: room.organizationID.organizationID,
                });
                this.fetchData();
                this.notiAction = 'Thêm mới';
                this.notiObject = 'tổ chức';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
            } catch (error) {
                this.notiAction = 'Thêm mới';
                this.notiObject = 'tổ chức';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                console.log(error);
            }
        },
        async updateRoom(room) {
            try {
                await this.$axios.put(`/rooms/${room.roomID}`, {
                    roomID: room.roomID,
                    roomName: room.roomName,
                    organizationID: room.organizationID.organizationID,
                });
                this.fetchData();
                this.notiAction = 'Cập nhật';
                this.notiObject = 'phòng';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
            } catch (error) {
                this.notiAction = 'Cập nhật';
                this.notiObject = 'phòng';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                console.log(error);
            }
        },
        async deleteAsset() {
            try {
                await this.$axios.delete(`/rooms/${this.roomID}`);
                this.notiAction = 'Xóa';
                this.notiObject = 'phòng';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                this.fetchData();
            } catch (error) {
                this.notiAction = 'Xóa';
                this.notiObject = 'phòng';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                console.log(error);
            }
        },
        async disposeAsset() {
            try {
                await this.$axios.post(`/rooms/${this.roomID}`);
                this.notiAction = 'Thanh lý';
                this.notiObject = 'phòng';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                this.fetchData();
            } catch (error) {
                this.notiAction = 'Thanh lý';
                this.notiObject = 'phòng';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                console.log(error);
            }
        },
        async fetchListOrganization() {
            try {
                const response = await this.$axios.get(`/organizations`);
                this.listOrganizations = response.data.data;
                console.log(this.listOrganizations);
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
        async fetchDetailOrganization() {
            try {
                await this.$axios
                    .get(`/organizations/${this.organizationID}`)
                    .then((res) => {
                        this.selectedOption = res['data']['data'];
                        console.log(this.selectedOption);
                    });
            } catch (error) {
                this.setNotification('Tải', 'dữ liệu', 'thất bại');
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                console.log(error);
            }
        },
        async fetchDetail(id) {
            try {
                await this.$axios.get(`/rooms/${id}`).then((res) => {
                    this.currentRoom = res['data']['data'];
                    console.log(this.currentRoom);
                });
            } catch (error) {
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
                this.roomID = id;
                console.log(id);
            }
            this.notiAction = action;
        },
        submitForm(action, room) {
            console.log(action);
            this.isShowPopup = false;
            if (action === 'xóa') {
                this.deleteAsset();
            } else if (action === 'thanh lý') {
                this.disposeAsset();
            } else if (action === 'thêm mới') {
                if (room.roomID) {
                    this.updateRoom(room);
                } else {
                    this.addRoom(room);
                }
            } else {
                this.downloadFile();
            }
        },
        closePopup() {
            this.isShowPopup = '';
            this.currentRoom = {};
        },
        goToIndexPage() {
            const query = {};
            query.page = this.currentPage;
            if (this.selectedOption) {
                query.status = this.selectedOption;
            }
            if (this.searchValue) {
                query.search = this.searchValue;
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
<style scoped>
.multiselect {
    width: 320px;
}
</style>
