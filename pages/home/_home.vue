<template>
    <div class="container">
        <Notification
            :type="notiType"
            :object="notiObject"
            :action="notiAction"
            v-if="showNotification == true"
        ></Notification>
        <PopUp
            class="popup"
            v-show="isShowPopup == 'popupDelete'"
            @closePopup="closePopup()"
            @submitForm="submitForm('delete')"
            :title="'Delete ?'"
            :content="'Bạn có chắc muốn xóa tài sản này'"
        ></PopUp>
        <PopUp
            class="popup"
            v-show="isShowPopup == 'popupDispose'"
            @closePopup="closePopup()"
            @submitForm="submitForm('dispose')"
            :title="'Liquidation ?'"
            :content="'Bạn có chắc muốn thanh lý tài sản này'"
        ></PopUp>
        <CreateAsset
            :type="'update'"
            :assetProp="currentAsset"
            v-show="isShowPopup == 'popupCreate'"
            @closePopup="closePopup()"
            @submitForm="submitForm"
        >
        </CreateAsset>
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
                    <div class="btn-container">
                        <button class="create-btn" @click="downloadFile">
                            Xuất ra file excel
                        </button>
                        <button
                            class="create-btn"
                            @click="isShowPopup = 'popupCreate'"
                        >
                            Thêm tài sản
                        </button>
                    </div>
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
                        <p class="div-center status-col">Trạng thái</p>
                        <p class="div-center show-action-col">Action</p>
                    </span>
                    <div class="empty-icn div-center" v-show="!isHaveContent">
                        <img
                            src="../../static/icons/file-question.svg"
                            alt="file-rong"
                        />
                        <h1 class="empty-err-mess">Không có dữ liệu</h1>
                    </div>
                    <assetItem
                        v-for="(item, index) in listAssets"
                        :type="'asset'"
                        :key="index"
                        :itemProp="item"
                        :itemIndex="index + 1"
                        @showPopup="showPopup"
                        style="width: 100%"
                    ></assetItem>
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
import assetItem from '@/components/Asset/assetItem.vue';
export default {
    components: {
        assetItem,
    },
    data() {
        return {
            listAssets: [],
            meta: [],
            currentPage: 1,
            assetID: {},
            isHaveContent: false,
            isShowPopup: '',
            showNotification: false,
            notiAction: '',
            notiObject: '',
            notiType: '',
            searchValue: '',
            timeoutId: null, // thêm biến timeoutId vào component
            selectedOption: '',
            currentAsset: {},
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
        pageSearch() {
            return this.$route.query.search;
        },
        pageStatus() {
            return this.$route.query.status;
        },
    },
    mounted() {
        this.searchValue = this.pageSearch;
        this.selectedOption = this.pageStatus;
        if (this.searchValue !== '' || this.selectedOption !== '') {
            this.Search();
        } else {
            this.fetchData();
        }
    },
    watch: {
        pageParam: async function () {
            if (this.searchValue !== '' || this.selectedOption !== '') {
                this.Search();
            } else {
                this.fetchData();
            }
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
        async downloadFile() {
            try {
                const apiURL =
                    'https://localhost:7011/api/asset?pageNumber=1&pageSize=10&isConvert=true'; // đường dẫn tới API download file
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
                this.notiAction = 'Download';
                this.notiObject = 'file';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
            } catch (error) {
                this.notiAction = 'Export';
                this.notiObject = 'file';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
            }
        },
        async fetchData() {
            try {
                const response = await this.$axios.get(
                    `/asset?pageNumber=${this.currentPage}&pageSize=10`
                );
                this.listAssets = response.data.data;
                this.meta = response.data.meta;
                console.log(this.listAssets);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchDetail(id) {
            try {
                await this.$axios.get(`/asset/${id}`).then((res) => {
                    this.currentAsset = res['data']['data'];
                    console.log(this.currentAsset);
                });
            } catch (error) {
                console.log(error);
            }
        },
        async Search() {
            this.currentPage = this.pageParam;
            try {
                const { currentPage, selectedOption, searchValue } = this;
                let url = `/asset?pageNumber=${currentPage}&pageSize=10`;
                if (selectedOption && selectedOption !== 'Tất cả') {
                    url += `&status=${selectedOption}`;
                }
                if (searchValue) {
                    url += `&searchQuery=${searchValue}`;
                }
                const {
                    data: { data, meta },
                } = await this.$axios.get(url);
                this.listAssets = data;
                this.meta = meta;
                console.log(this.listAssets);
                // Lưu trạng thái của selectedOption và searchValue vào URL của trang web
                const query = {};
                if (selectedOption) {
                    query.status = selectedOption;
                }
                if (searchValue) {
                    query.search = searchValue;
                }
                this.$router.push({ path: `/home?page=${currentPage}`, query });
            } catch (error) {
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
        async addAsset(asset) {
            try {
                await this.$axios.post(`/asset`, {
                    deviceID: asset.deviceID,
                    roomID: asset.roomID,
                    assetName: asset.assetName,
                    yearOfUse: 2023,
                    technicalSpecification: asset.technicalSpecification,
                    quantity: asset.quantity,
                    cost: asset.cost,
                    status: 'Hoạt động tốt',
                    notes: asset.notes,
                });
                this.notiAction = 'Thêm mới';
                this.notiObject = 'tài sản';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                this.fetchData();
            } catch (error) {
                this.notiAction = 'Thêm mới';
                this.notiObject = 'tài sản';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                console.log(error);
            }
        },
        async updateAsset(asset) {
            try {
                await this.$axios.put(`/asset/${asset.assetID}`, {
                    assetID: asset.assetID,
                    deviceID: asset.deviceID,
                    roomID: asset.roomID,
                    assetName: asset.assetName,
                    yearOfUse: 2023,
                    technicalSpecification: asset.technicalSpecification,
                    quantity: asset.quantity,
                    cost: asset.cost,
                    status: 'Hoạt động tốt',
                    notes: asset.notes,
                });
                this.notiAction = 'Cập nhật';
                this.notiObject = 'tài sản';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                this.fetchData();
            } catch (error) {
                this.notiAction = 'Cập nhật';
                this.notiObject = 'tài sản';
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
                await this.$axios.delete(`/asset/${this.assetID}`);
                this.notiAction = 'Xóa';
                this.notiObject = 'tài sản';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                this.fetchData();
            } catch (error) {
                this.notiAction = 'Xóa';
                this.notiObject = 'tài sản';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                console.log(error);
            }
        },
        async disposeAsset() {
            try {
                await this.$axios.post(`/asset/${this.assetID}`);
                this.notiAction = 'Thanh lý';
                this.notiObject = 'tài sản';
                this.notiType = 'thành công';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                this.fetchData();
            } catch (error) {
                this.notiAction = 'Thanh lý';
                this.notiObject = 'tài sản';
                this.notiType = 'thất bại';
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
                console.log(error);
            }
        },
        submitForm(type, asset) {
            this.isShowPopup = '';
            if (type == 'delete') {
                this.deleteAsset();
            } else if (type == 'dispose') {
                this.disposeAsset();
            } else if (type == 'create') {
                if (!asset.assetID) {
                    this.addAsset(asset);
                } else {
                    this.updateAsset(asset);
                }
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
        showPopup(type, id) {
            if (type == 'popupCreate') {
                this.fetchDetail(id);
                this.isShowPopup = type;
            } else {
                this.isShowPopup = type;
                this.assetID = id;
            }
        },
        closePopup() {
            this.isShowPopup = '';
            this.currentAsset = {};
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
