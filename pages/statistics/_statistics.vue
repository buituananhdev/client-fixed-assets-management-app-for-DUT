<template>
    <div class="container">
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <div class="number">
                    <div class="number-box">
                        <p class="type">Tổng số tài sản</p>
                        <div class="number-of-type">12056</div>
                        <div
                            class="line"
                            style="background-color: #7f56d9"
                        ></div>
                    </div>
                    <div class="number-box">
                        <p class="type">Tài tài hoạt động tốt</p>
                        <div class="number-of-type">11074</div>
                        <div
                            class="line"
                            style="background-color: #50c878"
                        ></div>
                    </div>
                    <div class="number-box">
                        <p class="type">Tài sản đang bảo trì</p>
                        <div class="number-of-type">856</div>
                        <div
                            class="line"
                            style="background-color: #fdc571"
                        ></div>
                    </div>
                    <div class="number-box">
                        <p class="type">Tài sản bị hỏng</p>
                        <div class="number-of-type">126</div>
                        <div
                            class="line"
                            style="background-color: #c7422e"
                        ></div>
                    </div>
                    <div class="number-box">
                        <p class="type">Tài sản đã thanh lý</p>
                        <div class="number-of-type">2346</div>
                        <div
                            class="line"
                            style="background-color: #008cde"
                        ></div>
                    </div>
                </div>
                <div class="chart-container">
                    <client-only placeholder="Loading...">
                        <donut-chart
                            :data="chartData"
                            :options="chartOptions"
                            class="pie-chart"
                        ></donut-chart>
                    </client-only>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs';

export default {
    data() {
        return {
            count: [11074, 856, 126, 2346],
            chartOptions: {
                maintainAspectRatio: false,
                spacing: 10,
            },
        };
    },
    computed: {
        chartData() {
            return {
                labels: [
                    'Hoạt động tốt',
                    'Đang sửa chữa',
                    'Bị hỏng',
                    'Đã thanh lý',
                ],
                datasets: [
                    {
                        label: 'Visualization',
                        data: [11074, 856, 126, 2346],
                        backgroundColor: [
                            '#50C878',
                            '#fdc571',
                            '#c7422e',
                            '#008cde',
                        ],
                        borderColor: '#fff',    
                        borderWidth: 1,
                    },
                ],
            };
        },
    },
    mounted() {
        //this.fetchData();
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
    components: { Doughnut },
};
</script>

<style scoped src="../../static/css/table_assets.css"></style>
<style scoped>
.pie-chart {
    width: 100%;
    height: 310px;
}
.page-main {
    box-shadow: none;
    gap: 24px;
}
.number {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 150px;
}
.number-box {
    position: relative;
    width: calc(100% / 5.2);
    height: 100%;
    border: 2px solid #eceef7;
    border-radius: 6px;
    overflow: hidden;
    padding: 24px 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}
.type {
    /* Tổng số tài sản */
    height: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */
    letter-spacing: 0.01em;
    color: #343434;
}
.number-of-type {
    height: 35px;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 35px;
    letter-spacing: 0.01em;
    color: #232323;
}
.chart-container {
    /* Rectangle 292 */
    box-sizing: border-box;
    width: 100%;
    height: 362px;
    background: #ffffff;
    border: 2px solid #eceef7;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
}
.line {
    height: 10px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
