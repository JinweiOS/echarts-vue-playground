<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
}
const chart = ref(null)

onMounted(() => {
  const chartIns = echarts.init(chart.value);
  chartIns.setOption(option);
})
</script>

<template>
  <div style="height: 600px; width: 600px;" ref="chart"></div>
</template>
