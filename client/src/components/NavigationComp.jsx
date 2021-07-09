import { Link } from "react-router-dom"
import Logo from '../common/img/housy.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Signin from "./modal/Signin"
import Signup from "./modal/Signup"


const Navigation = () => {
   return (
      <>
         <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid ">
               <a href="/">
                  <img src={Logo} alt="housy" className="d-lg-inline-flex navImgCustom" />
               </a>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="menu">
                  <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <form className="d-flex">
                           <input className="form-control navSearchCustom me-2" type="search" placeholder="Search" aria-label="Search" />
                           <button className="btn navButtonSearchCustom" type="submit"> <FontAwesomeIcon icon={faSearch} /></button>
                        </form>
                     </li>
                  </ul>
                  <span className="navbar-text navBtnCustom">
                     <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#signinmodal">
                        Sign in
                     </button>
                     <button type="button" className="btn btnModalCustom" data-bs-toggle="modal" data-bs-target="#signupmodal">
                        Sign up
                     </button>

                     {/* Sign in Modal */}
                     <Signin />

                     {/* Sign up Modal */}
                     <Signup />
                  </span>
               </div>
            </div>
         </nav>
      </>
   )
}

export default Navigation
