import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const STATUS = {
  PENDING: 1,
  ACCEPT: 2,
  PAID: 3,
  DONE: 4,
  FAIL: 5,
};

const StatusWrapper = ({
  className,
  status,
  children,
}: {
  className?: string;
  status: number;
  children: ReactNode;
}) => {
  return (
    <Box
      border="none"
      borderColor={
        status === STATUS.PENDING
          ? "teal"
          : status === STATUS.ACCEPT
          ? "green"
          : status === STATUS.PAID
          ? "twitter.500"
          : status === STATUS.DONE
          ? "green"
          : "red"
      }
      color={
        status === STATUS.PENDING
          ? "teal"
          : status === STATUS.ACCEPT
          ? "green"
          : status === STATUS.PAID
          ? "twitter.500"
          : status === STATUS.DONE
          ? "green"
          : "red"
      }
      bgColor={
        status === STATUS.PENDING
          ? "teal.200"
          : status === STATUS.ACCEPT
          ? "green.200"
          : status === STATUS.PAID
          ? "twitter.200"
          : status === STATUS.DONE
          ? "green.200"
          : "red.200"
      }
      className={`w-fit font-bold px-4 py-1 rounded-full ${className}`}
    >
      {children}
    </Box>
  );
};

export default StatusWrapper;
