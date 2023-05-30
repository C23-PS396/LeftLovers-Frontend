import { Transaction } from "@/components/context/MerchantDataContext";
import getDateTime from "@/components/utils/getDateTime";
import formatter from "@/components/utils/rupiahFormatter";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

const OrderModal = ({
  isOpen,
  onClose,
  transaction,
}: {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction Detail</ModalHeader>
        <Divider />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div>
              <Text className="font-bold">Order ID</Text>
              <Text>{transaction.id.split("-")[0].toUpperCase()}</Text>
            </div>
            <div>
              <Text className="font-bold">Customer</Text>
              <Text>
                {transaction.customer.fullname || transaction.customer.username}
              </Text>
            </div>
            <div>
              <Text className="font-bold">Date Time</Text>
              <Text>{getDateTime(transaction.createdAt)}</Text>
            </div>
            <div>
              <Text className="font-bold">Order Detail</Text>
              <TableContainer>
                <Table variant="unstyled">
                  <Tbody>
                    {transaction.food.map((food, idx) => {
                      return (
                        <Tr className="!py-0" key={food.id}>
                          <Td p={0} className="truncate">
                            {idx + 1}. {food.foodName}
                          </Td>
                          <Td p={0}>
                            {food.quantity} <span>x</span>
                          </Td>
                          <Td p={0}>{formatter.format(food.foodPrice)}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            <div>
              <Text className="font-bold">Total Price</Text>
              <Text>{formatter.format(transaction.totalprice)}</Text>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;