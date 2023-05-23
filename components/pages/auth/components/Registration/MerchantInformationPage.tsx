import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import AuthForm from "../AuthForm";
import Button from "@/components/common/Button";
import { Dispatch, SetStateAction } from "react";
import {
  District,
  MerchantInformationInput,
  Province,
  Regency,
  Village,
} from "@/components/type/Registration/MerchantinformationInput";

const MerchantInformationPage = ({
  province,
  regency,
  district,
  village,
  merchantInput,
  setMerchantInput,
  setActiveStep,
}: {
  province: Province[];
  regency: Regency[];
  district: District[];
  village: Village[];
  merchantInput: MerchantInformationInput;
  setMerchantInput: Dispatch<SetStateAction<MerchantInformationInput>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <AuthForm>
        <FormControl>
          <FormLabel>Merchant Name</FormLabel>
          <Input
            value={merchantInput?.name}
            onChange={(e) => {
              const name = e.currentTarget.value;
              setMerchantInput({ ...merchantInput, name: name });
            }}
            type="text"
          ></Input>
        </FormControl>
        <div className="flex gap-4">
          <FormControl>
            <FormLabel>Province</FormLabel>
            <Select
              placeholder="Select Province"
              value={merchantInput?.province?.id}
              onChange={(e) => {
                try {
                  const id = e.currentTarget.value;
                  const idx = province.findIndex((province) => {
                    return province.id === id;
                  });
                  const name = province[idx].name;
                  setMerchantInput({
                    ...merchantInput,
                    province: { name: name, id: id },
                  });
                } catch (err) {}
              }}
            >
              {province.map((province) => {
                return (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Regency</FormLabel>
            <Select
              placeholder="Select Regency"
              value={merchantInput?.regency?.id}
              onChange={(e) => {
                try {
                  const id = e.currentTarget.value;
                  const idx = regency.findIndex((regency) => {
                    return regency.id === id;
                  });
                  const name = regency[idx].name;
                  setMerchantInput({
                    ...merchantInput,
                    regency: { name: name, id: id },
                  });
                } catch (err) {}
              }}
            >
              {regency.map((regency) => {
                return (
                  <option key={regency.id} value={regency.id}>
                    {regency.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="flex gap-4">
          <FormControl>
            <FormLabel>District</FormLabel>
            <Select
              placeholder="Select District"
              value={merchantInput?.district?.id}
              onChange={(e) => {
                try {
                  const id = e.currentTarget.value;
                  const idx = district.findIndex((district) => {
                    return district.id === id;
                  });
                  const name = district[idx].name;
                  setMerchantInput({
                    ...merchantInput,
                    district: { name: name, id: id },
                  });
                } catch (err) {}
              }}
            >
              {district.map((district) => {
                return (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Village</FormLabel>
            <Select
              placeholder="Select Village"
              value={merchantInput?.village?.id}
              onChange={(e) => {
                try {
                  const id = e.currentTarget.value;
                  const idx = village.findIndex((village) => {
                    return village.id === id;
                  });
                  const name = village[idx].name;
                  setMerchantInput({
                    ...merchantInput,
                    village: { name: name, id: id },
                  });
                } catch (err) {}
              }}
            >
              {village.map((village) => {
                return (
                  <option key={village.id} value={village.id}>
                    {village.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <FormControl>
          <FormLabel>Streets</FormLabel>
          <Input
            value={merchantInput?.fullLocation}
            onChange={(e) => {
              const name = e.currentTarget.value;
              setMerchantInput({ ...merchantInput, fullLocation: name });
            }}
            type="text"
          ></Input>
        </FormControl>
        <FormControl>
          <div className="flex gap-4 w-full">
            <Button
              onClick={() => {
                setActiveStep(2);
              }}
              type="outlined"
              className="rounded-full"
            >
              Prev
            </Button>
            <Button
              onClick={() => {
                setActiveStep(4);
              }}
              type="primary"
              className="rounded-full"
            >
              Next
            </Button>
          </div>
        </FormControl>
      </AuthForm>
    </>
  );
};

export default MerchantInformationPage;
