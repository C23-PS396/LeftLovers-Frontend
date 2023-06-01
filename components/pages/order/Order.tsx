import Container from "@/components/common/Container";
import {
  Heading,
  FormControl,
  Select,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { STATUS } from "./components/StatusWrapper";
import {
  MerchantDataContextState,
  Transaction,
  useMerchantDataContext,
} from "@/components/context/MerchantDataContext";
import { useState } from "react";
import OrderList from "./components/OrderList";
import OrderModal from "./components/OrderModal";

const Order = () => {
  const { transaction } = useMerchantDataContext() as MerchantDataContextState;
  const [filter, setFilter] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transItem, setTransItem] = useState<Transaction | null>(null);

  return (
    <Container className="flex flex-col gap-4">
      <Heading color="#414D55">Order History</Heading>
      <FormControl maxWidth={200}>
        <Select
          className="font-bold text-[#414D55]"
          defaultValue={0}
          onChange={(e) => {
            setFilter(Number(e.currentTarget.value));
          }}
        >
          <option value={0}>All Order</option>
          <option value={STATUS.PENDING}>Pending</option>
          <option value={STATUS.CHECK_PAYMENT}>Checking Payment</option>
          <option value={STATUS.PAYMENT_ACCEPTED}>Payment Accepted</option>
          <option value={STATUS.ACCEPT}>Accept</option>
          <option value={STATUS.DONE}>Done</option>
          <option value={STATUS.FAIL}>Fail</option>
        </Select>
      </FormControl>
      <TableContainer bgColor="white">
        <Table className="border-2 border-[#EDF2F7]" variant="striped">
          <Thead className="bg-[#414D55]">
            <Tr>
              <Th color="#FFF">Order ID</Th>
              <Th color="#FFF">Date</Th>
              <Th color="#FFF">Customer</Th>
              <Th color="#FFF">Total price</Th>
              <Th color="#FFF" className="!text-center">
                Status
              </Th>
              <Th color="#FFF" className="!text-center">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {transaction?.map((transactionItem) => {
              if (filter === 0 || transactionItem.status === filter) {
                return (
                  <OrderList
                    onClick={onOpen}
                    key={transactionItem.id}
                    transactionItem={transactionItem}
                    setTransItem={setTransItem}
                  />
                );
              }
            })}
          </Tbody>
          {transaction?.filter((transaction) => transaction.status == filter)
            ?.length === 0 &&
            filter !== 0 && (
              <Tr className="flex items-center justify-start w-full h-[61px] text-[0.9rem] font-bold mx-auto">
                <Td>Empty Data</Td>
              </Tr>
            )}
        </Table>
      </TableContainer>
      <OrderModal
        isOpen={isOpen}
        onClose={onClose}
        transaction={transItem as Transaction}
      />
    </Container>
  );
};

export default Order;
