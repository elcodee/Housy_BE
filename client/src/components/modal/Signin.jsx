import React from 'react'

const Signin = () => {
   return (
      <>
         <div className="modal fade" id="signinmodal" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content signinCustom">
                  <div className="modal-body">
                     <div className="container p-4">
                        <h2 className="fw-bolder text-center">Sign In</h2>

                        <label class="form-label">Username</label>
                        <div className="input-group mb-3">
                           <input type="text" className="form-control" />
                        </div>

                        <label class="form-label">Password</label>
                        <div className="input-group mb-3">
                           <input type="password" className="form-control" />
                        </div>

                        <div class="d-grid">
                           <button class="btn btn-primary" type="button">Sign in</button>
                        </div>
                     </div>
                  </div>
                  <p className="text-muted text-center">Don't Have Account ? Klik <a href="/" className="text-decoration-none fw-bolder">Here</a></p>
               </div>
            </div>
         </div>
      </>
   )
}

export default Signin
