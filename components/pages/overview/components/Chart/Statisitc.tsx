import { StarIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";

const Statistic = () => {
  return (
    <>
      <div className="text-center lg:text-start">
        <Text color="#414D55" fontWeight="bolder">
          Total Revenue
        </Text>
        <Text fontSize="4xl" color="#414D55" fontWeight="bold">
          Rp50.000
        </Text>
      </div>
      <div className="flex justify-center gap-6 lg:gap-0 lg:justify-between">
        <div className="text-center lg:text-start">
          <Text color="#414D55" fontWeight="bolder">
            Total Order
          </Text>
          <Text fontSize="2xl" color="#414D55" fontWeight="bold">
            100.000
          </Text>
        </div>
        <div className="text-center lg:text-start">
          <Text color="#414D55" fontWeight="bolder">
            Review
          </Text>
          <Text
            color="#414D55"
            fontSize="2xl"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            gap="2"
          >
            4.5 <StarIcon />
          </Text>
        </div>
      </div>
    </>
  );
};

export default Statistic;
