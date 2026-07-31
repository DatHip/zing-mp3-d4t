import React, { memo, useEffect, useState } from "react"
import { Chart } from "react-chartjs-2"
import {
   Chart as ChartJS,
   LineController,
   LineElement,
   PointElement,
   LinearScale,
   Title,
   CategoryScale,
   Legend,
   Tooltip,
} from "chart.js"
import { useGetHomePage } from "../../api/getHomePage"

ChartJS.register(CategoryScale, LineController, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const CharHomeItem = memo(({ id }) => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()
   const dataSelector = data?.data.items.find((e) => e.sectionType === "RTChart")

   useEffect(() => {
      if (data) {
         setData(dataSelector)
      }
   }, [status])

   const getEnCodeId = (num) => {
      let item = datas?.items[`${num}`]?.encodeId
      return item
   }

   const DataChart0 = datas?.chart?.items[`${getEnCodeId(0)}`]
   const DataChart1 = datas?.chart?.items[`${getEnCodeId(1)}`]
   const DataChart2 = datas?.chart?.items[`${getEnCodeId(2)}`]

   const labels = datas?.chart?.times.map((e) => e.hour + ":00")

   const options = {
      animations: {
         radius: {
            duration: 500,
            easing: "linear",
            loop: (context) => context.active,
         },
      },
      datasetStrokeWidth: 10,
      pointDotStrokeWidth: 10,
      tooltipFillColor: "rgb(0,0,0)",
      interaction: {
         mode: "index",
         intersect: false,
      },

      plugins: {
         legend: {
            display: false,
         },
      },
      responsive: true,
      tooltips: {
         enabled: true,
         mode: "x-axis",
         intersect: false,
         padding: 2,
         caretPadding: 4,
         usePointStyle: true,
      },
      hover: {
         mode: "dataset",
         intersect: false,
         includeInvisible: true,
      },
      scales: {
         y: {
            min: -100,
            max: `${datas?.chart?.maxScore}`,
            display: false,
         },
         x: {
            ticks: {
               callback: function (val, index) {
                  return index % 2 === 0 ? this.getLabelForValue(val) : ""
               },
               padding: 0,
               textStrokeColor: "#fff",
               color: "#96979B",
            },
            alignToPixels: true,
         },
      },
   }

   const data2 = {
      labels,
      datasets: [
         {
            label: datas?.items[0]?.title,
            data: DataChart0?.map((e) => e.counter),
            borderColor: "#4A90E2",
            backgroundColor: "#fff",
            fill: false,
            tension: 0.5,
            borderWidth: 2,
            pointBorderWidth: 3,
            pointRadius: 3,
            pointHoverBackgroundColor: "#4A90E2",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 3,
            pointHoverRadius: 5.5,
            oder: 1,
            hoverRadius: 12,
            hoverBorderWidth: 3,
         },
         {
            label: datas?.items[1]?.title,
            data: DataChart1?.map((e) => e.counter),
            borderColor: "#27BD9C",
            backgroundColor: "#fff",
            fill: false,
            tension: 0.5,
            borderWidth: 2,
            pointBorderWidth: 3,
            pointRadius: 3,
            pointHoverBackgroundColor: "#27BD9C",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 3,
            pointHoverRadius: 5.5,
            hoverRadius: 12,
            oder: 2,
            hoverBorderWidth: 3,
         },
         {
            label: datas?.items[2]?.title,
            data: DataChart2?.map((e) => e.counter),
            borderColor: "#A64250",
            backgroundColor: "#fff",
            fill: false,
            tension: 0.5,
            borderWidth: 2,
            pointBorderWidth: 3,
            pointRadius: 3,
            pointHoverBackgroundColor: "#A64250",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 3,
            pointHoverRadius: 5.5,
            hoverRadius: 12,
            oder: 3,
            hoverBorderWidth: 3,
         },
      ],
   }

   return <Chart id={id} updateMode="resize" type="line" options={options} data={data2} />
})

export default CharHomeItem
