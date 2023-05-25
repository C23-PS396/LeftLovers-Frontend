import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  CoreChartOptions,
  ElementChartOptions,
  ScaleChartOptions,
  DatasetChartOptions,
  PluginChartOptions,
  BarControllerChartOptions,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Container from "@/components/common/Container";
import useWindowSize from "@/components/hook/useWindowSize";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import CartWrapper from "./components/Chart/ChartWrapper";
import { Text } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  let size = useWindowSize();
  const [barWidth, setBarWidth] = useState(45);

  useEffect(() => {
    if (size.width < 450) {
      setBarWidth(22);
    } else if (size.width < 640) {
      setBarWidth(28);
    } else if (size.width < 768) {
      setBarWidth(35);
    } else {
      setBarWidth(45);
    }
  }, [size.width]);

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
        borderRadius: 10, // Set the desired border radius value
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
    <Container className="bg-[#F1F5F9]">
      <CartWrapper>
        <div className="w-full lg:w-2/5 flex flex-col items-center lg:block">
          <Text fontWeight="bold">Trassaction Summary</Text>
          <div className="h-[310px] w-fit">
            <Doughnut
              data={{
                labels: ["Success", "Failed", "Pending"],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [12, 19, 3],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            ></Doughnut>
          </div>
        </div>
        <hr />
        <div className="w-full lg:w-3/5 flex flex-col items-center lg:block">
          <Text fontWeight="bold">Merchant views vs Transaction</Text>
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
        </div>
      </CartWrapper>
    </Container>
  );
};

export default Overview;
