export interface FoodInput {
  name: string;
  price: number;
  pictureUrl?: string;
  category: string[];
}

export interface Category {
  id: string;
  name: string;
}
