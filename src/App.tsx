import React, { useState, useEffect, useCallback } from "react";
import { getProducts } from "./services/productService";
import ProductList, { Product, CartItem } from "./components/ProductList";
import FilterOptions from "./components/FilterOptions";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      if (data) {
        setProducts(data);
        setFilteredProducts(data);
      }
    });
  }, []);

  const handleFilterChange = useCallback(
    (colour: string) => {
      if (colour === "") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(
          (product: Product) => product.colour === colour
        );
        setFilteredProducts(filtered);
      }
    },
    [products, setFilteredProducts]
  );

  const handleIncrement = useCallback(
    (productId: number) => {
      setCartItems((prevCart) => {
        const updatedCart = [...prevCart];
        const itemIndex = updatedCart.findIndex(
          (item: CartItem) => item.id === productId
        );
        if (itemIndex >= 0) {
          updatedCart[itemIndex].qty++;
        } else {
          let findItem = products.find(
            (product: Product) => product.id === productId
          );
          if (findItem) {
            let NewItem = {
              id: findItem.id,
              name: findItem.name,
              price: findItem.price,
              qty: 1,
            };
            updatedCart.push(NewItem);
          }
        }
        return updatedCart;
      });
    },
    [setCartItems, products]
  );

  const handleDecrement = useCallback(
    (productId: number) => {
      setCartItems((prevCart) => {
        const updatedCart = [...prevCart];
        const itemIndex = updatedCart.findIndex(
          (item) => item.id === productId
        );
        if (itemIndex >= 0 && updatedCart[itemIndex].qty > 0) {
          updatedCart[itemIndex].qty--;
        }
        return updatedCart;
      });
    },
    [setCartItems]
  );

  const handleRemoveFromCart = useCallback(
    (productId: number) => {
      setCartItems((prevCart) =>
        prevCart.filter((item) => item.id !== productId)
      );
    },
    [setCartItems]
  );

  return (
    <div className="App">
      <h1>Product Listing</h1>
      <FilterOptions onFilterChange={handleFilterChange} />
      <ProductList
        products={filteredProducts}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemoveFromCart}
        cartItems={cartItems}
      />
    </div>
  );
};

export default App;
