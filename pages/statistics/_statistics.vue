<template>
    <div class="container">
        <OptionExport @closePopup=""></OptionExport>
        <Header
            class="page-top"
            :class="{ navSticky: isHeaderActive }"
        ></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content" :class="{ max_height: isHeaderActive }">
            <div class="page-main">
                <div class="action-container">
                    <multiselect
                        class="multiselect"
                        :options="years"
                        v-model="selectedYear"
                        placeholder="Năm"
                        @input="fetchData(selectedYear)"
                    ></multiselect>
                    <button
                        class="create-btn"
                        @click="showPopup('xuất file', 'bảng dữ liệu')"
                    >
                        Xuất file excel
                    </button>
                </div>
                <div class="number">
                    <div class="number-box good-box">
                        <p class="type">Tài sản hoạt động tốt</p>
                        <h3 class="number-of-type">
                            {{ countStatus.count_good }}
                        </h3>
                        <div class="circle div-center">
                            <p
                                style="background: #edffef"
                                class="percent div-center"
                            >
                                {{
                                    (
                                        (countStatus.count_good * 100) /
                                        countStatus.total
                                    ).toFixed(2)
                                }}%
                            </p>
                        </div>
                    </div>
                    <div class="number-box broken-box repair-box">
                        <p class="type">Tài sản đang bảo dưỡng</p>
                        <h3 class="number-of-type">
                            {{ countStatus.count_maintenance }}
                        </h3>
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
                        <h3 class="number-of-type">
                            {{ countStatus.count_broken }}
                        </h3>
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
                        <h3 class="number-of-type">
                            {{ countStatus.count_disposed }}
                        </h3>
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
import OptionExport from '@/components/File/OptionExport.vue';

export default {
    components: {
        OptionExport
    },
    data() {
        return {
            countStatus: {},
            countDisposeMonth: [],
            chartData: [1, 2, 3, 4],
            isHeaderActive: false,
            selectedYear: '',
            showPopup: false,
            years: ['2023', '2022', '2021', '2020', '2019', '2018', '2017'],
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
                            '#50c878',
                            '#5c93d1',
                            '#9B715D',
                            '#5E5498',
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
                        backgroundColor: '#5E5498',
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 0,
                        borderRadius: 12,
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
        await this.fetchData(this.selectedYear);
        const pageMain = document.querySelector('.main-content');
        pageMain.addEventListener('scroll', this.handleScroll.bind(this));
        const percentElements = document.querySelectorAll('.percent');
        for (let i = 0; i < percentElements.length; i++) {
            const percent = parseInt(percentElements[i].innerHTML);
            const circle = percentElements[i].closest('.circle');
            switch (i) {
                case 0:
                    if (circle) {
                        circle.style.background = `conic-gradient(#50c878 ${percent}%, #BAE7B6 0)`;
                    }
                    break;
                case 1:
                    if (circle) {
                        circle.style.background = `conic-gradient(#5c93d1 ${percent}%, #c2dbf9 0)`;
                    }
                    break;
                case 2:
                    if (circle) {
                        circle.style.background = `conic-gradient(#9B715D ${percent}%, #F3D5C8 0)`;
                    }
                    break;
                case 3:
                    if (circle) {
                        circle.style.background = `conic-gradient(#5E5498 ${percent}%, #D8D3F5 0)`;
                    }
                    break;
                default:
                    break;
            }
        }
    },
    watch: {
        selectedYear(newValue) {
            this.fetchData(newValue);
        },
    },
    methods: {
        async fetchData(year) {
            try {
                let url;
                if (year != '') {
                    url = `/asset/statistic?year_dispose${year}`;
                } else {
                    url = `/asset/statistic`;
                }
                const response = await this.$axios.get(url);
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
    border-radius: 12px;
    overflow: hidden;
    padding: 32px 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    box-shadow: 30px 30.24px 20px rgba(0, 0, 0, 0.02),
        0px 12.16px 8.576px rgba(0, 0, 0, 0.013152),
        0px 2.72px 3.712px rgba(0, 0, 0, 0.008304);
}
.good-box {
    background: #edffef;
    color: #55a55e;
    animation: from-left 0.8s ease-in-out;
}
.broken-box {
    background: #fff2ec;
    color: #9b715d;
    animation: from-top 0.9s ease-in-out;
}
.repair-box {
    background: #edf5ff;
    color: #5c93d1;
}
.disposed-box {
    background: #f4f2ff;
    color: #5e5498;
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
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height */
    letter-spacing: 0.01em;
}
.number-of-type {
    height: 35px;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 35px;
    letter-spacing: 0.01em;
}
.chart-container {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #ffffff;
    border: 1px solid #f2eeee;
    box-shadow: 30px 30.24px 20px rgba(0, 0, 0, 0.02),
        0px 12.16px 8.576px rgba(0, 0, 0, 0.013152),
        0px 2.72px 3.712px rgba(0, 0, 0, 0.008304);
}
.chart-name {
    font-size: 22px;
    font-weight: 700;
}
.circle {
    position: absolute;
    top: 20%;
    left: 24px;
    width: 80px;
    height: 80px;
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
    color: #11263c;
    border-radius: 50%;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    width: 65px;
    height: 65px;
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
.action-container {
    padding: 0;
}
</style>
