import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "../App";
import { getProducts } from "../services/productService";
import { Product } from "../components/ProductList";
jest.mock("../services/productService");

const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    img: "product-1.jpg",
    price: 100,
    colour: "red",
  },
];

describe("App", () => {
  beforeEach(() => {
    mockGetProducts.mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the product list", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });
});
