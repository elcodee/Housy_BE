import React from 'react'

const Signup = () => {
   return (
      <>
         <div className="modal fade" id="signupmodal" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style={{ display: "none" }} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content signupCustom">
                  <div className="modal-body">
                     <div className="container p-4">
                        <h2 className="fw-bolder text-center">Sign Up</h2>

                        <label class="form-label">Full Name</label>
                        <div className="input-group mb-3">
                           <input type="text" className="form-control" />
                        </div>

                        <label class="form-label">Username</label>
                        <div className="input-group mb-3">
                           <input type="text" className="form-control" />
                        </div>

                        <label class="form-label">Email</label>
                        <div className="input-group mb-3">
                           <input type="email" className="form-control" />
                        </div>

                        <label class="form-label">Password</label>
                        <div className="input-group mb-3">
                           <input type="password" className="form-control" />
                        </div>

                        <label class="form-label">List As</label>
                        <div className="input-group mb-3">
                           <div className="row">
                              <div className="d-flex">
                                 <div className="col-md-4 buttonRadioCustom" style={{ marginLeft: '-10px' }}>
                                    <input type="radio" name="listAs" value="tenant" id="tenant" />
                                    <label for="tenant">Tenant</label>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <label class="form-label">Gender</label>
                        <div className="input-group mb-3">
                           <div className="row">
                              <div className="d-flex">
                                 <div className="col-md-4 buttonRadioCustom" style={{ width: '60%', marginLeft: '-10px' }}>
                                    <input type="radio" name="gender" value="Male" id="Male" />
                                    <label for="Male">Male</label>
                                 </div>
                                 <div className="col-md-4 buttonRadioCustom" style={{ width: '60%', marginLeft: '-10px' }}>
                                    <input type="radio" name="gender" value="Female" id="Female" />
                                    <label for="Female">Female</label>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <label class="form-label">Address</label>
                        <div className="input-group mb-3">
                           <textarea type="password" className="form-control"> </textarea>
                        </div>

                        <div class="d-grid mt-4">
                           <button class="btn btn-primary" type="button">Sign up</button>
                        </div>
                     </div>
                  </div>
                  {/* <p className="text-muted text-center">Don't Have Account ? Klik <a href="/" className="text-decoration-none fw-bolder">Here</a></p> */}
               </div>
            </div>
         </div>
      </>
   )
}

export default Signup
