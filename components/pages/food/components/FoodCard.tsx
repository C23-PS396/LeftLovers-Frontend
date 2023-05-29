import {
  ActiveFood,
  Food,
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import formatter from "@/components/utils/rupiahFormatter";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Image,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import StatusWrapper, { STATUS } from "../../order/components/StatusWrapper";
import { useState } from "react";
import useCustomToast from "@/components/utils/useCustomToast";
import axios from "axios";

const FoodCard = ({ food }: { food: Food }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [stock, setStock] = useState(0);
  const [durationInHour, setDurationInHour] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(food.price);
  const toast = useCustomToast();
  const { merchant, foods, setFoods } =
    useMerchantDataContext() as MerchantDataContextState;

  const onSubmit = async () => {
    if (!stock || !durationInHour || !discountPrice) {
      toast({
        type: "error",
        title: "Missing field",
        message: "Fill all field!",
      });
      return;
    }
    const response = await axios.post("/api/food/active", {
      merchantId: merchant?.id,
      foods: [
        { foodId: food.id, stock: stock, durationInHour: durationInHour },
      ],
    });

    if (response.status === 201) {
      toast({
        type: "success",
        title: "Success",
        message: "Food successfully Activated!",
      });
      if (foods) {
        const idx = foods?.findIndex((el) => el.id === food.id) as number;
        const newFoods = foods.slice();
        const changedFood = foods[idx];
        changedFood.activeFood = {
          ...changedFood.activeFood,
          stock: stock,
          isActive: true,
          endTime: new Date(new Date().getTime() + durationInHour * 60 * 60),
        };

        setFoods(newFoods);
      }
    } else {
      toast({
        type: "error",
        title: "Error",
        message: "Internal Server Error",
      });
    }

    setIsEdit(false);
  };

  return (
    <Card className={`basis-[250px] grow`}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <div className="flex justify-between items-center cursor-pointer">
            <Heading size="md" className="max-w-[75%] truncate">
              {food.name}
            </Heading>
            {isEdit ? (
              <div className="flex gap-4">
                <CloseIcon
                  color="red.500"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                />
                <CheckIcon color="green.500" onClick={onSubmit} />
              </div>
            ) : (
              <EditIcon
                onClick={() => {
                  setIsEdit(true);
                }}
                color="blue.500"
              />
            )}
          </div>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <FormControl>
                <FormLabel fontWeight="bold">Stock</FormLabel>
                <NumberInput>
                  <NumberInputField
                    onChange={(e) => setStock(Number(e.currentTarget.value))}
                    value={stock}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Duration (inHour)</FormLabel>
                <NumberInput>
                  <NumberInputField
                    onChange={(e) =>
                      setDurationInHour(Number(e.currentTarget.value))
                    }
                    value={durationInHour}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Discount Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon>Rp</InputLeftAddon>
                  <NumberInput value={Number(discountPrice)}>
                    <NumberInputField
                      onChange={(e) => {
                        setDiscountPrice(Number(e.currentTarget.value));
                      }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>
            </div>
          ) : (
            <>
              <div>
                <StatusWrapper
                  className="text-[0.7rem] !px-2"
                  status={
                    food.activeFood &&
                    food.activeFood.isActive &&
                    food.activeFood.stock &&
                    new Date(food.activeFood.endTime) > new Date()
                      ? STATUS.ACCEPT
                      : STATUS.FAIL
                  }
                >
                  {food.activeFood &&
                  food.activeFood.isActive &&
                  food.activeFood.stock &&
                  new Date(food.activeFood.endTime) > new Date()
                    ? "Available"
                    : "Not Available"}
                </StatusWrapper>
              </div>
              <div className="flex flex-col gap-2">
                <Text className="text-[0.9rem] font-bold">Category</Text>
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
                  {food.category.length === 0 && (
                    <Text className="text-[0.8rem]">None</Text>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <Text className="text-[0.9rem] font-bold">Price</Text>
                <Text color="blue.600" fontSize="2xl">
                  {formatter.format(food.price)}
                </Text>
              </div>{" "}
            </>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default FoodCard;
