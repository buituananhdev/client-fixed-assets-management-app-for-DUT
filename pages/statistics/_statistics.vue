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
                    <div class="number-box good-box">
                        <p class="type">Tài sản hoạt động tốt</p>
                        <div class="number-of-type">
                            {{ countStatus.count_good }}
                        </div>
                        <div class="circle div-center">
                            <p class="percent div-center">
                                {{
                                    (
                                        (countStatus.count_good * 100) /
                                        countStatus.total
                                    ).toFixed(2)
                                }}%
                            </p>
                        </div>
                    </div>
                    <div class="number-box broken-box">
                        <p class="type">Tài sản đang bảo dưỡng</p>
                        <div class="number-of-type">
                            {{ countStatus.count_maintenance }}
                        </div>
                        <div class="circle div-center">
                            <p class="percent div-center">
                                {{
                                    (
                                        (countStatus.count_maintenance * 100) /
                                        countStatus.total
                                    ).toFixed(2)
                                }}%
                            </p>
                        </div>
                    </div>
                    <div class="number-box broken-box">
                        <p class="type">Tài sản bị hỏng</p>
                        <div class="number-of-type">
                            {{ countStatus.count_broken }}
                        </div>
                        <div class="circle circle-broken div-center">
                            <p class="percent div-center">
                                {{
                                    (
                                        (countStatus.count_broken * 100) /
                                        countStatus.total
                                    ).toFixed(2)
                                }}%
                            </p>
                        </div>
                    </div>
                    <div class="number-box disposed-box">
                        <p class="type">Tài sản đã thanh lý</p>
                        <div class="number-of-type">
                            {{ countStatus.count_disposed }}
                        </div>
                        <div class="circle circle-disposed div-center">
                            <p class="percent div-center">
                                {{
                                    (
                                        (countStatus.count_disposed * 100) /
                                        countStatus.total
                                    ).toFixed(2)
                                }}%
                            </p>
                        </div>
                    </div>
                </div>
                <div class="div-center" style="gap: 32px">
                    <div class="chart-container" style="flex: 1.3">
                        <client-only placeholder="Loading...">
                            <bar-chart
                                v-if="countDisposeMonth.length != 0"
                                :data="barChartData"
                                :options="barChartOptions"
                                :height="310"
                                class="bar-chart"
                            ></bar-chart>
                        </client-only>
                    </div>
                    <div class="chart-container" style="flex: 0.7">
                        <client-only placeholder="Loading...">
                            <donut-chart
                                v-if="JSON.stringify(countStatus) != '{}'"
                                :data="donutChartData"
                                :options="chartOptions"
                                :height="310"
                                class="pie-chart"
                            ></donut-chart>
                        </client-only>
                    </div>
                </div>

                <!-- <div class="chart-container">
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
                </div> -->
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
                    'Đang bảo dưỡng',
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
                        label: 'Tài sản đã thanh lý',
                        data: this.countDisposeMonthData,
                        backgroundColor: [
                            '#99aa00',
                            '#aabbee',
                            '#990000',
                            '#99ff00',
                            '#994400',
                            '#9900ff',
                        ],
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 2,
                        radius: 240,
                        //hoverBackgroundColor: 'rgba(100, 0, 0, 0.5)',
                        hoverOffset: 350,
                    },
                ],
            };
        },
        barChartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                pointStyle: 'star',
                barThickness: 3,
                hoverOffset: 4,
                borderRadius: 8,
                radius: 12,
                categoryPercentage: 0.2,
                barPercentage: 0.1,
                title: {
                    display: true,
                    text: 'Biểu đồ tài sản đã thanh lý qua từng tháng',
                    fontSize: 22,
                    fontColor: '#6b7280',
                },
                tooltips: {
                    backgroundColor: '#363740',
                },
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
                title: {
                    display: true,
                    text: 'Biểu đồ tài sản',
                    fontSize: 22,
                    fontColor: '#6b7280',
                },
                tooltips: {
                    backgroundColor: '#363740',
                },
            };
        },
    },
    async mounted() {
        await this.fetchData();
        const pageMain = document.querySelector('.main-content');
        pageMain.addEventListener('scroll', this.handleScroll.bind(this));
        const percentElements = document.querySelectorAll('.percent');
        for (let i = 0; i < percentElements.length; i++) {
            const percent = parseInt(percentElements[i].innerHTML);
            const circle = percentElements[i].closest('.circle');
            switch (i) {
                case 0:
                    if (circle) {
                        circle.style.background = `conic-gradient(#50c878 ${percent}%, #F5F5F5 0)`;
                    }
                    break;
                case 1:
                    if (circle) {
                        circle.style.background = `conic-gradient(#fdc571 ${percent}%, #F5F5F5 0)`;
                    }
                    break;
                case 2:
                    if (circle) {
                        circle.style.background = `conic-gradient(#c7422e ${percent}%, #F5F5F5 0)`;
                    }
                    break;
                case 3:
                    if (circle) {
                        circle.style.background = `conic-gradient(#008cde ${percent}%, #F5F5F5 0)`;
                    }
                    break;
                default:
                    break;
            }
        }
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
    width: 95%;
}
.page-main {
    box-shadow: none;
    gap: 32px;
}
.number {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.number-box {
    position: relative;
    width: calc(100% / 4.2);
    height: 100%;
    border: 2px solid #eceef7;
    border-radius: 6px;
    overflow: hidden;
    padding: 32px 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
}
.good-box {
    animation: from-left 0.8s ease-in-out;
}
.broken-box {
    animation: from-top 0.9s ease-in-out;
}
.disposed-box {
    animation: from-right 0.8s ease-in-out;
}
@keyframes from-top {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes from-left {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes from-right {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
.type {
    /* Tổng số tài sản */
    height: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height */
    letter-spacing: 0.01em;
    color: #343434;
}
.number-of-type {
    height: 35px;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 35px;
    letter-spacing: 0.01em;
    color: #232323;
}
.chart-container {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    background: #ffffff;
    border: 2px solid #eceef7;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 12px;
}
.chart-name {
    font-size: 22px;
    font-weight: 700;
}
.circle {
    position: absolute;
    top: 10%;
    left: 24px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    transition: 0.3s ease-in-out;
}
.circle:hover {
    transform: scale(1.2);
}
.circle:hover .percent {
    font-weight: 800;
}
.percent {
    background: #ffffff;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    width: 60px;
    height: 60px;
    transition: 0.3s ease-in-out;
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
