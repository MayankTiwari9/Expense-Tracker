import React, { useState } from 'react'
import { useAlert } from 'react-alert';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const alert = useAlert();

    const resetPasswordHandler = async() => {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCsdHmEyton0hpjeL78i6sCtLW-udHBNGk",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: email
            })
        }).then((res) => {
          alert.success("Password reset link sent successfully");
        }).catch((err) => {
          alert.error(err.message);
        })
    }

  return (
    <div className='d-flex flex-column w-50 mx-auto m-5 align-items-center'>
      <h1>Forgot Password</h1>
      <div className='d-flex flex-column m-3 w-100'>
        <input className='d-flex flex-column w-50 mx-auto m-5 align-items-center' type='email' placeholder='Your Email' onChange={(e) => setEmail(e.target.value)}/>
        <button className='w-25 mx-auto bg-primary text-white border rounded' onClick={resetPasswordHandler}>Reset Passowrd</button>
      </div>
    </div>
  )
}

export default ForgotPassword;
