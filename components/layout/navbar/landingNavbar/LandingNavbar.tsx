import { Text } from "@chakra-ui/react";
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
import { useState } from "react";
import WrapperHamburger from "../components/WrapperHumberger";
import HamburgerIcon from "../components/HambergerIcon";
import NavlogoLg from "../components/NavLogoLg";
import NavLogoSm from "../components/NavLogoSm";
import useWindowSize from "@/components/hook/useWindowSize";

const LandingNavbarWrapper = () => {
  const router = useRouter();
  const { authStatus }: AuthContextState = useAuthContext() as AuthContextState;
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();

  const loginClickHandler = () => {
    toggleHamburger();
    router.push("/auth/login");
  };

  const registerClickHandler = () => {
    toggleHamburger();
    router.push("/auth/register");
  };

  const dashboardClickHandler = () => {
    toggleHamburger();
    router.push("/dashboard");
  };

  const toggleHamburger = () => {
    setOpen(!open);
  };

  return (
    <NavbarWrapper>
      <Link href="#home">
        <LogoWrapper>
          {" "}
          <div className="flex items-center justify-start h-fit lg:max-w-[170px] max-w-[38px]">
            {width >= 1024 ? <NavlogoLg /> : <NavLogoSm />}
          </div>
        </LogoWrapper>
      </Link>
      <WrapperHamburger open={open} onClick={toggleHamburger}>
        <HamburgerIcon />
      </WrapperHamburger>
      <NavLinkWrapper open={open}>
        <Link href="#about" onClick={toggleHamburger}>
          <Text fontSize="lg">About</Text>
        </Link>
        <Link href="#our-mission" onClick={toggleHamburger}>
          <Text fontSize="lg">Our Mission</Text>
        </Link>
        <Link href="#team" onClick={toggleHamburger}>
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
              width={90}
              variant="outline"
              colorScheme="blue"
              onClick={registerClickHandler}
            >
              Register
            </Button>
            <Button
              width={90}
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
