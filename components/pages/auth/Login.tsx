import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import AuthCard from "./components/AuthCard";
import AuthContainer from "./components/AuthContainer";
import HeaderWrapper from "./components/HeaderWrapper";
import { useRouter } from "next/router";
import AuthForm from "./components/AuthForm";
import Button from "@/components/common/Button";
import { useState } from "react";
import axios from "axios";
import useCustomToast from "@/components/utils/useCustomToast";
import {
  AuthContextState,
  useAuthContext,
} from "@/components/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const [credential, setCredential] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useCustomToast();
  const { login }: AuthContextState = useAuthContext() as AuthContextState;

  const singupHandler = () => {
    router.push("/auth/register");
  };

  const credentialChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value as string;
    setCredential(value);
  };

  const passwordChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value as string;
    setPassword(value);
  };

  const loginHandler = async () => {
    if (!credential || !password) {
      toast({
        type: "error",
        message: "Credential and password are required fields.",
        title: "All Field required",
      });
      return;
    }

    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post("/api/auth/login", {
        credential: credential,
        password: password,
      });
      const { message, token } = res.data;
      router.replace("/dashboard");
      login(token);
      toast({
        message: message,
        type: "success",
        title: "Login success",
      });
    } catch (err: any) {
      const { message } = err.response.data.message;
      toast({
        message: message,
        type: "error",
        title: "Login failed",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <AuthContainer>
      <AuthCard>
        <HeaderWrapper>
          <Heading>Log in</Heading>
          <Text>
            New to LeftLovers?{" "}
            <span
              className="text-[#FFB84C] cursor-pointer"
              onClick={singupHandler}
            >
              Sign up for free
            </span>
          </Text>
        </HeaderWrapper>
        <AuthForm>
          <FormControl>
            <FormLabel>Credential</FormLabel>
            <Input type="text" onChange={credentialChangeHandler}></Input>
            <FormHelperText>Use your email/username</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={passwordChangeHandler}></Input>
          </FormControl>
          <FormControl>
            <Button
              type={isSubmitting ? "dead" : "primary"}
              className="w-full rounded-full"
              onClick={loginHandler}
            >
              {isSubmitting ? <Spinner size="sm"></Spinner> : "Log In"}
            </Button>
          </FormControl>
          <Text
            textAlign="center"
            fontSize="0.9rem"
            cursor="pointer"
            textColor="#CC252E"
            fontWeight={500}
            onClick={() => {
              router.push("/");
            }}
          >
            Back to Main Page
          </Text>
        </AuthForm>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;
