import { Card, Heading, Image, Text } from "@chakra-ui/react";

const Values = () => {
  return (
    <div
      id="our-values"
      className="min-h-screen px-6 lg:px-12 flex flex-col items-center justify-center bg-[#3182cecc] py-12 lg:py-12 pb-[80px] relative"
    >
      <Heading size="2xl" className="text-[#FFF]">
        Our Values
      </Heading>
      <Text className="text-center lg:text-start !text-[1.1rem] !lg:text-[1.4rem] text-[#FFF] mt-4 font-bold">
        Every value ​​and mission that you need to know about us
      </Text>
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <Card className="bg-[#FFF] flex-1 max-w-[350px] gap-4 px-6 py-4">
          <div className="flex w-[80px]">
            <Image alt="discount" src="/bulb.png" />
          </div>
          <Heading className="!text-[1.1rem]">
            Provide <span className="text-[#BE5A83]">solutions</span> for food
            wasters
          </Heading>
          <Text>
            Reduce the impact of food waste in Indonesia from food vendors such
            as restaurants, hotels, or UMKM
          </Text>
        </Card>
        <Card className="bg-[#FFF] flex-1 max-w-[350px] gap-4 px-6 py-4">
          <div className="flex w-[80px]">
            <Image alt="dicount" src="/price-tag.png" />
          </div>
          <Heading className="!text-[1.1rem]">
            Discounted food <span className="text-[#BE5A83]">everyday</span>
          </Heading>
          <Text>
            We provide decent food from various merchants that are still
            suitable for consumption with a reasonable price
          </Text>
        </Card>
        <Card className="bg-[#FFF] flex-1 max-w-[350px] gap-4 px-6 py-4">
          <div className="flex w-[80px]">
            <Image alt="empowering" src="/protest.png" />
          </div>
          <Heading className="!text-[1.1rem]">
            <span className="text-[#BE5A83]">Empowering</span> UMKM
          </Heading>
          <Text>
            Assist food sellers in re-marketing their food waste in a place
            specifically for selling the food.
          </Text>
        </Card>
      </div>
      <div className="absolute bottom-0 w-full">
        <Image
          src="/Group 214.png"
          alt="img"
          className="!w-full overflow-x-hidden w-full"
        ></Image>
      </div>
    </div>
  );
};

export default Values;
