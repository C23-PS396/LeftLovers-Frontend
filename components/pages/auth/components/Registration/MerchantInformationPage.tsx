/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button as Buttons,
} from "@chakra-ui/react";
import AuthForm from "../AuthForm";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  District,
  MerchantInformationInput,
  Province,
  Regency,
  Village,
} from "@/components/type/Registration/MerchantinformationInput";
import { Dropzone } from "./AddFoodPage";
import uploadHandler from "@/components/utils/uploadHandler";

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
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);

  const validateInput = () => {
    if (!merchantInput) return false;

    const {
      profilePictureUrl,
      name,
      province,
      regency,
      district,
      village,
      fullLocation,
    } = merchantInput;

    if (!profilePictureUrl) return false;
    if (!name) return false;
    if (!province) return false;
    if (!regency) return false;
    if (!district) return false;
    if (!village) return false;
    if (!fullLocation) return false;

    return true;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        setSelectedFiles(file);
        return;
      }
    }
    setSelectedFiles(null);
  };

  useEffect(() => {
    if (selectedFiles) {
      uploadFile();
    }
  }, [selectedFiles]);

  const uploadFile = async () => {
    const url = await uploadHandler(selectedFiles);
    setMerchantInput({ ...merchantInput, profilePictureUrl: url });
  };

  return (
    <>
      <AuthForm>
        <FormControl>
          <FormLabel>Merchant Photo</FormLabel>
          <Dropzone
            selectedFiles={selectedFiles}
            handleFileChange={handleFileChange}
            setSelectedFiles={
              setSelectedFiles as Dispatch<SetStateAction<File | null>>
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Merchant Name</FormLabel>
          <Input
            value={merchantInput?.name || ""}
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
              value={merchantInput?.province?.id || ""}
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
              value={merchantInput?.regency?.id || ""}
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
              value={merchantInput?.district?.id || ""}
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
              value={merchantInput?.village?.id || ""}
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
            value={merchantInput?.fullLocation || ""}
            onChange={(e) => {
              const name = e.currentTarget.value;
              setMerchantInput({ ...merchantInput, fullLocation: name });
            }}
            type="text"
          ></Input>
        </FormControl>
        <FormControl>
          <div className="flex gap-4 w-full">
            <Buttons
              onClick={() => {
                setActiveStep(2);
              }}
              variant="outline"
              colorScheme="blue"
            >
              Prev
            </Buttons>
            <Buttons
              onClick={() => {
                setActiveStep(4);
              }}
              colorScheme="blue"
              isDisabled={!validateInput()}
            >
              Next
            </Buttons>
          </div>
        </FormControl>
      </AuthForm>
    </>
  );
};

export default MerchantInformationPage;
