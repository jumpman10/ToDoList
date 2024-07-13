// eslint-disable-next-line no-unused-vars
import React, {createContext, useState} from 'react';
export const AppContext = createContext();
// eslint-disable-next-line react/prop-types
export const AppProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  return (
    <AppContext.Provider value={{cart, setCart}}>
      {children}
    </AppContext.Provider>
  );
};
