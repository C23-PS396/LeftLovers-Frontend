import { Button, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  return (
    <div id="home" className="h-screen flex items-end relative">
      <div className="absolute left-0 -translate-y-1/2 lg:top-1/2 top-[30%] !z-[2]">
        <div className="lg:px-12 flex flex-col gap-4 z-100 px-6 - w-full">
          <Heading size="2xl" className="z-100 flex gap-2">
            Saving{" "}
            <div className="relative">
              <div
                className="animate-wiggle absolute top-1/2 left-1/2 -translate-y-1/2"
                style={{ animationDelay: "-6s" }}
              >
                Food.
              </div>
              <div
                className="animate-wiggle absolute top-1/2 left-1/2 -translate-y-1/2"
                style={{ animationDelay: "-4s" }}
              >
                Money.
              </div>
              <div
                className="animate-wiggle absolute top-1/2 left-1/2 -translate-y-1/2 w-max"
                style={{ animationDelay: "-2s" }}
              >
                The Planet.
              </div>
            </div>
          </Heading>
          <Text className="text-[1rem] sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem] lg:max-w-[55%] max-w-[90%]">
            Embrace sustainability. Unlock savings. Fight food waste. Together,
            let&apos;s make a difference for a <span>greener future.</span>
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
      <div className="absolute cursor-pointer -right-8 -translate-y-1/2 lg:top-1/2 top-[67%] !z-[1] flex !justify-end">
        <Image
          src="/landing-2.png"
          alt="img"
          style={{
            boxShadow: "0px 0px 40px 3px rgba(0,0,0,0.12)",
            borderRadius: "1em 0 0 1em",
          }}
          className="overflow-x-hidden hover:scale-110 hover:-translate-x-10 transition-all duration-200 ease-in-out z-0 lg:w-[750px] w-[90%] md:w-[67%] sm:w-[80%]"
        ></Image>
      </div>
      <div className="relative !w-full">
        <div className="absolute bottom-0 w-full">
          <Image
            src="/Group 6.png"
            alt="img"
            className="!w-full overflow-x-hidden w-full"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Home;
