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
import { EditIcon } from "@chakra-ui/icons";

const Order = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Tr onClick={onOpen} className="cursor-pointer">
              <Td>271828-19209ASJS</Td>
              <Td>27, July 2023</Td>
              <Td>Indra</Td>
              <Td>Rp20.000,00</Td>
              <Td>
                <StatusWrapper status={STATUS.PENDING}>Pending</StatusWrapper>
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
                        <Button size="sm" colorScheme="red" onClick={() => {}}>
                          Denied
                        </Button>
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
            </Tr>
            <Tr className="cursor-pointer" onClick={onOpen}>
              <Td>271828-19209ASJS</Td>
              <Td>27, July 2023</Td>
              <Td>Indra</Td>
              <Td>Rp20.000,00</Td>
              <Td>
                <StatusWrapper status={STATUS.DONE}>Done</StatusWrapper>
              </Td>
              <Td>
                <EditIcon color="blue.500" />
              </Td>
            </Tr>
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
