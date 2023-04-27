<script>
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
Chart.register(...registerables)

export default {
  async mounted() {
    const response = await axios.get('mongodb+srv://4339ProjectAdmin:Ai9HA8ISkHsBkgh2@cluster0.gpikkjp.mongodb.net/4339_Project_Database')
    const data = response.data

    const backgroundColor = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)']
    const borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)']
    await new Chart(this.$refs.attendanceChart, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            borderWidth: 1,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: data.values
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
