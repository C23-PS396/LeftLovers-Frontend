import {
  Text,
  Heading,
  Wrap,
  WrapItem,
  Avatar,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import LogoWrapper from "../components/LogoWrapper";
import NavLinkWrapper from "../components/NavLinkWrapper";
import NavbarWrapper from "../components/NavbarWrapper";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AuthContextState,
  AuthStatus,
  useAuthContext,
} from "@/components/context/AuthContext";
import React, { useRef } from "react";
import CustomDrawer from "@/components/common/Drawer/Drawer";

const MerchantNavbar = () => {
  const router = useRouter();
  const { user }: AuthContextState = useAuthContext() as AuthContextState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const loginClickHandler = () => {
    router.push("/auth/login");
  };

  const dashboardClickHandler = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <NavbarWrapper>
        <Link href="#home">
          <LogoWrapper>
            <Heading>Left</Heading>
            <Text fontSize="2xl">Lovers</Text>
          </LogoWrapper>
        </Link>
        <NavLinkWrapper>
          <Link href="#about">
            <Text fontSize="lg">Dasboard</Text>
          </Link>
          <Link href="#our-mission">
            <Text fontSize="lg">My Store</Text>
          </Link>
          <Wrap>
            <WrapItem>
              <Avatar
                className="cursor-pointer"
                onClick={onOpen}
                name={user?.fullname}
                src="https://bit.ly/dan-abramov"
              />
            </WrapItem>
          </Wrap>
        </NavLinkWrapper>
      </NavbarWrapper>
      <CustomDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
};

export default MerchantNavbar;
