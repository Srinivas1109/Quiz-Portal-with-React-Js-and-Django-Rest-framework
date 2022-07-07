import React, {useContext} from 'react'
import AuthContext from '../Context/AuthContext'
import "../styles/signup.css"

const UserProfile = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <div className="content-center">
                <div className="container-signup">
                    <div className="title">Profile</div>
                    <div className="content">
                        <form>
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Firstname</span>
                                    <input type="text" name='firstname' value={user.firstname} readOnly/>
                                </div>
                                <div className="input-box">
                                    <span className="details">Lastname</span>
                                    <input type="text" name='lastname' value={user.lastname} readOnly />
                                </div>
                                <div className="input-box">
                                    <span className="details">Username</span>
                                    <input type="text" name='username' value={user.username} readOnly />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="email" name='email' value={user.email} readOnly />
                                </div>

                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input type="text" name='mobile' value={user.mobileNo} readOnly />
                                </div>
                                <div className="input-box">
                                    <span className="details">Address</span>
                                    <input type="text" name='address' value={user.address} readOnly />
                                </div>
                            </div>

                            {/* <div className="button">
                                <input type="submit" value="Register" />
                            </div> */}
                            {/* {error ? <p className='errors'>{error}</p> : null}
                            {onSubmitError.status !== 201 ? <p className='errors'>{`Responded with status code: ${onSubmitError.status} and message: ${onSubmitError.message} `}</p> : null} */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile