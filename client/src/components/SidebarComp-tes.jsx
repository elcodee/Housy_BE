import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { HouseContextt } from '../context/Filter-tes'
import fakeData from '../data/dummy2'

const SidebarCompTes = () => {
   // Import Global State from context
   const fltr = useContext(HouseContextt);

   // Local State
   const [typeOfRent, setTypeOfRent] = useState("");
   const [bedroom, setBedroom] = useState(0);
   const [bathroom, setBathroom] = useState(0);
   const [amenitie, setAmenitie] = useState([]);
   const [budget, setBudget] = useState(0);

   // Handle Propertys
   const handleRent = (e) => {
      setTypeOfRent(e.target.value)
   }
   const handleBedroom = (e) => {
      setBedroom(e.target.value)
   }
   const handleBathroom = (e) => {
      setBathroom(e.target.value)
   }
   const handleAmenitie = (e) => {
      amenitie.push(e.target.value)
   }
   const handleBudget = (e) => {
      setBudget(e.target.value)
   }

   // Handle Apply
   const handleApply = () => {
      console.log({ typeOfRent, bedroom, bathroom, amenitie, budget })
   }

   return (
      <div className="container rowSidebar">
         <div className="row mb-4" onChange={handleRent}>
            <div className="col-md-12">
               <h3 className="fw-bolder">Type Of Rent</h3>
            </div>
            <div className="col-md-4 buttonRadioCustom">
               <input type="radio" name="rent" value="day" id="day" />
               <label for="day">Day</label>
            </div>
            <div className="col-md-4 buttonRadioCustom">
               <input type="radio" name="rent" value="month" id="month" />
               <label for="month">Month</label>
            </div>
            <div className="col-md-4 buttonRadioCustom">
               <input type="radio" name="rent" value="year" id="year" />
               <label for="year">Year</label>
            </div>
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
            <div className="d-flex" onChange={handleBedroom}>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bedroom" value="1" id="bd1" />
                  <label for="bd1">1</label>
               </div>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bedroom" value="2" id="bd2" />
                  <label for="bd2">2</label>
               </div>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bedroom" value="3" id="bd3" />
                  <label for="bd3">3</label>
               </div>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bedroom" value="4" id="bd4" />
                  <label for="bd4">4</label>
               </div>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bedroom" value="5" id="bd5" />
                  <label for="bd5">5+</label>
               </div>
            </div>

            <div className="col-md-12">
               <h6 className="fw-bolder mt-1 text-muted">Bathroom</h6>
            </div>
            <div className="d-flex" onChange={handleBathroom}>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bathroom" value="1" id="bth1" />
                  <label for="bth1">1</label>
               </div>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bathroom" value="2" id="bth2" />
                  <label for="bth2">2</label>
               </div>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bathroom" value="3" id="bth3" />
                  <label for="bth3">3</label>
               </div>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bathroom" value="4" id="bth4" />
                  <label for="bth4">4</label>
               </div>
               <div className="col-md-4 buttonRadioCustom">
                  <input type="radio" name="bathroom" value="5" id="bth5" />
                  <label for="bth5">5+</label>
               </div>
            </div>
         </div>

         <div className="row mb-4" onChange={handleAmenitie}>
            <div className="col-md-12">
               <h3 className="fw-bolder">Aminities</h3>
            </div>
            <div className="col-12">
               <div class="form-check">
                  <input className="form-check-input" type="checkbox" value="Furnished" id="Furnished" />
                  <label className="form-check-label" for="Furnished">
                     Furnished
                  </label>
               </div>
            </div>
            <div className="col-12">
               <div class="form-check">
                  <input className="form-check-input" type="checkbox" value="Pet Allowed" id="Pet Allowed" />
                  <label className="form-check-label" for="Pet Allowed">
                     Pet Allowed
                  </label>
               </div>
            </div>
            <div className="col-12">
               <div class="form-check">
                  <input className="form-check-input" type="checkbox" value="Shared Accomodation" id="Shared Accomodation" />
                  <label className="form-check-label" for="Shared Accomodation">
                     Shared Accomodation
                  </label>
               </div>
            </div>
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
                  <div className="col-md-8" onChange={handleBudget}>
                     <input type="number" name="budget" id="budget" className="form-control" />
                  </div>
               </div>
            </div>
            <div className="col-md-12">
               <button type="button" onClick={handleApply} className="btn btn-primary fw-bolder float-end btnApply">APPLY</button>
            </div>
         </div>
      </div>
   )
}

export default SidebarCompTes
