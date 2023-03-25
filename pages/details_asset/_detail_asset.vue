<template>
    <div class="container">
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <h1 class="page-main-title">
                    <img src="../../static/icons/back.svg" alt="" style="cursor: pointer;" @click="$router.go(-1)"/> 
                    Chi tiết tài sản
                </h1>
                <div class="table-assets">
                    <div
                        class="asset_container"
                        v-for="item in currentAsset"
                        :key="item"
                    >
                        {{ item }}
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
            currentAsset: [],
            isHaveContent: false,
        };
    },

    computed: {
        pageParam() {
            return this.$route.query.id;
        },
    },
    mounted() {
        this.fetchData();
        console.log(this.pageParam);
    },
    watch: {
        pageParam: async function () {
            this.fetchData();
        },
    },
    methods: {
        async fetchData() {
            try {
                await this.$axios
                    .get(`/asset/${this.pageParam}`)
                    .then((res) => {
                        this.currentAsset = res['data']['data'];
                        this.isHaveContent = true;
                        console.log(this.currentAsset);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteAsset() {
            try {
                await this.$axios.delete(`/asset/${this.itemProp.assetID}`);
            } catch (error) {
                console.log(error);
            }
        },
        async disposeAsset() {
            try {
                await this.$axios.post(`/asset/${this.itemProp.assetID}`);
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
    },
};
</script>

<style scoped src="../../static/css/table_assets.css"></style>
\
<style scoped>
.asset_container {
    padding: 12px;
}
</style>
