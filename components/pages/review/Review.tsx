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
  Text,
} from "@chakra-ui/react";

const Review = () => {
  const { review } = useMerchantDataContext() as MerchantDataContextState;
  
  return (
    <Container className="bg-[#F1F5F9]">
      <Heading color="#414D55" className="text-center">
        What your customers say?
      </Heading>
      <div className="pt-8 flex flex-wrap gap-4">
        {review?.map((el) => {
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
                        #{el.transactionId.split("-")[0].toUpperCase()}
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
                  <Text className="font-bold">{el.rating}</Text>
                  <StarIcon />
                </div>
                <Text>{el.review}</Text>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default Review;
