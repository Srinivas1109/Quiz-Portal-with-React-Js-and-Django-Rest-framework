import React, { useContext } from 'react'
import "../styles/login.css"
import { Link } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'


const Login = () => {

    const { loginUser } = useContext(AuthContext)

    return (
        <>
            <div className="logo text-center">
                <h1 className='far fa-user-circle'></h1>
            </div>
            <div className="wrapper">
                <div className="inner-warpper text-center">
                    <h2 className="title">Login to your account</h2>
                    <form action="" id="formvalidate" onSubmit={loginUser}>
                        <div className="input-group">
                            {/* <label className="palceholder" for="userName">User Name</label> */}
                            <input className="form-control" name="username" id="userName" type="text" placeholder="Username" />
                            <span className="lighting"></span>
                        </div>
                        <div className="input-group">
                            {/* <label className="palceholder" for="userPassword">Password</label> */}
                            <input className="form-control" name="password" id="userPassword" type="password" placeholder="Password" />
                            <span className="lighting"></span>
                        </div>

                        <button className= 'submitBtn' type="submit" id="login">Login</button>
                        <div className="clearfix supporter">
                            <div className="pull-left remember-me">
                                {/* <input id="rememberMe" type="checkbox" /> */}
                                    {/* <label for="rememberMe">Remember Me</label> */}
                            </div>
                            <Link className="forgot pull-right" to= "/">Forgot Password?</Link>
                        </div>
                    </form>
                </div>
                <div className="signup-wrapper text-center">
                    <Link to= "/sign-up">Don't have an accout? <span className="text-primary">Create One</span></Link>
                </div>
            </div>
        </>
    )
}

export default Login