import axios from "axios";

const API_URL =
  "https://my-json-server.typicode.com/benirvingplt/products/products";

export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  colour: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response?.data;
};
