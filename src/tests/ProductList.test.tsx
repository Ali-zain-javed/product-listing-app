import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList, { CartItem } from "../components/ProductList";

describe("ProductList component", () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      img: "https://example.com/product1.jpg",
      price: 10,
      colour: "red",
    },
    {
      id: 2,
      name: "Product 2",
      img: "https://example.com/product2.jpg",
      price: 20,
      colour: "blue",
    },
  ];

  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      qty: 1,
    },
  ];

  const onIncrement = jest.fn();
  const onDecrement = jest.fn();
  const onRemove = jest.fn();

  it("should render a list of products", () => {
    render(
      <ProductList
        products={products}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        cartItems={cartItems}
      />
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("should render the product name, price, and image", () => {
    render(
      <ProductList
        products={products}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        cartItems={cartItems}
      />
    );

    const product1 = screen.getByText("Product 1");
    const product2 = screen.getByText("Product 2");
    const product1Image = screen.getByAltText("Product 1");
    const product2Image = screen.getByAltText("Product 2");

    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
    expect(product1Image).toBeInTheDocument();
    expect(product2Image).toBeInTheDocument();
  });

  it("should render the product quantity and remove button if the product is in the cart", () => {
    render(
      <ProductList
        products={products}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        cartItems={cartItems}
      />
    );

    const product1Quantity = screen.getByText("Qty: 1");
    const product1RemoveButton = screen.getByText("Remove");

    expect(product1Quantity).toBeInTheDocument();
    expect(product1RemoveButton).toBeInTheDocument();
  });

  it("should not render the product quantity and remove button if the product is not in the cart", () => {
    render(
      <ProductList
        products={products}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        cartItems={[]}
      />
    );

    const product1Quantity = screen.queryByText("Qty: 1");
    const product1RemoveButton = screen.queryByText("Remove");

    expect(product1Quantity).toBeNull();
    expect(product1RemoveButton).toBeNull();
  });
  it("should call the onIncrement callback when the increment button is clicked", () => {
    render(
      <ProductList
        products={products}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        cartItems={cartItems}
      />
    );

    // Get the increment button for the product with the ID 1.
    const product1IncrementButton = screen.getByTestId(
      "product-1-increment-button_1"
    );

    // Click the increment button.
    product1IncrementButton.click();

    // Expect the onIncrement callback to have been called with the product ID 1.
    expect(onIncrement).toHaveBeenCalledWith(1);
  });

  it("should call the onDecrement callback when the decrement button is clicked", () => {
    render(
      <ProductList
        products={products}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        cartItems={cartItems}
      />
    );

    // Get the decrement button for the product with the ID 1.
    const product1IncrementButton = screen.getByTestId(
      "product-1-decrement-button_1"
    );

    // Click the decrement button.
    product1IncrementButton.click();

    // Expect the onDecrement callback to have been called with the product ID 1.
    expect(onDecrement).toHaveBeenCalledWith(1);
  });
});
