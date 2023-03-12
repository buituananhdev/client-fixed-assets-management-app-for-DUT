<template>
    <div class="container">
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <h1 class="page-main-title">Danh sách tài sản</h1>
                <div class="table-assets">
                    <span class="table-assets-title">
                        <p class="div-center stt-col">STT</p>
                        <p class="div-center id-col">Mã TS</p>
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
                        :key="index"
                        :itemProp="item"
                        :itemIndex="index + 1"
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
import TabLeft from '@/components/TabLeft.vue';
import assetItem from '@/components/assetItem.vue';
import Header from '@/components/Header.vue';
export default {
    //middleware: [auth],
    components: {
        TabLeft,
        assetItem,
        Header,
    },
    data() {
        return {
            listAssets: [],
            meta: [],
            currentPage: 1,
            isHaveContent: false,
            listAssetsFake: [
                {
                    assetID: 1,
                    deviceID: 'D001',
                    roomID: 'RM001',
                    assetName: 'Máy tính để bàn',
                    yearOfUse: 3,
                    technicalSpecification: 'Intel Core i5, 8GB RAM',
                    quantity: 5,
                    cost: 15000000,
                    status: 'Hoạt động tốt',
                    notes: 'Không có ghi chú',
                },
                {
                    assetID: 2,
                    deviceID: 'D002',
                    roomID: 'RM001',
                    assetName: 'Máy chiếu',
                    yearOfUse: 2,
                    technicalSpecification:
                        'Độ phân giải Full HD, độ sáng 3000 lumens',
                    quantity: 1,
                    cost: 5000000,
                    status: 'Hỏng',
                    notes: 'Cần sửa chữa',
                },
                {
                    assetID: 3,
                    deviceID: 'D003',
                    roomID: 'RM001',
                    assetName: 'Máy in',
                    yearOfUse: 4,
                    technicalSpecification:
                        'In đen trắng, tốc độ 30 trang/phút',
                    quantity: 2,
                    cost: 8000000,
                    status: 'Đang sử dụng',
                    notes: 'Không có ghi chú',
                },
                {
                    assetID: 7,
                    deviceID: 'khong biet',
                    roomID: 'RM001',
                    assetName: 'Loa',
                    yearOfUse: 2023,
                    technicalSpecification: 'asdasdasda',
                    quantity: 1,
                    cost: 10000,
                    status: 'good',
                    notes: '',
                },
                {
                    assetID: 12,
                    deviceID: 'khong biet',
                    roomID: 'RM001',
                    assetName: 'Loa',
                    yearOfUse: 2023,
                    technicalSpecification: 'asdasdasda',
                    quantity: 1,
                    cost: 10000,
                    status: 'good',
                    notes: '',
                },
                {
                    assetID: 13,
                    deviceID: 'khong biet',
                    roomID: 'RM001',
                    assetName: 'Loa',
                    yearOfUse: 2023,
                    technicalSpecification: 'asdasdasda',
                    quantity: 1,
                    cost: 10000,
                    status: 'good',
                    notes: '',
                },
                {
                    assetID: 14,
                    deviceID: 'khong biet',
                    roomID: 'RM001',
                    assetName: 'Loa',
                    yearOfUse: 2023,
                    technicalSpecification: 'asdasdasda',
                    quantity: 1,
                    cost: 10000,
                    status: 'good',
                    notes: '',
                },
                {
                    assetID: 15,
                    deviceID: 'khong biet',
                    roomID: 'RM001',
                    assetName: 'Loa',
                    yearOfUse: 2023,
                    technicalSpecification: 'asdasdasda',
                    quantity: 1,
                    cost: 10000,
                    status: 'good',
                    notes: '',
                },
                {
                    assetID: 20,
                    deviceID: 'khong biet',
                    roomID: 'RM001',
                    assetName: 'Loa',
                    yearOfUse: 2023,
                    technicalSpecification: 'asdasdasda',
                    quantity: 1,
                    cost: 10000,
                    status: 'good',
                    notes: '',
                },
                {
                    assetID: 21,
                    deviceID: 'khong biet',
                    roomID: 'RM001',
                    assetName: 'Loa',
                    yearOfUse: 2023,
                    technicalSpecification: 'asdasdasda',
                    quantity: 1,
                    cost: 10000,
                    status: 'good',
                    notes: '',
                },
            ],
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
                    .get(`/asset?pageNumber=${this.currentPage}&pageSize=10`)
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

<style scoped>
.table-assets {
    height: 100%;
}
.main-content {
    position: absolute;
    right: 0;
    bottom: 12px;
    padding: 12px;
    width: calc(100% - 255px);
    height: calc(100% - 80px);
    display: flex;
    justify-content: center;
}
.page-main {
    display: flex;
    flex-direction: column;
    gap: 48px;
    width: 1440px;
    border-radius: 6px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.page-main-title {
    font-size: 22px;
    color: #252733;
    margin: 32px 42px;
    margin-bottom: 0;
}
.table-assets-title {
    width: 100%;
    display: flex;
    padding: 6px 32px;
    padding-bottom: 24px;
    border-bottom: solid 1px #dfe0eb;
}
.table-assets-title p {
    font-size: 16px;
    color: #9fa2b4;
}
.close-collapse {
    transform: translate(-98px);
    transition: all 0.2s ease;
}
.open-collapse {
    transform: translate(0);
    transition: all 0.2s ease;
}
.pagination {
    width: 100%;
    height: 60px;
    padding-bottom: 32px;
    display: flex;
    justify-content: flex-end;
}
.pagination-content {
    width: 400px;
    height: 100%;
    gap: 60px;
}
.pagination-btn {
    display: flex;
    width: 100px;
    gap: 18px;
}

.pagination-btn p {
    cursor: pointer;
}

.active-page {
    background: #008cde;
    padding: 5px 8px;
    color: #fff;
    border-radius: 3px;
}
.empty-icn {
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 12px;
}
.empty-err-mess {
    font-size: 32px;
    font-weight: 500;
    color: #9fa2b4;
}
</style>
