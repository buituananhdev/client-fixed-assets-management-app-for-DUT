<template>
    <div class="container">
        <Header
            class="page-top"
            :class="{ navSticky: isHeaderActive }"
        ></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content" :class="{ max_height: isHeaderActive }">
            <div class="page-main">
                <div class="number">
                    <div class="number-box">
                        <p class="type">Tổng số tài sản</p>
                        <div class="number-of-type">{{ count[0] }}</div>
                        <div
                            class="line"
                            style="background-color: #7f56d9"
                        ></div>
                    </div>
                    <div class="number-box">
                        <p class="type">Tài tài hoạt động tốt</p>
                        <div class="number-of-type">{{ count[1] }}</div>
                        <div class="percent">
                            <p>{{ (count[1] * 100 / count[0]).toFixed(2) }} %</p>
                        </div>
                        <div
                            class="line"
                            style="background-color: #50c878"
                        ></div>
                    </div>
                    <div class="number-box">
                        <p class="type">Tài sản đang bảo trì</p>
                        <div class="number-of-type">{{ count[2] }}</div>
                        <div class="percent">
                            <p>{{ (count[2] * 100 / count[0]).toFixed(2) }} %</p>
                        </div>
                        <div
                            class="line"
                            style="background-color: #fdc571"
                        ></div>
                    </div>
                    <div class="number-box">
                        <p class="type">Tài sản bị hỏng</p>
                        <div class="number-of-type">{{ count[3] }}</div>
                        <div class="percent">
                            <p>{{ (count[3] * 100 / count[0]).toFixed(2) }} %</p>
                        </div>
                        <div
                            class="line"
                            style="background-color: #c7422e"
                        ></div>
                    </div>
                    <div class="number-box">
                        <p class="type">Tài sản đã thanh lý</p>
                        <div class="number-of-type">{{ count[4] }}</div>
                        <div class="percent">
                            <p>{{ (count[4] * 100 / count[0]).toFixed(2) }} %</p>
                        </div>
                        <div
                            class="line"
                            style="background-color: #008cde"
                        ></div>
                    </div>
                </div>
                <div class="chart-container">
                    <client-only placeholder="Loading...">
                        <donut-chart
                            :data="donutChartData"
                            :options="chartOptions"
                            :height="310"
                            :width="1000"
                            class="pie-chart"
                        ></donut-chart>
                    </client-only>
                </div>
                <div class="chart-container">
                    <client-only placeholder="Loading...">
                        <bar-chart
                            :data="barChartData"
                            :options="chartOptions"
                            :height="310"
                            class="bar-chart"
                        ></bar-chart>
                    </client-only>
                </div>
                <div class="chart-container">
                    <client-only placeholder="Loading...">
                        <line-chart
                            :data="barChartData"
                            :options="chartOptions"
                            :height="310"
                            class="bar-chart"
                        ></line-chart>
                    </client-only>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: [12064, 11074, 856, 126, 2346],
            isHeaderActive: false,
        };
    },
    computed: {
        donutChartData() {
            return {
                labels: [
                    'Hoạt động tốt',
                    'Đang sửa chữa',
                    'Bị hỏng',
                    'Đã thanh lý',
                ],
                datasets: [
                    {
                        label: '',
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
        barChartData() {
            return {
                labels: [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12',
                ],
                datasets: [
                    {
                        borderRadius: 8,
                        hoverBorderRadius: 8,
                        label: '',
                        data: [
                            1074, 856, 1263, 2567, 3451, 5672, 3456, 1945, 1990,
                            1234, 3461, 1067,
                        ],
                        backgroundColor: '#008cde',
                    },
                ],
            };
        },
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                offset: 8,
                radius: 160,
                spacing: 4,
                hoverOffset: 32,
                hoverBorderWidth: 1,
                weight: 0,
                borderRadius: 8,
            };
        },
    },
    mounted() {
        const pageMain = document.querySelector('.main-content')
        pageMain.addEventListener('scroll', this.handleScroll.bind(this));
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
            document.querySelector('.main-content').classList.add('open-collapse');
            document
                .querySelector('.main-content')
                .classList.remove('close-collapse');
            document.querySelector('.page-top').classList.add('open-collapse');
            document
                .querySelector('.page-top')
                .classList.remove('close-collapse');
        },
        handleScroll() {
            const pageMain = document.querySelector('.main-content')
            const scrollPosition = pageMain.scrollTop;
            if (scrollPosition >= 200) {
                this.isHeaderActive = true;
            } else {
                this.isHeaderActive = false;
            }
        },
    },
};
</script>

<style scoped src="../../static/css/table_assets.css"></style>
<style scoped>
.bar-chart {
    width: 80%;
}
.page-main {
    box-shadow: none;
    gap: 19px;
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
.percent {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 40%;
    right: 12px;
}
.percent p {
    font-size: 12px;
}
.line {
    height: 10px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.navSticky {
    transition: .2s ease;
    transform: translateY(-100%);
}
.max_height {
    transition: .2s ease;
    height: 100%;
}
</style>
