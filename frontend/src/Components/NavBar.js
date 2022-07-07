import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import "../styles/navbar.css"


const NavBar = () => {

  const { user, logoutUser } = useContext(AuthContext)
  // console.log(user)
  const handleLogout = () => {
    logoutUser()
  }
  return (
    <div>
      <div className="topnav">
        <Link className="active" to="/">Home</Link>
        {user ? <Link to="/all">Quizzes</Link> : null}
        {user && user.isStaff ? <Link to="/staff">Staff</Link> : null}
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>

        <div className="creds">
          {
            user ?
              <>
                <Link to="/profile" style={{ backgroundColor: "#44e3d8", fontSize: "18px", fontStyle: "bold" }}><span >Hello, {user.username}</span></Link>
                <Link to="/" onClick={handleLogout}><span><i className="fa fa-sign-out" style={{ fontSize: "20px" }}></i></span> Logout</Link>
              </>
              :
              <>
                <Link to="/sign-up"><span><i className='fas fa-user-alt' style={{ fontSize: '17px' }}></i></span> Sign Up</Link>
                <Link to="/login"><span><i className="fa fa-sign-in" style={{ fontSize: "20px" }}></i></span> Login</Link>
              </>
          }

        </div>
      </div>
    </div>
  )
}

export default NavBar