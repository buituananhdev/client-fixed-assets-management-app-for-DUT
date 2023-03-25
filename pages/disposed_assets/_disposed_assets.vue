<template>
    <div class="container">
        <Notification
            :content="'Xóa tài sản thành công'"
            v-if="showNoti"
        ></Notification>
        <PopUp
            class="popup"
            v-show="isShowPopup == 'popupDelete'"
            @closePopup="closePopup()"
            @submitForm="submitForm('delete')"
            :title="'Delete ?'"
            :content="'Bạn có chắc muốn xóa tài sản này'"
        ></PopUp>
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <h1 class="page-main-title">Danh sách tài sản</h1>
                <div class="table-assets">
                    <span class="table-assets-title div-center">
                        <p class="div-center stt-col">STT</p>
                        <p class="div-center id-col">Mã TS</p>
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
                    <assetItem
                        v-for="(item, index) in listAssets"
                        :type="'disposed'"
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
            assetID: '',
            isHaveContent: false,
            showNoti: false,
            isShowPopup: '',
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
    },
    methods: {
        async fetchData() {
            this.currentPage = this.pageParam;
            try {
                await this.$axios
                    .get(
                        `/disposed_asset?pageNumber=${this.currentPage}&pageSize=10`
                    )
                    .then((res) => {
                        this.listAssets = res['data']['data'];
                        this.meta = res['data']['meta'];
                        this.isHaveContent = true;
                        console.log(this.listAssets);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteAsset() {
            try {
                await this.$axios.delete(`/disposed_asset/${this.assetID}`);
                this.fetchData();
                this.showNoti = true;
                setTimeout(() => {
                    this.showNoti = false;
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        },
        closeTab() {
            document
                .querySelector('.page-main')
                .classList.add('close-collapse');
            document
                .querySelector('.page-main')
                .classList.remove('open-collapse');
            document.querySelector('.page-top').classList.add('close-collapse');
            document
                .querySelector('.page-top')
                .classList.remove('open-collapse');
        },
        openTab() {
            document.querySelector('.page-main').classList.add('open-collapse');
            document
                .querySelector('.page-main')
                .classList.remove('close-collapse');
            document.querySelector('.page-top').classList.add('open-collapse');
            document
                .querySelector('.page-top')
                .classList.remove('close-collapse');
        },
        submitForm(type) {
            if (type == 'delete') {
                this.deleteAsset();
            } else if (type == 'dispose') {
                this.disposeAsset();
            }
        },
        showPopup(type, id) {
            this.isShowPopup = type;
            this.assetID = id;
        },
        closePopup() {
            this.isShowPopup = '';
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
