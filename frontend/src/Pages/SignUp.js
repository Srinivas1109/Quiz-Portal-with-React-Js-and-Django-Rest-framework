import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/signup.css"
import loginLogo from "../styles/Images/login-logo.png"

const SignUp = () => {

  const [image, setImage] = useState(loginLogo)
  const [error, setError] = useState(false)
  const [onSubmitError, setOnSubmitError] = useState([])
  const navigateTo = useNavigate()

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage("Cannot read image")
      return
    }

    const objectUrl = URL.createObjectURL(e.target.files[0])
    setImage(objectUrl)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    e.target.password.value === e.target.password1.value ? setError(false) : setError(true)
    
    if (!error) {
      const res = await fetch("http://127.0.0.1:8000/api/register/",
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "username": e.target.username.value,
            "first_name": e.target.first_name.value,
            "last_name": e.target.last_name.value,
            "mobileNo": e.target.mobile.value,
            "email": e.target.email.value,
            "password": e.target.password.value,
            "address": e.target.address.value,
          })
        }
      )
      // console.log("Regestered..!")
      const response = await res.json()
      // console.log(response)
      // console.log(response.success.username)
      if (response.status === 201) {
        navigateTo('/login')
      } else {
        setOnSubmitError(response.success.username)
      }

    }
  }

  return (
    <div>
      <div className="content-center">
        <div className="container-signup">
          <div className="title">Registration</div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Firstname</span>
                  <input type="text" name='first_name' placeholder="Enter your Firstname" required />
                </div>
                <div className="input-box">
                  <span className="details">Lastname</span>
                  <input type="text" name='last_name' placeholder="Enter your Lastname" required />
                </div>
                <div className="input-box">
                  <span className="details">Username</span>
                  <input type="text" name='username' placeholder="Enter your Username" required />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input type="email" name='email' placeholder="Enter your E-mail" required />
                </div>

                <div className="input-box">
                  <span className="details">Password</span>
                  <input type="password" name='password' placeholder="Enter your Password" required />
                </div>
                <div className="input-box">
                  <span className="details">Confirm Password</span>
                  <input type="password" name='password1' placeholder="Confirm your Password" required />
                </div>

                <div className="input-box">
                  <span className="details">Phone Number</span>
                  <input type="text" name='mobile' placeholder="Enter your number" required />
                </div>
                <div className="input-box">
                  <span className="details">Address</span>
                  <input type="text" name='address' placeholder="Enter your address" required />
                </div>
              </div>

              <div className="button">
                <input type="submit" value="Register" />
              </div>
              {error ? <p className='errors'>{error}</p> : null}
              {(onSubmitError != [])  ? onSubmitError.map((error, index) => <p key={index} className='errors'>{error}</p>) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp