import {
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import { StarIcon } from "@chakra-ui/icons";
import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { startCase } from "lodash";
import LocationIcon from "../LocationIcon";

const TopFood = () => {
  const { merchant } = useMerchantDataContext() as MerchantDataContextState;
  const getLocation = () => {
    const location = `${merchant?.location.fullLocation}, ${
      merchant?.location.village
    }, ${merchant?.location.district}, ${startCase(
      merchant?.location.regency.toLocaleLowerCase()
    )}, ${startCase(merchant?.location.province.toLocaleLowerCase())}`;

    return location;
  };
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
              {merchant?.name}
            </Text>
            <div className="font-semibold">
              <Text>#{merchant?.id.split("-")[0].toUpperCase()}</Text>
            </div>
            <div className="flex mt-3">
              <Text>{getLocation()}</Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CardFood = () => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text
            color="blue.600"
            fontSize="lg"
            display="flex"
            alignItems="center"
            gap="2"
          >
            Rating 4.9 <StarIcon color="#FFCD3C" />
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TopFood;
