import {
  BarControllerChartOptions,
  ChartData,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { Bar } from "react-chartjs-2";

const BarChart = ({ barWidth }: { barWidth: number }) => {
  const labels = ["January", "February", "March", "April", "May"];

  const options = {
    maintainAspectRatio: false,
    borderRadius: 7,
    scales: {
      x: {
        ticks: {
          font: {
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        borderRadius: 10,
      },
      tooltip: {
        displayColors: false,
        backgroundColor: "#5C85FF",
        titleColor: "#FFF",
        titleAlign: "center",
        titleFont: "normal",
        bodyColor: "#FFF",
        bodyAlign: "center",
      },
    },
    offset: false,
    height: 550,
    animation: {
      duration: 1000,
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Click on Merchant",
        data: [1, 2, 5, 4, 3],
        backgroundColor: "#2C65F1",
        barThickness: "flex",
        maxBarThickness: barWidth,
        minBarLength: 20,
      },
      {
        label: "Transaction",
        data: [1, 1, 2, 3, 3],
        backgroundColor: "#27C9A9",
        barThickness: "flex",
        maxBarThickness: barWidth,
        minBarLength: 20,
      },
    ],
  };
  return (
    <div className="h-[310px]">
      <Bar
        options={
          options as _DeepPartialObject<
            CoreChartOptions<"bar"> &
              ElementChartOptions<"bar"> &
              PluginChartOptions<"bar"> &
              DatasetChartOptions<"bar"> &
              ScaleChartOptions<"bar"> &
              BarControllerChartOptions
          >
        }
        data={data as ChartData<"bar", number[], string>}
      />
    </div>
  );
};

export default BarChart;
