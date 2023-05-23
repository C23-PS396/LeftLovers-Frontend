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
import AuthForm from "../AuthForm";
import Button from "@/components/common/Button";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { FoodInput } from "@/components/type/Registration/FoodInput";

const AddFoodPage = ({
  foodInput,
  setFoodInput,
  setActiveStep,
}: {
  foodInput: FoodInput[];
  setFoodInput: Dispatch<SetStateAction<FoodInput[]>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [food, setFood] = useState<FoodInput>();

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
            <Button
              type="outlined"
              onClick={() => {
                setActiveStep(3);
              }}
            >
              Prev
            </Button>
            <Button type="success" onClick={onOpen}>
              Add Food
            </Button>
            <Button type="primary" onClick={() => {}}>
              Submit
            </Button>
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
                  setFood({ ...(food as FoodInput), price: price });
                }}
              />
              <FormHelperText>
                Set your food price in Rupiah (Rp)
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Buttons
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (
                  food?.name &&
                  food?.price &&
                  foodInput.findIndex((el) => el.name === food.name) < 0
                ) {
                  const newFoodInput = foodInput.slice();
                  newFoodInput.push(food);
                  setFoodInput(newFoodInput);
                  setFood(undefined);
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

const Dropzone = ({
  selectedFiles,
  handleFileChange,
  setSelectedFiles,
}: {
  selectedFiles: File | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setSelectedFiles: Dispatch<SetStateAction<File | null>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const removeFileHandler = () => {
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
              onClick={removeFileHandler}
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
