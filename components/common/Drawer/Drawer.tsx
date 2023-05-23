import {
  AuthContextState,
  AuthStatus,
  useAuthContext,
} from "@/components/context/AuthContext";
import useWindowSize from "@/components/hook/useWindowSize";
import useCustomToast from "@/components/utils/useCustomToast";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<any>;
}

const CustomDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, btnRef }) => {
  const { width } = useWindowSize();
  const router = useRouter();
  const toast = useCustomToast();
  const { setUser, setAuthStatus, logout }: AuthContextState =
    useAuthContext() as AuthContextState;

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
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size={width < 1024 ? "full" : "md"}
    >
      <DrawerOverlay top={76} />
      <DrawerContent top={10000} className="mt-[76px]">
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          <Button colorScheme="red" onClick={logoutClickHandler}>
            Logout
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
