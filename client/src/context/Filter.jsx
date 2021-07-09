import React, { createContext, useState } from 'react'
import fakeData from '../data/dummy'

export const HouseContext = createContext();

const HouseData = props => {
   const [houses, setHouses] = useState(fakeData);
   // console.log(houses);

   const filteredData = (data) => {
      setHouses(data)
   }

   return (
      <HouseContext.Provider value={{ houses, filteredData }}>
         {props.children}
      </HouseContext.Provider>
   )
}

export default HouseData;