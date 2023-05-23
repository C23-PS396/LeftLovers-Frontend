import { Text, Heading } from "@chakra-ui/react";
import LogoWrapper from "../components/LogoWrapper";
import NavLinkWrapper from "../components/NavLinkWrapper";
import NavbarWrapper from "../components/NavbarWrapper";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  AuthContextState,
  AuthStatus,
  useAuthContext,
} from "@/components/context/AuthContext";

const LandingNavbarWrapper = () => {
  const router = useRouter();
  const { authStatus }: AuthContextState = useAuthContext() as AuthContextState;

  const loginClickHandler = () => {
    router.push("/auth/login");
  };

  const registerClickHandler = () => {
    router.push("/auth/register");
  };

  const dashboardClickHandler = () => {
    router.push("/dashboard");
  };

  return (
    <NavbarWrapper>
      <Link href="#home">
        <LogoWrapper>
          <Heading>Left</Heading>
          <Text fontSize="2xl">Lovers</Text>
        </LogoWrapper>
      </Link>
      <NavLinkWrapper>
        <Link href="#about">
          <Text fontSize="lg">About</Text>
        </Link>
        <Link href="#our-mission">
          <Text fontSize="lg">Our Mission</Text>
        </Link>
        <Link href="#team">
          <Text fontSize="lg">Team</Text>
        </Link>
        {authStatus === AuthStatus.AUTHENTICATED ? (
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={dashboardClickHandler}
          >
            Dashboard
          </Button>
        ) : (
          <>
            <Button
              width={100}
              variant="outline"
              colorScheme="blue"
              onClick={registerClickHandler}
            >
              Register
            </Button>
            <Button
              width={100}
              variant="solid"
              colorScheme="blue"
              onClick={loginClickHandler}
            >
              Log In
            </Button>
          </>
        )}
      </NavLinkWrapper>
    </NavbarWrapper>
  );
};

export default LandingNavbarWrapper;
