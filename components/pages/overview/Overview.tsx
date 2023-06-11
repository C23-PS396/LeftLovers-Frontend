import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Container from "@/components/common/Container";
import useWindowSize from "@/components/hook/useWindowSize";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import CartWrapper from "./components/Chart/ChartWrapper";
import { Heading, Text } from "@chakra-ui/react";
import DoughnutChart from "./components/Chart/DoughnutChart";
import BarChart from "./components/Chart/BarChart";
import Statistic from "./components/Chart/Statisitc";
import MerchantInformation from "./components/Chart/MerchantInformation";

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

  return (
    <Container className="bg-[#F1F5F9] flex flex-col gap-4">
      <Heading color="#414D55">Summary</Heading>
      <div className="flex gap-4 flex-col lg:flex-row">
        <CartWrapper className="w-full lg:w-1/2">
          <MerchantInformation />
        </CartWrapper>
        <CartWrapper className="w-full lg:w-1/2 !flex-col !gap-6">
          <Statistic />
        </CartWrapper>
      </div>
      <CartWrapper>
        <div className="w-full lg:w-2/5 flex flex-col items-center lg:block">
          <Text color="#414D55" fontWeight="bold">
            Transaction Summary
          </Text>
          <DoughnutChart />
        </div>
        <hr />
        <div className="w-full lg:w-3/5 flex flex-col items-center lg:block">
          <Text color="#414D55" fontWeight="bold">
            Merchant views vs Transaction
          </Text>
          <BarChart barWidth={barWidth} />
        </div>
      </CartWrapper>
    </Container>
  );
};

export default Overview;
