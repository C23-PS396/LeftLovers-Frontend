import Container from "@/components/common/Container";
import { Heading } from "@chakra-ui/react";
import FoodCard from "./components/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import useWindowSize from "@/components/hook/useWindowSize";
import ActiveFoodCard from "./components/ActiveFoodCard";

const Food = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
  const { width } = useWindowSize();
  return (
    <Container className="bg-[#F1F5F9]">
      <div className="flex flex-col">
        <Heading color="#414D55">Active Food</Heading>
        <div className="flex flex-wrap w-full gap-6 mt-4">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={width < 768 ? 1 : 3}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            loop={true}
            onSlideChange={(swiper) => {
              const mod = swiper.activeIndex % arr.length;
              swiper.slideTo(mod);
            }}
            className="sm:!py-12"
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
        <Heading color="#414D55">Your Food</Heading>
        <div className="flex flex-wrap w-full gap-6 mt-4">
          {arr2.map((el) => {
            return <FoodCard key={el} />;
          })}
        </div>
      </div>
    </Container>
  );
};

export default Food;
