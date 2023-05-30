/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextState, useAuthContext } from "./AuthContext";
import axios from "axios";

export interface Merchant {
  id: string;
  name: string;
  profilePictureUrl?: string;
  location: Location;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  province: string;
  regency: string;
  district: string;
  village: string;
  fullLocation: string;
}

export interface Food {
  id: string;
  name: string;
  price: number;
  pictureUrl?: string;
  updatedAt: Date;
  createdAt: Date;
  category: Category[];
  activeFood: ActiveFood;
}

export interface ActiveFood {
  isActive: boolean;
  stock: number;
  durationInSecond: 7200;
  startTime: Date;
  endTime: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface FoodTransaction {
  id: string;
  quantity: number;
  foodName: number;
  foodPrice: number;
}

export interface CustomerTransaction {
  id: string;
  fullname: string;
  username: string;
  email: string;
}

export interface Transaction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  totalprice: number;
  status: number;
  food: FoodTransaction[];
  customer: CustomerTransaction;
}

export interface MerchantDataContextState {
  merchant: Merchant | null;
  foods: Food[] | null;
  transaction: Transaction[] | null;
  setTransaction: Dispatch<SetStateAction<Transaction[] | null>>;
  setMerchant: Dispatch<SetStateAction<Merchant | null>>;
  setFoods: Dispatch<SetStateAction<Food[] | null>>;
  getFood: () => void;
  getTransaction: () => void;
}

export const MerchantDataContext =
  createContext<MerchantDataContextState | null>(null);

export const useMerchantDataContext = () => useContext(MerchantDataContext);

export const MerchantDataContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [foods, setFoods] = useState<Food[] | null>([]);
  const [transaction, setTransaction] = useState<Transaction[] | null>([]);
  const { user } = useAuthContext() as AuthContextState;

  const getMerchant = async () => {
    const params = {
      sellerId: user?.id,
    };

    try {
      const response = await axios.get("/api/merchant", { params });
      if (response.status === 200) {
        const { data } = response.data;
        setMerchant(data[0]);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (user) {
      getMerchant();
    }
  }, [user]);

  const getFood = async () => {
    const response = await axios.get("/api/food", {
      params: { merchantId: merchant?.id },
    });

    const { data } = response.data.data;
    setFoods(data);
  };

  const getTransaction = async () => {
    const response = await axios.get("/api/transaction", {
      params: { merchantId: merchant?.id },
    });

    const { data } = response.data;
    setTransaction(data);
  };

  useEffect(() => {
    if (merchant) {
      getFood();
      getTransaction();
    }
  }, [merchant]);

  const merchantDataContextValue: MerchantDataContextState = {
    merchant,
    setMerchant,
    foods,
    setFoods,
    transaction,
    setTransaction,
    getFood,
    getTransaction,
  };

  return (
    <MerchantDataContext.Provider value={merchantDataContextValue}>
      {children}
    </MerchantDataContext.Provider>
  );
};
