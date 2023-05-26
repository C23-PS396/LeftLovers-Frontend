import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useSwiperSlide } from "swiper/react";

const ActiveFoodCard = () => {
  const swiperSlide = useSwiperSlide();

  return (
    <Card
      className={`basis-[300px] grow ${
        swiperSlide.isNext
          ? "w-full"
          : "w-3/5 -translate-y-1/2 left-1/2 -translate-x-1/2 top-1/2"
      }`}
    >
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Sate Ayam</Heading>
          <Text color="blue.600" fontSize="2xl">
            Rp450.000
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ActiveFoodCard;
