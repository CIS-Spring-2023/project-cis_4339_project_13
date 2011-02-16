<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  async mounted() {
    const backgroundColor = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)']
    const borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)']
    await new Chart(this.$refs.attendanceChart, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            borderWidth: 1,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: [10, 20, 30]
          }
        ]
      },
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 1
            }
          },
          x: {
            gridLines: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    })
  }
}
</script>

<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>
