import React, { useState, useRef } from 'react'
import "../styles/CerateQuizModal.css"
import { Link, useNavigate } from 'react-router-dom'

const CreateQuizModal = () => {
    const [quiz, setQuiz] = useState('')
    const [quizSchedule, setQuizSchedule] = useState(null)
    const [quizScheduleTime, setQuizScheduleTime] = useState(null)
    const [error, setError] = useState(false)
    // const [clicked, setClicked] = useState(false)
    const navigateTo = useNavigate()
    const closeRef = useRef()

    const handleOnChangeQuiz = (e) => {
        setError(() => false)
        setQuiz(() => {
            return { "quizName": e.target.value }
        })
        // console.log(quizName)
    }
    const handleOnChangeQuizSchedule = (e) => {
        setQuizSchedule(() => e.target.checked)
        // console.log(e.target.checked)
    }

    const handleOnChangeQuizScheduleTime = (e) => {
        // console.log(e.target.value)
        setQuizScheduleTime(() => quizSchedule ? e.target.value : null)
    }
    const handleOnClick = async () => {
        // console.log(quiz.quizName)
        // closeRef.current.click()
        // setClicked(true)

        const res = await fetch(`http://127.0.0.1:8000/api/quizzes/exist/`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'quizName': quiz.quizName
                })
            })

        const data = await res.json()
        if (data.status === 404) {
            // console.log(data.data)
            setQuiz(data.data)
            closeRef.current.click()
            // navigateTo(`/create/${data.data.id}/edit`)
            navigateTo(`/create/`, {state:{ quizName: quiz.quizName, scheduled: quizSchedule, quizScheduleTime: quizScheduleTime }})
            // console.log(quiz)

        } else {
            if (data.status === 200 && quiz) { setError(() => true) }
            console.error("EditModal.js > Quiz Already Exist")
        }
    }



    const setDateTime = () => {
        const current = new Date();
        const date = (current.getDate()) < 10 ? ("0" + (current.getDate())) : (current.getDate())
        const month = (current.getMonth() + 1) < 10 ? ("0" + (current.getMonth() + 1)) : (current.getMonth() + 1)
        const hours = (current.getHours()) < 10 ? ("0" + (current.getHours())) : (current.getHours())
        const minutes = (current.getMinutes()) < 10 ? ("0" + (current.getMinutes())) : (current.getMinutes())
        const date_time = `${current.getFullYear()}-${month}-${date}T${hours}:${minutes}`;
        return date_time.toString()
    }
    // console.log(typeof setDateTime())
    return (
        <>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createNewQuiz" ref={closeRef} hidden />


            {/* <!-- Modal --> */}
            <div className="modal fade" id="createNewQuiz" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"

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
                                <span className="details">Quiz Title</span>
                                <input type="text" name='newQuiz' placeholder="Enter Quiz Name" required onChange={handleOnChangeQuiz} />
                                <h3 className='my-1 text-danger'>{error ? `${quiz.quizName} Aready using...!` : null}</h3>
                            </div>
                            <div className="form-check schedule">
                                <input className="form-check-input" type="checkbox" id="schedule" onChange={handleOnChangeQuizSchedule} />
                                <label className="form-check-label" htmlFor="schedule">
                                    Schedule Test
                                </label>
                            </div>
                            {quizSchedule ? (
                                <div className="date-time">
                                    <label htmlFor="meeting-time">Choose a time for your appointment:</label>

                                    <input type="datetime-local" id="meeting-time"
                                        name="meeting-time"
                                        min={setDateTime()}
                                        onChange={handleOnChangeQuizScheduleTime}
                                    />
                                </div>
                            ) : null}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                            {/* <Link to="/create" state={{ quizName: quizName, scheduled: quizSchedule, quizScheduleTime: quizScheduleTime }}>
                                <button type="button" className="btn btn-success" onClick={handleOnClick}>Create</button>
                            </Link> */}
                            <button type="button" className="btn btn-success" onClick={handleOnClick}>Create</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateQuizModal