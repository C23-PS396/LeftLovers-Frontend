import Container from "@/components/common/Container";
import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";

const Review = () => {
  const arr = [1, 2, 3, 4, 5, 6];

  return (
    <Container className="bg-[#F1F5F9]">
      <Heading color="#414D55" className="text-center">
        What your customers say?
      </Heading>
      <div className="pt-8 flex flex-wrap gap-4">
        {arr.map((el) => {
          return (
            <Card key={el} className="basis-[300px] grow">
              <CardHeader>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name="Segun Adebayo" />
                    <Box>
                      <Heading size="sm">Segun Adebayo</Heading>
                      <Text>Creator, Chakra UI</Text>
                    </Box>
                  </Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    // icon={<BsThreeDotsVertical />}
                  />
                </Flex>
              </CardHeader>
              <CardBody className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <Text className="font-bold">4.6</Text>
                  <StarIcon />
                </div>
                <Text>
                  With Chakra UI, I wanted to sync the speed of development with
                  the speed of design. I wanted the developer to be just as
                  excited as the designer to create a screen.
                </Text>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default Review;
