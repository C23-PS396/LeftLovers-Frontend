/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Heading,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import HeaderWrapper from "./components/HeaderWrapper";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import AccountInformationPage from "./components/Registration/AccountInformationPage";
import {
  Bank,
  BankAccountInput,
} from "@/components/type/Registration/BankAccountInput";
import {
  District,
  MerchantInformationInput,
  Province,
  Regency,
  Village,
} from "@/components/type/Registration/MerchantinformationInput";
import BankAccountInformationPage from "./components/Registration/BankAccountInformationPage";
import MerchantInformationPage from "./components/Registration/MerchantInformationPage";
import ContactInformationInput from "@/components/type/Registration/ContactInformationInput";
import AddFoodPage from "./components/Registration/AddFoodPage";
import { FoodInput } from "@/components/type/Registration/FoodInput";

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Bank Account" },
  { title: "Third", description: "Merchant" },
  { title: "Fourt", description: "Add Some Food" },
];

const Register = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  const router = useRouter();
  const [bank, setBank] = useState<Bank[]>([]);
  const [province, setProvince] = useState<Province[]>([]);
  const [regency, setRegency] = useState<Regency[]>([]);
  const [district, setDistrict] = useState<District[]>([]);
  const [village, setVillage] = useState<Village[]>([]);

  const [accountInput, setAccountInput] = useState<ContactInformationInput>();
  const [bankInput, setBankInput] = useState<BankAccountInput>();
  const [merchantInput, setMerchantInput] =
    useState<MerchantInformationInput>();
  const [foodInput, setFoodInput] = useState<FoodInput[]>([]);

  const getBank = async () => {
    const res = await axios.get("/api/bank");
    const { data } = res.data;
    setBank(data);
  };

  const getProvince = async () => {
    const res = await axios.get("/api/location/province");
    const { data } = res.data;
    setProvince(data);
  };

  const getRegency = async () => {
    if (merchantInput?.province) {
      const res = await axios.post("/api/location/regency", {
        provinceId: merchantInput.province?.id,
      });
      const { data } = res.data;
      setRegency(data);
    }
  };

  const getDistrict = async () => {
    if (merchantInput?.regency) {
      const res = await axios.post("/api/location/district", {
        regencyId: merchantInput.regency?.id,
      });
      const { data } = res.data;
      setDistrict(data);
    }
  };

  const getVillage = async () => {
    if (merchantInput?.district) {
      const res = await axios.post("/api/location/village", {
        districtId: merchantInput.district?.id,
      });
      const { data } = res.data;
      setVillage(data);
    }
  };

  useEffect(() => {
    getRegency();
  }, [merchantInput?.province]);

  useEffect(() => {
    getDistrict();
  }, [merchantInput?.regency]);

  useEffect(() => {
    getVillage();
  }, [merchantInput?.district]);

  useEffect(() => {
    getBank();
    getProvince();
  }, []);

  return (
    <div className="w-full min-h-screen px-2 py-8 flex flex-col items-center gap-8 mt-12 box-border">
      <HeaderWrapper>
        <Heading>Register</Heading>
        <Text>
          Already have an account?{" "}
          <span
            className="text-[#FFB84C] cursor-pointer"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Sign in
          </span>{" "}
          here
        </Text>
      </HeaderWrapper>
      <Stepper size="lg" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <div className="max-w-[700px] w-full">
        {activeStep === 1 && (
          <AccountInformationPage
            setActiveStep={setActiveStep}
            accountInput={accountInput as ContactInformationInput}
            setAccountInput={
              setAccountInput as Dispatch<
                SetStateAction<ContactInformationInput>
              >
            }
          />
        )}
        {activeStep === 2 && (
          <BankAccountInformationPage
            bank={bank}
            bankInput={bankInput as BankAccountInput}
            setBankInput={
              setBankInput as Dispatch<SetStateAction<BankAccountInput>>
            }
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep === 3 && (
          <MerchantInformationPage
            province={province}
            regency={regency}
            district={district}
            village={village}
            merchantInput={merchantInput as MerchantInformationInput}
            setMerchantInput={
              setMerchantInput as Dispatch<
                SetStateAction<MerchantInformationInput>
              >
            }
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep === 4 && (
          <AddFoodPage
            setActiveStep={setActiveStep}
            foodInput={foodInput}
            setFoodInput={setFoodInput}
          ></AddFoodPage>
        )}
      </div>
    </div>
  );
};

export default Register;
