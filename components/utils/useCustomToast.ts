import { useToast } from "@chakra-ui/react";

interface ToastType {
  type: "info" | "warning" | "success" | "error" | "loading";
  title: string;
  message: string;
}

const useCustomToast = () => {
  const toast = useToast();

  const customToast = (toastObj: ToastType) => {
    return toast({
      containerStyle: { fontSize: "14px" },
      title: toastObj.title || "",
      description: toastObj.message || "",
      status: toastObj.type,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return customToast;
};

export default useCustomToast;
