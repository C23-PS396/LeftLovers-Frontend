import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import AuthForm from "../AuthForm";
import Button from "@/components/common/Button";
import {
  Bank,
  BankAccountInput,
} from "@/components/type/Registration/BankAccountInput";
import { Dispatch, SetStateAction } from "react";

const BankAccountInformationPage = ({
  bank,
  bankInput,
  setBankInput,
  setActiveStep,
}: {
  bank: Bank[];
  bankInput: BankAccountInput;
  setBankInput: Dispatch<SetStateAction<BankAccountInput>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <AuthForm>
        <FormControl>
          <FormLabel>Bank Provider</FormLabel>
          <Select
            value={bankInput?.name}
            onChange={(e) => {
              try {
                const name = e.currentTarget.value;
                const idx = bank.findIndex((bank) => bank.name === name);
                const currentBank = bank[idx];
                setBankInput({ ...bankInput, ...currentBank });
              } catch (error) {}
            }}
            placeholder="Select Your Bank"
          >
            {bank.map((bank) => {
              return (
                <option key={bank.name} value={bank.name}>
                  {bank.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Account Number</FormLabel>
          <Input
            value={bankInput?.accountNumber}
            onChange={(e) => {
              const accountNumber = e.currentTarget.value;
              setBankInput({ ...bankInput, accountNumber: accountNumber });
            }}
            type="text"
          ></Input>
        </FormControl>
        <FormControl>
          <div className="flex gap-4 w-full">
            <Button
              onClick={() => {
                setActiveStep(1);
              }}
              type="outlined"
              className="rounded-full"
            >
              Prev
            </Button>
            <Button
              onClick={() => {
                setActiveStep(3);
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

export default BankAccountInformationPage;
