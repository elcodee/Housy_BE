import React, { createContext, useReducer } from 'react'

export const HouseContextt = createContext();

const initialState = {
   search: "",
   filter: {
      rent: "",
      amenities: [],
      bedroom: 0,
      bathroom: 0,
      price: 0,
      area: 0,
      location: "",
   }
}

const filterReducer = (state, { type, payload }) => {
   console.log("State: ", state);
   switch (type) {
      case "FILTER":
         return {
            ...state,
            ...payload,
         };
      default:
         throw new Error("default");
   }
};

const HouseData = ({ children }) => {
   const [filterState, filterDispatch] = useReducer(filterReducer, initialState);

   return (
      <HouseContextt.Provider value={{ filterState, filterDispatch }}>
         {children}
      </HouseContextt.Provider>
   )
}

// export default HouseData;