import { Food } from "@/components/context/MerchantDataContext";
import formatter from "@/components/utils/rupiahFormatter";
import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";

const FoodCard = ({ food }: { food: Food }) => {
  return (
    <Card className={`basis-[300px] grow`}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{food.name}</Heading>\
          <div className="flex gap-2 flex-wrap">
            {food.category.map((categoryItem) => {
              return (
                <div
                  className="rounded-lg px-2 py-1 bg-[#EEE] text-[0.7rem]"
                  key={categoryItem.id}
                >
                  {" "}
                  {categoryItem.name}
                </div>
              );
            })}
          </div>
          <Text color="blue.600" fontSize="2xl">
            {formatter.format(food.price)}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default FoodCard;
