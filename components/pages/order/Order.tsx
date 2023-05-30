import Container from "@/components/common/Container";
import {
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import StatusWrapper, { STATUS } from "./components/StatusWrapper";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import {
  MerchantDataContextState,
  Transaction,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import moment from "moment";

const Order = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { transaction } = useMerchantDataContext() as MerchantDataContextState;

  const getStatus = (transaction: Transaction) => {
    if (transaction.status === STATUS.ACCEPT) {
      return "Accept";
    } else if (transaction.status === STATUS.DONE) {
      return "Done";
    } else if (transaction.status === STATUS.FAIL) {
      return "Failed";
    } else if (transaction.status === STATUS.PAID) {
      return "Payment Confirmed";
    } else if (transaction.status === STATUS.PAY) {
      return "Paid";
    } else if (transaction.status === STATUS.PENDING) {
      return "Pending";
    }
  };

  const getDateTime = (date: Date) => {
    const formattedDateTime = moment(date).format("MMMM Do, YYYY, h:mm:ss A");
    return formattedDateTime;
  };

  return (
    <Container className="flex flex-col gap-4">
      <Heading>Order</Heading>
      <TableContainer bgColor="white">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Date</Th>
              <Th>Customer</Th>
              <Th>Total price</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transaction?.map((transactionItem) => {
              return (
                <Tr
                  key={transactionItem.id}
                  onClick={onOpen}
                  className="cursor-pointer"
                >
                  <Td>{transactionItem.id.toUpperCase().split("-")[0]}</Td>
                  <Td>{getDateTime(transactionItem.createdAt)}</Td>
                  <Td>
                    {transactionItem.customer.fullname
                      ? transactionItem.customer.fullname
                      : transactionItem.customer.username}
                  </Td>
                  <Td>{transactionItem.totalprice}</Td>
                  <Td>
                    <StatusWrapper status={transactionItem.status}>
                      {getStatus(transactionItem)}
                    </StatusWrapper>
                  </Td>
                  <Td
                    className="z-[50]"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
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
                              onClick={() => {}}
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={() => {}}
                            >
                              Denied
                            </Button>
                          </div>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <OrderModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

const OrderModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Order;
