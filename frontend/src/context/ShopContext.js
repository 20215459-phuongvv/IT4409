import React, {createContext, useState} from "react";
import all_product from "~/assets/all_products";
export const ShopContext = createContext(null);

const getDefaulthCart = ()=>{
    return [];
}
const ShopContextProvider = (props) => {
    
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localStorageCart = localStorage.getItem("cartItems");
      return localStorageCart ? JSON.parse(localStorageCart) : [];
    } catch (e) {
      // Xử lý lỗi lấy dữ liệu từ localStorage (nếu có)
      return [];
    }
  });
    const addToCart = (itemId,quantity,size, color) => {
        setCartItems((prev) => {
          const updatedCart = [...prev];
          const itemIndex = updatedCart.findIndex(item => item.id === itemId && item.size === size && item.color === color);
      
          if (itemIndex !== -1) {
            updatedCart[itemIndex].quantity += quantity;
          } else {
            updatedCart.push({ id: itemId, size, quantity, color });
          }
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          return updatedCart;
        });
        

      };
      console.log(cartItems);
      const removeFromCart = (itemId, size,color) => {
        setCartItems((prev) => {
          const updatedCart = [...prev];
          const itemIndex = updatedCart.findIndex(item => item.id === itemId && item.size === size && item.color === color);
      
          if (itemIndex !== -1) {
            updatedCart.splice(itemIndex, 1);
          }
      
          // Lưu giá trị mới của updatedCart vào localStorage
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          return updatedCart;
        });
      };
      const getTotalCartAmount = () => {
        let totalAmount = 0;
        cartItems.forEach((cartItem) => {
          const productPrice = all_product.find((item) => item.id === cartItem.id)?.newPrice || 0; 
          const priceNumber = parseFloat(productPrice.replace(",", ""));
          const quantity = cartItem.quantity;
          totalAmount += priceNumber * quantity;
        });
        return totalAmount;
      };
      const getTotalCartItem = () => cartItems.length;
    const contextValue = {all_product, cartItems, addToCart, removeFromCart,getTotalCartAmount,getTotalCartItem};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;