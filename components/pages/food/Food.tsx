import Container from "@/components/common/Container";
import {
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
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
    <Container className="bg-[#fff]">
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
      <Tabs isLazy className="mt-6" marginBottom="0" variant="unstyled">
        <TabList className="!mb-0" fontWeight="medium" color="#414D55" mb="1em">
          <Tab>All food</Tab>
          <Tab>Available Food</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="3px"
          bg="blue.500"
          className="rounded-full"
        />
        <TabPanels color="#414D55">
          <TabPanel>
            <div className="flex flex-wrap w-full gap-6 mt-4">
              {foods &&
                foods.map((foodItem) => {
                  return <FoodCard key={foodItem.id} food={foodItem} />;
                })}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-wrap w-full gap-6 mt-4">
              {foods &&
                foods.map((foodItem) => {
                  if (
                    foodItem.activeFood &&
                    foodItem.activeFood.isActive &&
                    foodItem.activeFood.stock &&
                    new Date(foodItem.activeFood.endTime) > new Date()
                  ) {
                    return <FoodCard key={foodItem.id} food={foodItem} />;
                  }
                })}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Food;
