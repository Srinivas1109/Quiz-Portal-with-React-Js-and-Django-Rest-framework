import React, { useState, useRef } from 'react'
import "../styles/CerateQuizModal.css"
import { Link } from 'react-router-dom'

const EditQuizModal = () => {
    const [quizName, setQuizName] = useState('')

    const handleOnChangeQuizName = (e) => {
        setQuizName(() => e.target.value)
        // console.log(quizName)
    }

    const handleOnClick = () => {
        // console.log(quizName)
        closeEditRef.current.click()
        // setClicked(true)
    }

    const closeEditRef = useRef()

    return (
        <>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editQuiz" ref={closeEditRef} hidden />


            {/* <!-- Modal --> */}
            <div className="modal fade" id="editQuiz" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"

            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Quiz</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-box">
                                <span className="details">Quiz Title</span>
                                <input type="text" name='newQuiz' placeholder="Enter Quiz Name" required onChange={handleOnChangeQuizName} />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <Link to="/create" state={{ quizName: quizName }}>
                                <button type="button" className="btn btn-success" onClick={handleOnClick}>Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditQuizModal