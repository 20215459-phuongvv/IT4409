import React, {createContext, useState} from "react";
import all_product from "~/assets/all_products";
export const ShopContext = createContext(null);

const getDefaulthCart = ()=>{
    return [];
}
const ShopContextProvider = (props) => {
    
    const [cartItems, setCartItems] = useState(getDefaulthCart())
    const addToCart = (itemId,quantity,size) => {
        setCartItems((prev) => {
          const updatedCart = [...prev];
          const itemIndex = updatedCart.findIndex(item => item.id === itemId && item.size === size);
      
          if (itemIndex !== -1) {
            updatedCart[itemIndex].quantity += quantity;
          } else {
            updatedCart.push({ id: itemId, size, quantity });
          }
      
          return updatedCart;
        });
      };
      console.log(cartItems);
      const removeFromCart = (itemId, size) => {
        setCartItems((prev) => {
          const updatedCart = [...prev];
          const itemIndex = updatedCart.findIndex(item => item.id === itemId && item.size === size);
      
          if (itemIndex !== -1) {
            updatedCart.splice(itemIndex, 1);
          }
      
          return updatedCart;
        });
      };
      const getTotalCartAmount = () => {
        let totalAmount = 0;
        cartItems.forEach((cartItem) => {
          const productPrice = all_product.find((item) => item.id === cartItem.id)?.newPrice || 0; 
          const quantity = cartItem.quantity;
          totalAmount += productPrice * quantity;
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