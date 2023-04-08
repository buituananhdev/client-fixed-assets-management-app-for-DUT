import Vue from 'vue'
import { Line } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'

Vue.component('line-chart', {
	extends: Line,
	props: ['data', 'options'],
	mounted () {
		this.renderChart(this.data, this.options)
	}
})

Vue.component('pie-chart', {
	extends: Pie,
	props: ['data', 'options'],
	mounted () {
		this.renderChart(this.data, this.options)
	}
})

Vue.component('donut-chart', {
	extends: Doughnut,
	props: ['data', 'options'],
	mounted () {
		this.renderChart(this.data, this.options)
	}
})

Vue.component('bar-chart', {
	extends: Bar,
	props: ['data', 'options'],
	mounted () {
		this.renderChart(this.data, this.options)
	}
})