import {
  MerchantDataContextState,
  Transaction,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import {
  Tr,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Td,
  Button,
} from "@chakra-ui/react";
import StatusWrapper, { STATUS } from "./StatusWrapper";
import getDateTime from "@/components/utils/getDateTime";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import formatter from "@/components/utils/rupiahFormatter";
import OrderModal from "./OrderModal";
import axios from "axios";
import useCustomToast from "@/components/utils/useCustomToast";
import { Dispatch, SetStateAction } from "react";

const OrderList = ({
  transactionItem,
  onClick,
  setTransItem,
}: {
  transactionItem: Transaction;
  onClick: () => void;
  setTransItem: Dispatch<SetStateAction<Transaction | null>>;
}) => {
  const toast = useCustomToast();
  const { getTransaction } =
    useMerchantDataContext() as MerchantDataContextState;

  const getStatus = (transaction: Transaction) => {
    if (transaction.status === STATUS.ACCEPT) {
      return "Accept";
    } else if (transaction.status === STATUS.DONE) {
      return "Done";
    } else if (transaction.status === STATUS.FAIL) {
      return "Failed";
    } else if (transaction.status === STATUS.CHECK_PAYMENT) {
      return "Checking Payment";
    } else if (transaction.status === STATUS.PAYMENT_ACCEPTED) {
      return "Payment Accepted";
    } else if (transaction.status === STATUS.PENDING) {
      return "Pending";
    }
  };

  const updateStatus = async (status: number, transactionId: string) => {
    const response = await axios.post("/api/transaction/status", {
      status: status,
      transactionId: transactionId,
    });

    if (response.status === 200) {
      toast({
        type: "success",
        title: "Update Success",
        message: "Status updated successfully",
      });
      getTransaction();
      return;
    }

    toast({
      type: "error",
      title: "Update Fail",
      message: "Error when update status",
    });
  };

  return (
    <>
      <Tr
        key={transactionItem.id}
        onClick={() => {
          setTransItem(transactionItem);
          onClick();
        }}
        className="cursor-pointer"
      >
        <Td>{transactionItem.id.toUpperCase().split("-")[0]}</Td>
        <Td>{getDateTime(transactionItem.createdAt)}</Td>
        <Td>
          {transactionItem.customer.fullname
            ? transactionItem.customer.fullname
            : transactionItem.customer.username}
        </Td>
        <Td>{formatter.format(transactionItem.totalprice)}</Td>
        <Td>
          <StatusWrapper status={transactionItem.status} className="mx-auto">
            {getStatus(transactionItem)}
          </StatusWrapper>
        </Td>
        <Td
          className="z-[50] flex justify-center items-center h-[61px]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {transactionItem.status === STATUS.PAYMENT_ACCEPTED ? (
            <Popover>
              <PopoverTrigger>
                <EditIcon color="blue.500" />
              </PopoverTrigger>
              <PopoverContent width="fit-content">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Action</PopoverHeader>
                <PopoverBody>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => {
                        updateStatus(STATUS.ACCEPT, transactionItem.id);
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        updateStatus(STATUS.FAIL, transactionItem.id);
                      }}
                    >
                      Denied
                    </Button>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : transactionItem.status === STATUS.FAIL ? (
            <CloseIcon color="red.500" />
          ) : (
            transactionItem.status >= STATUS.ACCEPT && (
              <CheckIcon color="green.500" />
            )
          )}
        </Td>
      </Tr>
    </>
  );
};

export default OrderList;
