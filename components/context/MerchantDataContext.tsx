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
  rating: { _avg: { rating: number } };
  statistic: { _sum: { totalprice: number }; _count: { id: number } };
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

export interface Review {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  review: string;
  customer: CustomerTransaction;
  merchant: Merchant;
  isFilled: boolean;
  transactionId: string;
}

export interface Statistic {
  success: number;
  fail: number;
  pending: number;
  month: number[];
  data: number[];
}

export interface MerchantDataContextState {
  merchant: Merchant | null;
  foods: Food[] | null;
  transaction: Transaction[] | null;
  review: Review[] | null;
  statistic: Statistic | null;
  setTransaction: Dispatch<SetStateAction<Transaction[] | null>>;
  setMerchant: Dispatch<SetStateAction<Merchant | null>>;
  setFoods: Dispatch<SetStateAction<Food[] | null>>;
  setReview: Dispatch<SetStateAction<Review[] | null>>;
  getFood: () => void;
  getTransaction: () => void;
  getMerchant: () => void;
  getStatistic: () => void;
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
  const [review, setReview] = useState<Review[] | null>([]);
  const [statistic, setStatistic] = useState<Statistic | null>(null);
  const { user } = useAuthContext() as AuthContextState;

  const getMerchant = async () => {
    const params = {
      sellerId: user?.id,
    };

    try {
      const response = await axios.get("/api/merchant", { params });
      if (response.status === 200) {
        const { data } = response.data;
        setMerchant(data);
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

  const getReview = async () => {
    const response = await axios.get("/api/review", {
      params: { merchantId: merchant?.id },
    });
    const { data } = response.data;
    setReview(data);
  };

  const getStatistic = async () => {
    const response = await axios.get("/api/merchant/summary", {
      params: { merchantId: merchant?.id },
    });
    setStatistic(response.data);
  };

  useEffect(() => {
    if (merchant) {
      getFood();
      getTransaction();
      getReview();
      getStatistic();
    }

    console.log(merchant);
  }, [merchant]);

  const merchantDataContextValue: MerchantDataContextState = {
    merchant,
    setMerchant,
    review,
    setReview,
    foods,
    setFoods,
    transaction,
    statistic,
    setTransaction,
    getFood,
    getTransaction,
    getMerchant,
    getStatistic,
  };

  return (
    <MerchantDataContext.Provider value={merchantDataContextValue}>
      {children}
    </MerchantDataContext.Provider>
  );
};
