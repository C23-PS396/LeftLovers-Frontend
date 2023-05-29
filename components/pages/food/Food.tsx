import Container from "@/components/common/Container";
import { Heading, Text } from "@chakra-ui/react";
import FoodCard from "./components/FoodCard";
import {
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import { useRouter } from "next/router";

const Food = () => {
  const { foods } = useMerchantDataContext() as MerchantDataContextState;
  const router = useRouter();

  return (
    <Container className="bg-[#F1F5F9]">
      <div className="flex justify-between w-full items-center">
        <Heading color="#414D55">Your Food</Heading>
        <Text
          color="#2C65F1"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => {
            router.push("/dashboard/food/add-food");
          }}
        >
          Add Food
        </Text>
      </div>
      <div className="flex flex-wrap w-full gap-6 mt-4">
        {foods &&
          foods.map((foodItem) => {
            return <FoodCard key={foodItem.id} food={foodItem} />;
          })}
      </div>
    </Container>
  );
};

export default Food;
