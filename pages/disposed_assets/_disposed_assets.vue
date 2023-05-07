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
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <h1 class="page-main-title">Danh sách tài sản</h1>
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
                        :options="options"
                        v-model="selectedOption"
                        placeholder="Trạng thái của tài sản"
                        @input="Search"
                    ></multiselect>
                    <div class="date-search">
                        <date-picker
                            class="inp-search"
                            placeholder="Ngày bắt đầu"
                            :max="endDate"
                            @input="Search"
                            v-model="startDate"
                        ></date-picker>
                    </div>
                    <div class="date-search">
                        <date-picker
                            class="inp-search"
                            placeholder="Ngày kết thúc"
                            :min="startDate"
                            @input="Search"
                            v-model="endDate"
                        ></date-picker>
                    </div>
                    <div class="btn-container">
                        <button
                            class="create-btn"
                            @click="showPopup('xuất file', 'bảng dữ liệu')"
                        >
                            Xuất file excel
                        </button>
                    </div>
                    <!-- <button class="btn-search" @click="Search">Search</button> -->
                </div>
                <div class="table-assets">
                    <span class="table-assets-title div-center">
                        <p class="div-center stt-col">STT</p>
                        <p class="div-center device-id-col">Mã số TB</p>
                        <p class="div-center name-col">
                            Tên tài sản cố định, CC, DC và đồ gỗ ...
                        </p>
                        <p class="div-center year-used-col">Năm sử dụng</p>
                        <p class="div-center quantity-col">Số lượng</p>
                        <p class="div-center cost-col">Thành tiền</p>
                        <p class="div-center status-col">Ngày thanh lý</p>
                        <p class="div-center show-action-col">Action</p>
                    </span>
                    <div class="empty-icn div-center" v-show="!isHaveContent">
                        <img
                            src="../../static/icons/file-question.svg"
                            alt="file-rong"
                        />
                        <h1 class="empty-err-mess">Không có dữ liệu</h1>
                    </div>
                    <AssetItem
                        v-for="(item, index) in listAssets"
                        :type="'disposed'"
                        :key="index"
                        :itemProp="item"
                        :itemIndex="index + 1"
                        @showPopup="showPopup"
                        style="width: 100%"
                    ></AssetItem>
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
import AssetItem from '@/components/Asset/AssetItem.vue';

export default {
    components: {
        AssetItem,
    },
    data() {
        return {
            listAssets: [],
            meta: [],
            currentPage: 1,
            assetID: '',
            isHaveContent: false,
            showNotification: '',
            notiAction: '',
            notiObject: '',
            notiType: '',
            isShowPopup: false,
            searchValue: '',
            startDate: null,
            endDate: null,
            selectedOption: '',
            options: [
                'Tất cả',
                'Hoạt động tốt',
                'Hư hỏng, cần được sửa chữa',
                'Đang bảo dưỡng',
            ],
        };
    },
    computed: {
        pageParam() {
            return this.$route.query.page;
        },
        startDateParam() {
            return this.$route.query.startDate;
        },
        endDateParam() {
            return this.$route.query.endDate;
        },
        searchParam() {
            return this.$route.query.search;
        },
    },
    mounted() {
        this.searchValue = this.searchParam;
        this.startDate = this.startDateParam;
        this.endDate = this.endDateParam;
        this.refreshData();
    },
    watch: {
        pageParam: async function () {
            this.refreshData();
        },
        listAssets: {
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
            if (this.searchValue || this.startDate || this.endDate) {
                this.Search();
            } else {
                this.fetchData();
            }
        },
        test() {
            console.log('aaaaaaaaaa');
            console.log(this.startDate);
            console.log(this.endDate);
        },
        async downloadFile() {
            try {
                const apiURL =
                    '/disposed_assets?pageNumber=1&pageSize=10&isConvert=true'; // đường dẫn tới API download file
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
                link.setAttribute('download', 'SoTheoDoiTSCD.xlsx');
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
            this.currentPage = this.pageParam;
            try {
                await this.$axios
                    .get(
                        `/disposed_assets?pageNumber=${this.currentPage}&pageSize=10`
                    )
                    .then((res) => {
                        this.listAssets = res['data']['data'];
                        this.meta = res['data']['meta'];
                        console.log(this.listAssets);
                    });
            } catch (error) {
                this.notiAction = 'Tải';
                this.notiObject = 'dữ liệu';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                console.log(error);
            }
        },
        async Search() {
            this.currentPage = this.pageParam;
            try {
                const { currentPage, searchValue, startDate, endDate } = this;
                const url = `/disposed_assets?pageNumber=${currentPage}&pageSize=10${
                    startDate ? `&startDate=${startDate}` : ''
                }${endDate ? `&endDate=${endDate}` : ''}${
                    searchValue ? `&searchQuery=${searchValue}` : ''
                }`;
                const {
                    data: { data, meta },
                } = await this.$axios.get(url);
                this.listAssets = data;
                this.meta = meta;
                console.log(this.listAssets);
                // Lưu trạng thái của selectedOption và searchValue vào URL của trang web
                const query = {};
                if (startDate) {
                    query.startDate = startDate;
                }
                if (endDate) {
                    query.endDate = endDate;
                }
                if (searchValue) {
                    query.search = searchValue;
                }
                this.$router.push({ path: '/disposed_assets?page=1', query });
            } catch (error) {
                this.notiAction = 'Tải';
                this.notiObject = 'dữ liệu';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                console.error(error);
            }
        },
        // debounce
        onSearchInput() {
            clearTimeout(this.timeoutId); // xóa bỏ setTimeout() trước đó (nếu có)
            this.timeoutId = setTimeout(() => {
                this.Search();
            }, 700); // tạo mới setTimeout() với thời gian chờ là 700ms
        },
        async deleteAsset() {
            try {
                await this.$axios.delete(`/disposed_assets/${this.assetID}`);
                this.refreshData();
                this.notiAction = 'Xóa';
                this.notiObject = 'tài sản';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
            } catch (error) {
                this.notiAction = 'Xóa';
                this.notiObject = 'tài sản';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
                console.log(error);
            }
        },
        async cancelDispose() {
            try {
                await this.$axios.post(`/disposed_assets/${this.assetID}`);
                this.refreshData();
                this.notiAction = 'Hủy thanh lý';
                this.notiObject = 'tài sản';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
            } catch (error) {
                this.notiAction = 'Hủy thanh lý';
                this.notiObject = 'tài sản';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
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
        submitForm(action) {
            this.isShowPopup = false;
            if (action === 'xóa') {
                this.deleteAsset();
            } else if (action === 'hủy thanh lý') {
                this.cancelDispose();
            } else {
                this.downloadFile();
            }
        },
        showPopup(action, object, id) {
            if (action === 'xuất file') {
                this.notiObject = object;
            } else {
                this.notiObject = 'tài sản';
            }
            this.notiAction = action;
            this.isShowPopup = true;
            this.assetID = id;
        },
        closePopup() {
            this.isShowPopup = false;
        },
        goToIndexPage() {
            this.$router.push({
                query: { page: this.currentPage },
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
