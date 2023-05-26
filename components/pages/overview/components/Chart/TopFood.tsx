import { StarIcon } from "@chakra-ui/icons";
import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";

const TopFood = () => {
  return (
    <>
      <div className="flex flex-col">
        <Text fontWeight="bold" mb="2" className="text-center lg:text-start">
          Top Food
        </Text>
        <div className="flex gap-2">
          <CardFood />
          <CardFood />
          <CardFood />
        </div>
      </div>
    </>
  );
};

const CardFood = () => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text
            color="blue.600"
            fontSize="lg"
            display="flex"
            alignItems="center"
            gap="2"
          >
            Rating 4.9 <StarIcon />
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TopFood;
