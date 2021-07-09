import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import NavigationComp from '../../components/NavigationComp'
import SidebarComp from '../../components/SidebarComp'

const Home = () => {
   const [houseData, setHousesData] = useState([]);

   const getHouse = async () => {
      try {
         let response = await axios.get(`http://localhost:5000/api/v1/houses`)
         setHousesData(response.data.data)
      } catch (e) {
         console.log(e.message);
      }
   }

   useEffect(() => {
      getHouse()
   }, [])
   return (
      <>
         <NavigationComp />
         <div className="overflow-hidden">
            <div className="row">
               <div className="col-md-3">
                  <SidebarComp />
               </div>
               <div className="col-md-9 bgHomeContent">
                  <div className="row">
                     {
                     houseData.map(house => {
                        return (
                           <div className="col-md-4">
                              <div className="card cardCustom">
                                 <span class="badge cardBadgeCustom">{house.ameneties}</span>
                                 <img src={house.image.thumb} className="card-img-top cardImgCustom" alt="..." />
                                 <div className="card-body">
                                    <h5 className="card-title fw-bolder">Rp {parseInt(house.price).toLocaleString('id-ID')} / {house.typeRent}</h5>
                                    <div className="card-text">{house.bedroom} Beds, {house.bathroom} Bath, {parseInt(house.spacious).toLocaleString('id-ID')} sqft</div>
                                    <div className="card-text text-muted">{house.address}</div>
                                 </div>
                              </div>
                           </div>
                        )})
                     }
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Home
