import { Category, FoodInput } from "@/components/type/Registration/FoodInput";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Dropzone } from "../auth/components/Registration/AddFoodPage";
import { CheckIcon } from "@chakra-ui/icons";
import useCustomToast from "@/components/utils/useCustomToast";
import axios from "axios";
import {
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import { useRouter } from "next/router";
import Container from "@/components/common/Container";
import { v4 as uuidv4 } from "uuid";

const AddFood = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [food, setFood] = useState<FoodInput>({
    name: "",
    price: 0,
    category: [],
    pictureUrl: undefined,
  });
  const [foodInput, setFoodInput] = useState<FoodInput[]>([]);
  const [categoryOption, setCategoryOption] = useState<Category[]>();
  const [categoryMatch, setCategoryMatch] = useState<Category[]>();
  const [searchedString, setSearchedString] = useState<String>("");
  const { merchant, getFood } =
    useMerchantDataContext() as MerchantDataContextState;
  const toast = useCustomToast();
  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      const blob = file.slice(0, file.size, "image/png");
      const newFile = new File([blob], `${uuidv4()}`, { type: "image/png" });
      if (file) {
        setSelectedFiles(newFile);
        return;
      }
    }
    setSelectedFiles(null);
  };

  const getCategory = async () => {
    const response = await axios.get("/api/food/getAllCategory");
    const { data }: { data: Category[] } = response.data;
    setCategoryOption(data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (searchedString && searchedString !== "") {
      const regex = new RegExp(searchedString as string, "i");

      let matches = categoryOption?.filter((item) => regex.test(item.name));
      if (matches && matches.length > 5) {
        matches = matches.splice(0, 5);
      }
      setCategoryMatch(matches);
    }
  }, [categoryOption, searchedString]);

  const uploadFile = async () => {
    if (selectedFiles) {
      let formData = new FormData();
      formData.append("imgFile", selectedFiles);

      const res = await axios.post(
        `https://leftlovers-backend-nqh3dgyegq-et.a.run.app/api/v1/upload`,
        formData
      );

      if (res.status === 200) {
        return `https://storage.googleapis.com/bucket-ps396/${selectedFiles.name}`;
      }
    }

    return null;
  };

  const saveFile = async () => {
    if (
      food?.name &&
      food?.price &&
      foodInput.findIndex((el) => el.name === food.name) < 0
    ) {
      const fileUrl = await uploadFile();
      const newFoodInput = foodInput.slice();
      newFoodInput.push({ ...food, pictureUrl: fileUrl as string });
      setFoodInput(newFoodInput);
      setSelectedFiles(null);
      setFood({
        name: "",
        price: 0,
        category: [],
        pictureUrl: undefined,
      });
      onClose();
      return;
    }
  };

  const submitFood = async () => {
    try {
      await axios.post("/api/food", {
        merchantId: merchant?.id,
        foods: foodInput,
      });

      getFood();

      toast({
        type: "success",
        message: "Success!",
        title: "Food has successfully registered",
      });
    } catch (error: any) {
      toast({
        type: "error",
        message: "Failed to register you food",
        title: "Error occurred while registering food",
      });
    }
    router.push("/dashboard/food");
  };

  return (
    <Container className="max-w-[800px] w-full mx-auto">
      <FormControl>
        <Heading>Food List</Heading>
        <div className="flex flex-col gap-2">
          {foodInput.map((food) => {
            return (
              <div key={food.name}>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={food.pictureUrl}
                    alt="Caffe Latte"
                  />
                  <Stack>
                    <CardBody gap={2} display="flex" flexDirection="column">
                      <Heading size="md">{food.name}</Heading>
                      <div className="flex gap-2 flex-wrap">
                        {food.category.map((categoryItem) => {
                          return (
                            <div
                              className="rounded-lg px-2 py-1 bg-[#EEE] text-[0.7rem]"
                              key={categoryItem}
                            >
                              {" "}
                              {categoryItem}
                            </div>
                          );
                        })}
                      </div>
                      <Text py="2">Rp{food.price}</Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        onClick={() => {
                          const idx = foodInput.findIndex(
                            (curFood) => curFood.name === food.name
                          );
                          const newFoodInput = foodInput.slice();
                          newFoodInput.splice(idx, 1);
                          setFoodInput(newFoodInput);
                        }}
                      >
                        Remove
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              </div>
            );
          })}
        </div>
        {foodInput.length === 0 && (
          <>
            <Wrap display="flex" flexDirection="column" textAlign="center">
              <Text textAlign="center" width="full" fontWeight="bold">
                Add your food first!
              </Text>
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                width="full"
              >
                <Skeleton>
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                    alt="Caffe Latte"
                  />
                </Skeleton>

                <Stack>
                  <CardBody gap={2} display="flex" flexDirection="column">
                    <Skeleton>
                      <Heading size="md">The perfect latte</Heading>
                    </Skeleton>
                    <Skeleton>
                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </Skeleton>
                  </CardBody>

                  <CardFooter>
                    <Skeleton>
                      <Button variant="solid" colorScheme="red">
                        Remove
                      </Button>
                    </Skeleton>
                  </CardFooter>
                </Stack>
              </Card>
            </Wrap>
          </>
        )}
      </FormControl>
      <FormControl>
        <div className="flex gap-4 mt-4">
          <Button
            colorScheme="red"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button onClick={onOpen} colorScheme="green">
            Add Food
          </Button>
          <Button
            colorScheme="blue"
            isDisabled={foodInput.length === 0}
            onClick={submitFood}
          >
            Submit
          </Button>
        </div>
      </FormControl>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Your Food</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Photo</FormLabel>
              <Dropzone
                handleFileChange={handleFileChange}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Food Name</FormLabel>
              <Input
                value={food?.name}
                placeholder="Food name"
                onChange={(e) => {
                  const foodName = e.currentTarget.value;
                  setFood({ ...(food as FoodInput), name: foodName });
                }}
                type="text"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                value={food?.price}
                placeholder="Price"
                type="number"
                onChange={(e) => {
                  const price = e.currentTarget.value as unknown as number;
                  setFood({ ...(food as FoodInput), price: price as number });
                }}
              />
              <FormHelperText>
                Set your food price in Rupiah (Rp)
              </FormHelperText>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Food Category</FormLabel>
              <div className="mb-2 flex flex-wrap gap-2">
                {food?.category.map((category) => {
                  return (
                    <div
                      key={category}
                      onClick={() => {
                        const idx = food.category.findIndex(
                          (el) => el === category
                        );
                        let currentList = food.category;
                        currentList.splice(idx, 1);
                        setFood({ ...food, category: currentList });
                      }}
                      className="rounded-lg bg-[#EEE] px-2 py-1 text-[0.7rem] cursor-pointer w-fit hover:bg-[#CC252E] hover:text-[#FFF]"
                    >
                      {category}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4">
                <Input
                  type="text"
                  value={searchedString as any}
                  onChange={(e) => {
                    setSearchedString(e.currentTarget.value);
                  }}
                />
                <Button
                  colorScheme="green"
                  isDisabled={searchedString === "" || !searchedString}
                  onClick={() => {
                    let curList = food?.category.slice();
                    if (
                      curList.findIndex(
                        (listCategory) => listCategory === searchedString
                      ) >= 0
                    ) {
                      toast({
                        type: "error",
                        message: "Category already exist",
                        title: "Category error",
                      });
                      return;
                    }

                    if (curList) {
                      curList.push(searchedString as string);
                    } else {
                      curList = [searchedString as string];
                    }
                    setFood({
                      ...food,
                      category: curList,
                    });
                    setSearchedString("");
                  }}
                >
                  <CheckIcon />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {(searchedString !== "" || searchedString) &&
                  categoryMatch?.map((el) => {
                    return (
                      <div
                        key={el.name}
                        className="rounded-lg bg-[#CCC] px-2 py-1 text-[0.7rem] cursor-pointer"
                        onClick={() => {
                          let curList = food?.category.slice();
                          if (
                            curList.findIndex(
                              (listCategory) => listCategory === el.name
                            ) >= 0
                          ) {
                            toast({
                              type: "error",
                              message: "Category already exist",
                              title: "Category error",
                            });
                            return;
                          }

                          if (curList) {
                            curList.push(el.name);
                          } else {
                            curList = [el.name];
                          }
                          setFood({
                            ...food,
                            category: curList,
                          });
                          setSearchedString("");
                        }}
                      >
                        {el.name}
                      </div>
                    );
                  })}
              </div>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={!food.name || !food.price}
              onClick={saveFile}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AddFood;
