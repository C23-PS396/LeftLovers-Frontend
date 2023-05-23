import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  Input,
  Button as Buttons,
  AlertDialog,
  useDisclosure,
} from "@chakra-ui/react";
import AuthForm from "../AuthForm";
import Button from "@/components/common/Button";
import {
  ChangeEvent,
  Dispatch,
  LegacyRef,
  RefObject,
  SetStateAction,
  useRef,
} from "react";
import ContactInformationInput from "@/components/type/Registration/ContactInformationInput";
import { useRouter } from "next/router";

const AccountInformationPage = ({
  accountInput,
  setAccountInput,
  setActiveStep,
}: {
  accountInput: ContactInformationInput;
  setAccountInput: Dispatch<SetStateAction<ContactInformationInput>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const fullnameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fullname = e.currentTarget.value;
    setAccountInput({ ...accountInput, fullname: fullname });
  };

  const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.currentTarget.value;
    setAccountInput({ ...accountInput, username: username });
  };

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;
    setAccountInput({ ...accountInput, email: email });
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value;
    setAccountInput({ ...accountInput, password: password });
  };

  return (
    <>
      <AuthForm>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input
            value={accountInput?.fullname}
            onChange={fullnameChangeHandler}
            type="text"
          ></Input>
        </FormControl>{" "}
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={accountInput?.username}
            onChange={usernameChangeHandler}
            type="text"
          ></Input>
        </FormControl>{" "}
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={accountInput?.email}
            onChange={emailChangeHandler}
            type="text"
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            value={accountInput?.password}
            onChange={passwordChangeHandler}
            type="password"
          ></Input>
        </FormControl>
        <FormControl>
          <div className="flex gap-4">
            <Button onClick={onOpen} type="outlined" className="rounded-full">
              Back
            </Button>
            <Button
              onClick={() => {
                setActiveStep(2);
              }}
              type="primary"
              className="rounded-full"
            >
              Next
            </Button>
          </div>
        </FormControl>
      </AuthForm>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef as RefObject<any>}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Buttons
                ref={
                  cancelRef as unknown as
                    | LegacyRef<HTMLButtonElement>
                    | undefined
                }
                onClick={onClose}
              >
                Cancel
              </Buttons>
              <Buttons
                colorScheme="red"
                onClick={() => {
                  router.push("/");
                }}
                ml={3}
              >
                Continue
              </Buttons>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export default AccountInformationPage;
