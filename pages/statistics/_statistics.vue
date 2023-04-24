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
                    <!-- <div class="number-box">
                        <p class="type">Tổng số tài sản</p>
                        <div class="number-of-type">
                            {{ countStatus.total }}
                        </div>
                        <div
                            class="line"
                            style="background-color: #7f56d9"
                        ></div>
                    </div> -->
                    <div class="number-box">
                        <p class="type">Tài sản hoạt động tốt</p>
                        <div class="number-of-type">
                            {{ countStatus.count_good }}
                        </div>
                        <div class="circle">
                            <p class="percent">
                                {{
                                    (
                                        (countStatus.count_good * 100) /
                                        countStatus.total
                                    ).toFixed(2)
                                }}
                            </p>
                        </div>
                        <!-- <div
                            class="line"
                            style="background-color: #50c878"
                        ></div> -->
                    </div>
                    <div class="number-box">
                        <p class="type">Tài sản đang bảo dưỡng</p>
                        <div class="number-of-type">
                            {{ countStatus.count_maintenance }}
                        </div>
                        <div class="circle">
                            <p class="percent">
                                {{
                                    (
                                        (countStatus.count_maintenance * 100) /
                                        countStatus.total
                                    ).toFixed(2)
                                }}
                            </p>
                        </div>
                        <!-- <div
                            class="line"
                            style="background-color: #fdc571"
                        ></div> -->
                    </div>
                    <div class="number-box">
                        <p class="type">Tài sản bị hỏng</p>
                        <div class="number-of-type">
                            {{ countStatus.count_broken }}
                        </div>
                        <div class="circle">
                            <p class="percent">
                                {{
                                    (
                                        (countStatus.count_broken * 100) /
                                        countStatus.total
                                    ).toFixed(2)
                                }}
                            </p>
                        </div>
                        <!-- <div
                            class="line"
                            style="background-color: #c7422e"
                        ></div> -->
                    </div>
                    <div class="number-box">
                        <p class="type">Tài sản đã thanh lý</p>
                        <div class="number-of-type">
                            {{ countStatus.count_disposed }}
                        </div>
                        <div class="circle">
                            <p class="percent">
                                {{
                                    (
                                        (countStatus.count_disposed * 100) /
                                        countStatus.total
                                    ).toFixed(2)
                                }}
                            </p>
                        </div>
                        <!-- <div
                            class="line"
                            style="background-color: #008cde"
                        ></div> -->
                    </div>
                </div>
                <div class="chart-container">
                    <p class="number-of-type count-total">{{ countStatus.total }}</p>
                    <client-only placeholder="Loading...">
                        <donut-chart
                            v-if="JSON.stringify(countStatus) != '{}'"
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
                            v-if="countDisposeMonth.length != 0"
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
                            ref="chart"
                            v-if="countDisposeMonth.length != 0"
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
            countStatus: {},
            countDisposeMonth: [],
            chartData: [1, 2, 3, 4],
            isHeaderActive: false,
        };
    },
    computed: {
        countDisposeMonthData() {
            return this.countDisposeMonth;
        },
        countStatusData() {
            const countStatusArray = Object.values(this.countStatus).slice(1);
            console.log(countStatusArray);
            return countStatusArray;
        },
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
                        data: this.countStatusData,
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
                        data: this.countDisposeMonthData,
                        backgroundColor: '#7f56d9',
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
                categoryPercentage: 0.2,
                barPercentage: 0.1,
            };
        },
    },
    async mounted() {
        await this.fetchData();
        const pageMain = document.querySelector('.main-content');
        pageMain.addEventListener('scroll', this.handleScroll.bind(this));
        // lấy danh sách tất cả các phần tử có class là "percent"
        const percentElements = document.querySelectorAll('.percent');
        // lặp qua từng phần tử và cập nhật độ rộng nền với phần trăm tương ứng
        percentElements.forEach((percentElement) => {
            const percent = parseInt(percentElement.innerHTML);
            // lấy phần tử circle tương ứng với phần trăm đang xét
            const circle = percentElement.closest('.circle');
            if (circle) {
                circle.style.background = `conic-gradient(#7f56d9 ${percent}%, #F5F5F5 0)`;
            }
        });
    },
    methods: {
        async fetchData() {
            try {
                const response = await this.$axios.get(`/asset/statistic`);
                this.countStatus = response.data.data.countStatus;
                const data = response.data.data.countDisposeMonth;
                for (let i = 0; i < data.length; i++) {
                    this.countDisposeMonth.push(data[i].count);
                }
                console.log(this.countDisposeMonth);
            } catch (error) {
                console.error(error);
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
        handleScroll() {
            const pageMain = document.querySelector('.main-content');
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
    width: calc(100% / 4.2);
    height: 100%;
    border: 2px solid #eceef7;
    border-radius: 6px;
    overflow: hidden;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.type {
    /* Tổng số tài sản */
    height: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    /* identical to box height */
    letter-spacing: 0.01em;
    color: #343434;
}
.number-of-type {
    height: 35px;
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 35px;
    letter-spacing: 0.01em;
    color: #232323;
}
.chart-container {
    position: relative;
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
.circle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20%;
    right: 12px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
}
.percent {
    font-size: 12px;
    font-weight: 900;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    transition: 0.2s ease;
    transform: translateY(-100%);
}
.max_height {
    transition: 0.2s ease;
    height: 100%;
}
.count-total {
    position: absolute;
    top: 50%;
    font-weight: 800;
}
</style>
