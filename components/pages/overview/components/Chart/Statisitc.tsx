import {
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import {
  numberFormatter,
  ratingFormatter,
  rupiahFormatter,
} from "@/components/utils/formatter";
import { StarIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";

const Statistic = () => {
  const { merchant } = useMerchantDataContext() as MerchantDataContextState;
  return (
    <>
      <div className="text-center lg:text-start">
        <Text color="#414D55" fontWeight="bolder">
          Total Revenue
        </Text>
        <Text fontSize="4xl" color="#414D55" fontWeight="bold">
          {rupiahFormatter.format(
            (merchant?.statistic?._sum.totalprice as number) || 0
          )}
        </Text>
      </div>
      <div className="flex justify-center gap-6 lg:gap-0 lg:justify-between">
        <div className="text-center lg:text-start">
          <Text color="#414D55" fontWeight="bolder">
            Total Order
          </Text>
          <Text fontSize="2xl" color="#414D55" fontWeight="bold">
            {numberFormatter
              .format(merchant?.statistic?._count.id || 0)
              .replaceAll(",", ".")}
          </Text>
        </div>
        <div className="text-center lg:text-start">
          <Text color="#414D55" fontWeight="bolder">
            Rating
          </Text>
          <Text
            color="#414D55"
            fontSize="2xl"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            gap="2"
          >
            {ratingFormatter.format(merchant?.rating?._avg?.rating || 0)}{" "}
            <StarIcon color="#FFCD3C" />
          </Text>
        </div>
      </div>
    </>
  );
};

export default Statistic;
