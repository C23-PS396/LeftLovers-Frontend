import {
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
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
  const { statistic } = useMerchantDataContext() as MerchantDataContextState;

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
        backgroundColor: "#DDD",
        titleColor: "#333",
        titleAlign: "center",
        titleFont: "normal",
        bodyColor: "#333",
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
    labels: statistic?.month,
    datasets: [
      {
        label: "Statistic",
        data: statistic?.data,
        backgroundColor: "#3182CE",
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
