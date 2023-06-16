import { Image, Heading, Card } from "@chakra-ui/react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import useWindowSize from "@/components/hook/useWindowSize";

const Team = () => {
  const { width } = useWindowSize();
  const data = [
    {
      imgUrl:
        "https://drive.google.com/u/0/uc?id=1Uw6Kcj6IFynv3JRpwjBLRFbKU6EfyNpg&export=download",
      alt: "rai",
      name: "Rainata Putra",
      caption: `&quot;Makmur is a different inovation. I&apos;m excited to see
      the app making a positive impact in reducing food waste.&quot;`,
    },
    {
      imgUrl:
        "https://drive.google.com/u/0/uc?id=16YrExv16k0KtHJnwtoDEgffX31n0YdD-&export=download",
      alt: "amin",
      name: "Muhammad Amin",
      caption: `&quot;It&apos;s great to know that our work directly addresses
        the issue of food waste and promotes sustainability.&quot;`,
    },
    {
      imgUrl:
        "https://drive.google.com/u/0/uc?id=1X43SpQpfz4Z56QveFTwcefFJFxQB6JYF&export=download",
      alt: "indra",
      name: "Indra Mahaarta",
      caption: `&quot;The Makmur app is a project I&apos;m truly proud to be a part of. I hope Makmur becomes a powerful tool in combating food waste globally.&quot`,
    },
    {
      imgUrl:
        "https://drive.google.com/u/0/uc?id=1kGxQz4A5WBt1EZ2-R9Izg4oRJWJL-qUe&export=download",
      alt: "lintang",
      name: "Lintang Syuhada",
      caption: `&quot;It&apos;s amazing to think that our app can make a difference in reducing food waste by making it easier for people to find and purchase leftover food.&quot`,
    },
    {
      imgUrl:
        "https://drive.google.com/u/0/uc?id=1Uw6Kcj6IFynv3JRpwjBLRFbKU6EfyNpg&export=download",
      alt: "adlan",
      name: "Adlan Walid",
      caption: `&quot;A well-designed app raises awareness about reducing food waste and that is Makmur.&quot`,
    },
    {
      imgUrl:
        "https://drive.google.com/u/0/uc?id=1Uw6Kcj6IFynv3JRpwjBLRFbKU6EfyNpg&export=download",
      alt: "jason",
      name: "Jason Widodo",
      caption: `&quot;Our app has the potential to create a significant change by connecting people with leftover food that would have otherwise gone to waste.&quot`,
    },
  ];
  return (
    <div
      id="team"
      className="px-6 lg:px-12 text-center items-center justify-center bg-[#3182cecc] py-12 lg:py-12 pb-[80px] bg-[#E6F0F9] mx-auto"
    >
      <Heading className="mb-8">Makmur Team</Heading>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={width < 1190 ? 1 : 3}
        navigation
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="px-8 relative h-full"
      >
        {data.map((user) => {
          return (
            <SwiperSlide key={user.alt} className="mx-auto pb-10 h-full">
              <Card className="bg-white text-[#1a202c] flex h-[380px]  rounded-md  drop-shadow-lg w-full !mx-auto max-w-[75%] py-4">
                {/* <div className="mx-auto w-24 h-24 rounded-full bg-white text-black overflow-hidden"> */}
                <Image
                  className="w-full h-full object-cover rounded-full mx-auto"
                  w={24}
                  h={24}
                  src={user.imgUrl}
                  alt={user.alt}
                />
                {/* </div> */}
                <div className="text-black mx-auto w-3/4 py-5">
                  <div className="text-black text-center text-2xl">
                    {user.name}
                  </div>
                  <div className="text-black text-center">M038DSX1743</div>
                  <div
                    dangerouslySetInnerHTML={{ __html: user.caption }}
                    className="whitespace-normal text-black text-center mt-5 font-serif truncate"
                  ></div>
                </div>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Team;
