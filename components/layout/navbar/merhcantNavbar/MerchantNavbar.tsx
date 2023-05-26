import {
  Text,
  Heading,
  Wrap,
  WrapItem,
  Avatar,
  useDisclosure,
  Button,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Popover,
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
import React, { useRef, useState } from "react";
import CustomDrawer from "@/components/common/Drawer/Drawer";
import WrapperHamburger from "../components/WrapperHumberger";
import HamburgerIcon from "../components/HambergerIcon";
import useWindowSize from "@/components/hook/useWindowSize";
import useCustomToast from "@/components/utils/useCustomToast";
import ProfilePopOver from "./ProfilePopOver";

const MerchantNavbar = () => {
  const router = useRouter();
  const { isOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [open, setOpen] = useState(false);
  const toast = useCustomToast();
  const { logout, setUser, setAuthStatus }: AuthContextState =
    useAuthContext() as AuthContextState;

  const toggleHamburger = () => {
    setOpen(!open);
  };

  const logoutClickHandler = () => {
    logout();
    setUser(null);
    setAuthStatus(AuthStatus.NOT_AUTHENTICATED);
    router.replace("/");

    toast({
      type: "info",
      message: "You are successfully logout",
      title: "Logout success",
    });
  };

  return (
    <>
      <NavbarWrapper>
        <Link href="#home">
          <LogoWrapper>
            <Heading className="!!lg:text-[2.3rem] text-[2rem] ">Left</Heading>
            <Text fontSize="2xl">Lovers</Text>
          </LogoWrapper>
        </Link>
        <WrapperHamburger open={open} onClick={toggleHamburger}>
          <HamburgerIcon />
        </WrapperHamburger>
        <NavLinkWrapper open={open}>
          <Link href="/dashboard">
            <Text fontSize="lg" color="#7F8A96">
              Overview
            </Text>
          </Link>
          <Link href="/dashboard/food">
            <Text fontSize="lg" color="#7F8A96">
              Food
            </Text>
          </Link>
          <Link href="/dashboard/order">
            <Text fontSize="lg" color="#7F8A96">
              Order
            </Text>
          </Link>
          <Link href="/dashboard/review">
            <Text fontSize="lg" color="#7F8A96">
              Review
            </Text>
          </Link>
          <ProfilePopOver logoutClickHandler={logoutClickHandler} />
        </NavLinkWrapper>
      </NavbarWrapper>
      <CustomDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
};

export default MerchantNavbar;
