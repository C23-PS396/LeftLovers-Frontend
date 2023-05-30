import {
  Card,
  CardBody,
  CardFooter,
  FormControl,
  Button as Buttons,
  FormLabel,
  Heading,
  Image,
  Stack,
  Text,
  Skeleton,
  Wrap,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
  FormHelperText,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import AuthForm from "../AuthForm";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Category, FoodInput } from "@/components/type/Registration/FoodInput";
import axios from "axios";
import useCustomToast from "@/components/utils/useCustomToast";

const AddFoodPage = ({
  foodInput,
  submitForm,
  setFoodInput,
  setActiveStep,
}: {
  foodInput: FoodInput[];
  submitForm: () => void;
  setFoodInput: Dispatch<SetStateAction<FoodInput[]>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [food, setFood] = useState<FoodInput>({
    name: "",
    price: 0,
    category: [],
  });
  const [categoryOption, setCategoryOption] = useState<Category[]>();
  const [categoryMatch, setCategoryMatch] = useState<Category[]>();
  const [searchedString, setSearchedString] = useState<String>("");
  const toast = useCustomToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        setSelectedFiles(file);
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

  return (
    <>
      <AuthForm>
        <FormControl>
          <FormLabel>Food List</FormLabel>
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
                      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
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
                        <Buttons
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
                        </Buttons>
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
                          Caffè latte is a coffee beverage of Italian origin
                          made with espresso and steamed milk.
                        </Text>
                      </Skeleton>
                    </CardBody>

                    <CardFooter>
                      <Skeleton>
                        <Buttons variant="solid" colorScheme="red">
                          Remove
                        </Buttons>
                      </Skeleton>
                    </CardFooter>
                  </Stack>
                </Card>
              </Wrap>
            </>
          )}
        </FormControl>
        <FormControl>
          <div className="flex gap-4">
            <Buttons
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                setActiveStep(3);
              }}
            >
              Prev
            </Buttons>
            <Buttons onClick={onOpen} colorScheme="green">
              Add Food
            </Buttons>
            <Buttons
              colorScheme="blue"
              isDisabled={foodInput.length === 0}
              onClick={submitForm}
            >
              Submit
            </Buttons>
          </div>
        </FormControl>
      </AuthForm>
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
                <Buttons
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
                </Buttons>
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
            <Buttons
              colorScheme="blue"
              mr={3}
              isDisabled={!food.name || !food.price}
              onClick={() => {
                if (
                  food?.name &&
                  food?.price &&
                  foodInput.findIndex((el) => el.name === food.name) < 0
                ) {
                  const newFoodInput = foodInput.slice();
                  newFoodInput.push(food);
                  setFoodInput(newFoodInput);
                  setFood({ name: "", price: 0, category: [] });
                  onClose();
                }
              }}
            >
              Save
            </Buttons>
            <Buttons onClick={onClose}>Cancel</Buttons>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Dropzone = ({
  selectedFiles,
  handleFileChange,
  setSelectedFiles,
}: {
  selectedFiles: File | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setSelectedFiles: Dispatch<SetStateAction<File | null>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const removeFileHandler = (e: any) => {
    e.preventDefault();
    setSelectedFiles(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <label htmlFor="input">
      <div className="w-full h-[100px] rounded-lg border-2 border-dashed flex items-center justify-center">
        {selectedFiles ? (
          <div className="flex flex-col gap-2 text-center">
            <p className="text-[0.8rem] text-[#999]">{selectedFiles.name}</p>
            <div
              className="text-[0.8rem] text-[#CC252E] z-100 cursor-pointer"
              onClick={(e) => {
                removeFileHandler(e);
              }}
            >
              Remove
            </div>
          </div>
        ) : (
          <>
            <p className="text-[0.8rem] text-[#999]">
              Drop you file here, or select from{" "}
              <span className="text-[#537FE7] cursor-pointer">
                your desktop
              </span>
            </p>
          </>
        )}
      </div>
      <input
        type="file"
        id="input"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      ></input>
    </label>
  );
};

export default AddFoodPage;
