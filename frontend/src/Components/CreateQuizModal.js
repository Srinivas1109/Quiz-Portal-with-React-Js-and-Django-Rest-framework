import React, { useState, useRef } from 'react'
import "../styles/CerateQuizModal.css"
import { Link } from 'react-router-dom'

const CreateQuizModal = () => {
    const [quizName, setQuizName] = useState('')
    // const [clicked, setClicked] = useState(false)

    const handleOnChange = (e) => {
        setQuizName(() => e.target.value)
        // console.log(quizName)
    }
    const handleOnClick = () => {
        // console.log(quizName)
        closeRef.current.click()
        // setClicked(true)
    }

    const closeRef = useRef()
    return (
        <>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" ref={closeRef} hidden />


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"

            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Create New Quiz</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-box">
                                <span className="details">Quiz Name</span>
                                <input type="text" name='newQuiz' placeholder="Enter Quiz Name" required onChange={handleOnChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <Link to="/create" state={{ quizName: quizName }}>
                                <button type="button" className="btn btn-success" onClick={handleOnClick}>Create</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateQuizModal