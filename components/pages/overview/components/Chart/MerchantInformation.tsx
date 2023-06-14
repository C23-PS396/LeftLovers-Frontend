/* eslint-disable react-hooks/exhaustive-deps */
import {
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import useCustomToast from "@/components/utils/useCustomToast";
import { CopyIcon } from "@chakra-ui/icons";
import { Image, Text, useClipboard } from "@chakra-ui/react";
import { startCase } from "lodash";
import { useEffect } from "react";

const MerchantInformation = () => {
  const { onCopy, value, setValue } = useClipboard("");
  const { merchant } = useMerchantDataContext() as MerchantDataContextState;
  const toast = useCustomToast();

  const getLocation = () => {
    const location = `${merchant?.location.fullLocation}, ${
      merchant?.location.village
    }, ${merchant?.location.district}, ${startCase(
      merchant?.location.regency.toLocaleLowerCase()
    )}, ${startCase(merchant?.location.province.toLocaleLowerCase())}`;

    return merchant ? location : "-";
  };

  const getId = () => {
    return merchant ? `${merchant?.id.split("-")[0].toUpperCase()}` : "-";
  };

  useEffect(() => {
    if (value) {
      onCopy();
      toast({
        type: "info",
        title: "Copy success",
        message: "Merchant id has been successfully copied",
      });
    }
  }, [value]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex lg:flex-row flex-col gap-8 w-full">
          <div className="flex !rounded-lg aspect-square mx-auto w-[200px]">
            <Image
              borderRadius="5px"
              src={merchant?.profilePictureUrl}
              alt="merchant-photo"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col text-center lg:text-start">
            <Text className="font-bold sm:text-[1.1rem] md:text-[1.2rem] lg:text-[1.3rem]">
              {merchant?.name || "-"}
            </Text>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Text>{getId()}</Text>
              <CopyIcon
                className="cursor-pointer"
                onClick={() => {
                  setValue(merchant?.id as string);
                }}
              />
            </div>
            <Text className="mt-4">{getLocation()}</Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantInformation;
