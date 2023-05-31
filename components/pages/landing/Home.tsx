import { Button, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  return (
    <div id="home" className="flex items-center h-[calc(100%-56px)]">
      <div className="absolute left-0 -translate-y-1/2 lg:top-1/2 top-[30%] !z-[1]">
        <div className="lg:px-12 flex flex-col gap-4 z-100 px-6 - w-full">
          <Heading size="2xl" className="z-100">
            Test Bla bla bla
          </Heading>
          <Text className="text-[1rem] sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem] lg:max-w-[65%] max-w-[90%]">
            Be a part of us to save{" "}
            <span className="text-[#3182CE] font-bold">leftover food</span> and
            make the world a food waste free place.
          </Text>
          <Button
            className="!rounded-full w-fit !font-bold text-[1.2rem]"
            colorScheme="blue"
            onClick={() => router.push("/auth/register")}
          >
            Become our Partner!
          </Button>
        </div>
      </div>
      <div className="absolute cursor-pointer right-0 -translate-y-1/2 lg:top-1/2 top-[67%] !z-0 flex !justify-end">
        <Image
          src="/landing.png"
          alt="img"
          style={{
            boxShadow: "0px 0px 40px 3px rgba(0,0,0,0.12)",
            borderRadius: "1em 0 0 1em",
          }}
          className="overflow-x-hidden hover:scale-110 hover:-translate-x-10 transition-all duration-200 ease-in-out z-0 lg:w-[750px] w-[90%] md:w-[67%] sm:w-[80%]"
        ></Image>
      </div>
    </div>
  );
};

export default Home;
