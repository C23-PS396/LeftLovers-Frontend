import Container from "@/components/common/Container";
import {
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";

const Review = () => {
  const { review } = useMerchantDataContext() as MerchantDataContextState;

  return (
    <Container className="bg-[#F1F5F9]">
      <Heading color="#414D55" className="text-center">
        What your customers say?
      </Heading>
      {review?.length === 0 && (
        <div className="w-full flex flex-col gap-4 justify-center items-center mt-10">
          <Image
            src="/empty-state.png"
            alt="empty-state"
            className="max-w-[500px] w-full"
          ></Image>
          <Text className="text-[1.2rem] font-medium text-[#414D55]">
            You don&apos;t have any review yet
          </Text>
        </div>
      )}
      <div className="pt-8 flex flex-wrap gap-4">
        {review?.map((el) => {
          if (el.isFilled) {
            return (
              <Card key={el.id} className="basis-[300px] grow">
                <CardHeader>
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        name={el.customer.fullname || el.customer.username}
                      />
                      <Box>
                        <Heading size="sm">
                          {el.customer.fullname || el.customer.username}
                        </Heading>
                        <Text>
                          {el.transactionId.split("-")[0].toUpperCase()}
                        </Text>
                      </Box>
                    </Flex>
                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                    />
                  </Flex>
                </CardHeader>
                <CardBody className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <Text className="font-bold mr-2">{el.rating}</Text>
                    {Array.from({ length: el.rating }, (_, index) => (
                      <StarIcon color="#FFCD3C" key={index} />
                    ))}
                  </div>
                  <Text>{el.review}</Text>
                </CardBody>
              </Card>
            );
          }
        })}
      </div>
    </Container>
  );
};

export default Review;
