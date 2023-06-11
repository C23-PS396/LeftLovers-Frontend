import {
  Food,
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
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
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import StatusWrapper, { STATUS } from "../../order/components/StatusWrapper";
import { useState } from "react";
import useCustomToast from "@/components/utils/useCustomToast";
import axios from "axios";
import ActivateFoodIcon from "./ActivateFoodIcon";
import { rupiahFormatter } from "@/components/utils/formatter";

const FoodCard = ({ food }: { food: Food }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [stock, setStock] = useState(0);
  const [durationInHour, setDurationInHour] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(food.price);
  const toast = useCustomToast();
  const { merchant, getFood } =
    useMerchantDataContext() as MerchantDataContextState;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
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
      getFood();
      toast({
        type: "success",
        title: "Success",
        message: "Food successfully Activated!",
      });
    } else {
      toast({
        type: "error",
        title: "Error",
        message: "Internal Server Error",
      });
    }
    setIsEdit(false);
    setIsLoading(false);
  };

  const deleteFoodHandler = async (id: string) => {
    try {
      const res = await axios.delete("/api/food", {
        params: { merchantId: id },
      });

      const { message } = res.data.data;

      toast({
        type: "success",
        title: "Success",
        message: message,
      });

      getFood();
    } catch (err) {
      toast({
        type: "warning",
        title: "Failed",
        message: "Failed when deleting food",
      });
    }
  };

  const isAvail = (food: Food) => {
    return (
      food.activeFood &&
      food.activeFood.isActive &&
      food.activeFood.stock &&
      new Date(food.activeFood.endTime) > new Date()
    );
  };

  return (
    <Card className={`basis-[250px] grow`}>
      <CardBody>
        <Image
          src={
            food.pictureUrl ||
            `https://storage.googleapis.com/bucket-ps396/not-found-image.jpeg`
          }
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          className="object-cover mx-auto aspect-[4/3]"
        />
        <Stack mt="6" spacing="3">
          <div className="flex justify-between items-center">
            <Heading size="md" className="max-w-[75%] truncate">
              {food.name}
            </Heading>
            {isEdit ? (
              <div className="flex gap-4">
                <Tooltip label="Cancel" placement="auto-start" hasArrow>
                  <CloseIcon
                    color="red.500"
                    onClick={() => {
                      setIsEdit(false);
                    }}
                    className="cursor-pointer"
                  />
                </Tooltip>
                {isLoading ? (
                  <Spinner size="sm"></Spinner>
                ) : (
                  <Tooltip label="Save" placement="auto-start" hasArrow>
                    <CheckIcon
                      color="green.500"
                      className="cursor-pointer"
                      onClick={onSubmit}
                    />
                  </Tooltip>
                )}
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                {!isAvail(food) && (
                  <Tooltip
                    label="Make your food available"
                    placement="auto-start"
                    hasArrow
                  >
                    <div
                      onClick={() => {
                        setIsEdit(true);
                      }}
                      className="flex max-w-[16px] cursor-pointer"
                    >
                      <ActivateFoodIcon />
                    </div>
                  </Tooltip>
                )}
                <Tooltip
                  label="Delete your food"
                  placement="auto-start"
                  hasArrow
                >
                  <DeleteIcon
                    onClick={() => {
                      deleteFoodHandler(food.id);
                    }}
                    color="red.500"
                    className="cursor-pointer"
                  />
                </Tooltip>
              </div>
            )}
          </div>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <FormControl>
                <FormLabel fontWeight="bold" fontSize="0.9rem">
                  Stock
                </FormLabel>
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
                <FormLabel fontWeight="bold" fontSize="0.9rem">
                  Duration (in Hour)
                </FormLabel>
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
                <FormLabel fontWeight="bold" fontSize="0.9rem">
                  Discount Price
                </FormLabel>
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
                  status={isAvail(food) ? STATUS.ACCEPT : STATUS.FAIL}
                >
                  {isAvail(food) ? "Available" : "Not Available"}
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
                  {rupiahFormatter.format(food.price)}
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
