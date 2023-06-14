import {
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const { statistic } = useMerchantDataContext() as MerchantDataContextState;
  return (
    <div className="h-[310px] w-fit">
      <Doughnut
        data={{
          labels: ["Success", "Failed", "Pending"],
          datasets: [
            {
              label: "# of Votes",
              data: [statistic?.success, statistic?.fail, statistic?.pending],
              backgroundColor: [
                "#27C9A9",
                "#E06469",
                "#DDD",
              ],
              borderColor: [
                "#20C0A0",
                "#E03030",
                "#90B0B0",
              ],
              borderWidth: 1,
            },
          ],
        }}
      ></Doughnut>
    </div>
  );
};

export default DoughnutChart;
