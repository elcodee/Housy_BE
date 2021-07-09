import NavigationComp from '../../components/NavigationComp'
import UserIcn from '../../common/img/icon/user.svg'
import EmailIcn from '../../common/img/icon/email.svg'
import LockIcn from '../../common/img/icon/lock.svg'
import TenantIcn from '../../common/img/icon/tenant.svg'
import GednerIcn from '../../common/img/icon/gender.svg'
import PhoneIcn from '../../common/img/icon/phone.svg'
import LocationIcn from '../../common/img/icon/location.svg'
import ProfilePict from '../../common/img/icon/profile.svg'

const Profile = () => {
   return (
      <>
         <NavigationComp />
         <div className="overflow-hidden">
            <div className="container">
               <div className="card cardProfile">
                  <div className="card-body">
                     <div className="row">
                        <div className="col-md-6">
                           <h2 className="fw-bolder mx-4 py-4">Personal Info</h2>

                           <div className="d-flex mb-4">
                              <div className="text-center">
                                 <img src={UserIcn} className="rounded mx-4" style={{ width: '50%' }} />
                              </div>
                              <div className="d-block ms-2">
                                 <h5 className="fw-bolder me-5 mb-1">Rama Aditya</h5>
                                 <h6 className="text-muted me-5">Full Name</h6>
                              </div>
                           </div>

                           <div className="d-flex mb-4">
                              <div className="text-center">
                                 <img src={EmailIcn} className="rounded mx-4" style={{ width: '50%' }} />
                              </div>
                              <div className="d-block ms-2">
                                 <h5 className="fw-bolder me-5 mb-1">rama@gmail.com</h5>
                                 <h6 className="text-muted me-5">Email</h6>
                              </div>
                           </div>

                           <div className="d-flex mb-4">
                              <div className="text-center">
                                 <img src={LockIcn} className="rounded mx-4" style={{ width: '50%' }} />
                              </div>
                              <div className="d-block ms-2">
                                 <a href="!#" className="fs-4 text-decoration-none fw-bolder me-5 mb-1">Change Password</a>
                                 <h6 className="text-muted me-5">Password</h6>
                              </div>
                           </div>

                           <div className="d-flex mb-4">
                              <div className="text-center">
                                 <img src={TenantIcn} className="rounded mx-4" style={{ width: '50%' }} />
                              </div>
                              <div className="d-block ms-2">
                                 <h5 className="fw-bolder me-5 mb-1">Tenant</h5>
                                 <h6 className="text-muted me-5">Status</h6>
                              </div>
                           </div>

                           <div className="d-flex mb-4">
                              <div className="text-center">
                                 <img src={GednerIcn} className="rounded mx-4" style={{ width: '50%' }} />
                              </div>
                              <div className="d-block ms-2">
                                 <h5 className="fw-bolder me-5 mb-1">Male</h5>
                                 <h6 className="text-muted me-5">Gender</h6>
                              </div>
                           </div>

                           <div className="d-flex mb-4">
                              <div className="text-center">
                                 <img src={PhoneIcn} className="rounded mx-4" style={{ width: '50%' }} />
                              </div>
                              <div className="d-block ms-2">
                                 <h5 className="fw-bolder me-5 mb-1">0812-3456-7890</h5>
                                 <h6 className="text-muted me-5">Mobile Phone</h6>
                              </div>
                           </div>

                           <div className="d-flex mb-4">
                              <div className="text-center">
                                 <img src={LocationIcn} className="rounded mx-4" style={{ width: '50%' }} />
                              </div>
                              <div className="d-block ms-2">
                                 <h5 className="fw-bolder me-5 mb-1">Perumahan Permata Bintaro Residence C-3</h5>
                                 <h6 className="text-muted me-5">Address</h6>
                              </div>
                           </div>

                        </div>
                        <div className="col-md-6">
                           <div className="container">
                              <img src={ProfilePict} className="rounded ms-auto d-block imgCustomProfile" alt="..." />
                              <button className="btn btn-primary btn-lg ms-auto d-block profileBtnCustom" type="button">Change Photo Profile</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Profile
