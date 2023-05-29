import Container from "@/components/common/Container";
import { Heading, Text } from "@chakra-ui/react";
import FoodCard from "./components/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import useWindowSize from "@/components/hook/useWindowSize";
import ActiveFoodCard from "./components/ActiveFoodCard";
import {
  MerchantDataContextState,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import { useRouter } from "next/router";

const Food = () => {
  const arr = [1, 2, 3, 4];
  const { foods } = useMerchantDataContext() as MerchantDataContextState;
  const { width } = useWindowSize();
  const router = useRouter();

  return (
    <Container className="bg-[#F1F5F9]">
      <div className="flex flex-col">
        <Heading color="#414D55">Available Food</Heading>
        <div className="flex flex-wrap w-full gap-6 mt-4">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            autoplay={{ delay: 1500 }}
            spaceBetween={50}
            slidesPerView={width < 768 ? 1 : arr.length > 3 ? 3 : 1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            onSlideChange={(swiper) => {
              const mod = swiper.activeIndex % arr.length;
              swiper.slideTo(mod);
            }}
            className={arr.length > 3 ? "sm:!py-12" : ""}
          >
            {arr.map((el) => {
              return (
                <SwiperSlide key={el}>
                  <ActiveFoodCard />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between w-full items-center">
          <Heading color="#414D55">Your Food</Heading>
          <Text
            color="#2C65F1"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => {
              router.push("/dashboard/food/add-food");
            }}
          >
            Add Food
          </Text>
        </div>
        <div className="flex flex-wrap w-full gap-6 mt-4">
          {foods &&
            foods.map((foodItem) => {
              return <FoodCard key={foodItem.id} food={foodItem} />;
            })}
        </div>
      </div>
    </Container>
  );
};

export default Food;
