import React, { useState, useRef } from 'react'
import "../styles/CerateQuizModal.css"
import { useNavigate } from 'react-router-dom'

const EditQuizModal = () => {
    const [quiz, setQuiz] = useState(null)
    const [error, setError] = useState(false)
    const navigateTo = useNavigate()

    const handleOnChangeQuiz = (e) => {
        setError(() => false)
        setQuiz(() => {
            return {
                'quizName': e.target.value
            }
        }
        )
    }

    const handleOnClick = async () => {

        const res = await fetch(`http://127.0.0.1:8000/api/quizzes/exist/`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'quizName': quiz.quizName
                })
            })

        const data = await res.json()
        if (data.status === 200) {
            console.log(data.data)
            setQuiz(data.data)
            closeEditRef.current.click()
            navigateTo(`/quizzes/${data.data.id}/edit`)

        } else {
            if (data.status === 404 && quiz) { setError(() => true) }
            console.error("EditModal.js > Quiz Not Found")
        }
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
                                <input type="text" name='newQuiz' placeholder="Enter Quiz Name" required onChange={handleOnChangeQuiz} />
                                <h3 className='my-1 text-danger'>{error ? `${quiz.quizName} doesn't exist` : null}</h3>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                            {/* <Link to="/create" state={{ quizName: quizName }}>
                                <button type="button" className="btn btn-success" onClick={handleOnClick}>Edit</button>
                            </Link> */}

                            <button type="button" className="btn btn-success" onClick={handleOnClick}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditQuizModal