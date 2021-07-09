import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { HouseContext } from '../context/Filter'
import fakeData from '../data/dummy'

const SidebarComp = () => {
   // Import Global State from context
   const fltr = useContext(HouseContext);

   // Type Of Rent
   const [rent, setRent] = useState('year');
   const tors = [
      { name: 'Day', value: 'day' },
      { name: 'Month', value: 'month' },
      { name: 'Year', value: 'year' },
   ]

   // Bedroom
   const [bedroom, setbedroom] = useState(3);
   const bedrooms = [
      { name: 'oneBed', value: 1 },
      { name: 'twoBed', value: 2 },
      { name: 'threeBed', value: 3 },
      { name: 'fourBed', value: 4 },
      { name: 'fiveBed', value: 5 },
   ]

   // Bathroom
   const [bathroom, setBathroom] = useState(2);
   const bathrooms = [
      { name: 'oneBath', value: 1 },
      { name: 'twoBath', value: 2 },
      { name: 'threeBath', value: 3 },
      { name: 'fourBath', value: 4 },
      { name: 'fiveBath', value: 5 },
   ]

   // Amenitie
   const [amenitie, setAmenitie] = useState('Furnished');
   const amenities = [
      { name: 'Furnished' },
      { name: 'Pet Allowed' },
      { name: 'Shared Accomodation' },
   ]

   // Budget
   const [budget, setBudget] = useState(null);

   // Handle APPLY Filter
   const handleApply = () => {
      console.log("click");

      fltr.filteredData(
         fakeData.filter(house => (
            house.detail.rent === rent &&
            house.detail.bedroom === bedroom &&
            house.detail.bathroom === bathroom &&
            house.detail.price <= budget
         ))
      )
   }

   return (
      <div className="container rowSidebar">
         <div className="row mb-4">
            <div className="col-md-12">
               <h3 className="fw-bolder">Type Of Rent</h3>
            </div>
            {tors.map(tor => {
               return (
                  <div className="col-md-4 buttonRadioCustom">
                     <input type="radio" onChange={() => setRent(tor.value)} value={tor.value} id={tor.name} checked={rent == tor.value} />
                     <label for={tor.name}>{tor.name}</label>
                  </div>
               )
            })}
         </div>

         <div className="row mb-4">
            <div className="col-md-12">
               <h3 className="fw-bolder mb-2">Date</h3>
            </div>
            <div className="col-md-12">
               <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faCalendar} /></span>
                  <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
               </div>
            </div>
         </div>

         <div className="row mb-4">
            <div className="col-md-12">
               <h3 className="fw-bolder mb-3">Property Room</h3>
            </div>
            <div className="col-md-12">
               <h6 className="fw-bolder mt-1 text-muted">Bedroom</h6>
            </div>
            <div className="d-flex">
               {bedrooms.map(bdrm => {
                  return (
                     <div className="buttonRadioCustomProperty" >
                        <input type="radio" onChange={() => setbedroom(bdrm.value)} value={bdrm.value} id={bdrm.name} checked={bedroom == bdrm.value} />
                        <label for={bdrm.name}>{bdrm.value}</label>
                     </div>
                  )
               })}
            </div>

            <div className="col-md-12">
               <h6 className="fw-bolder mt-1 text-muted">Bathroom</h6>
            </div>
            <div className="d-flex">
               {bathrooms.map(bthrm => {
                  return (
                     <div className="buttonRadioCustomProperty">
                        <input type="radio" onChange={() => setBathroom(bthrm.value)} value={bthrm.value} id={bthrm.name} checked={bathroom == bthrm.value} />
                        <label for={bthrm.name}>{bthrm.value}</label>
                     </div>
                  )
               })}
            </div>
         </div>

         <div className="row mb-4">
            <div className="col-md-12">
               <h3 className="fw-bolder">Aminities</h3>
            </div>
            {amenities.map(amnt => {
               return (
                  <div className="col-12">
                     <div class="form-check">
                        <label className="form-check-label" for={amnt.name}>
                           {amnt.name}
                        </label>
                        <input className="form-check-input" type="checkbox" onChange={() => setAmenitie(amnt.name)} value={amnt.name} id={amnt.name} />
                     </div>
                  </div>
               )
            })}
         </div>

         <div className="row mb-4">
            <div className="col-12">
               <h3 className="fw-bolder mb-2">Budget</h3>
            </div>
            <div className="col-md-12">
               <div className="d-flex row g-0 align-items-center">
                  <div className="col-md-4">
                     <label for="budget" className="col-md-form-label">Less than IDR.</label>
                  </div>
                  <div className="col-md-8">
                     <input type="number" onChange={(e) => setBudget(parseInt(e.target.value))} id="budget" className="form-control" value={budget} />
                  </div>
               </div>
            </div>
            <div className="col-md-12">
               <button type="button" onClick={handleApply} className="btn btn-primary fw-bolder float-end btnApply">APPLY</button>
            </div>
         </div>


      </div >
   )
}

export default SidebarComp
