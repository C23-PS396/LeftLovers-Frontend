import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  return (
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
  );
};

export default DoughnutChart;
