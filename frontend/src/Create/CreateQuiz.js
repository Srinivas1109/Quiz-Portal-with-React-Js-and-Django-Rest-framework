import React, { useState, useEffect, useRef, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import TextEditor from '../Components/TextEditor'
import "../styles/createQuiz.css"
import GenerateOption from './GenerateOption'
import parse from 'html-react-parser'
import AuthContext from "../Context/AuthContext"
import {PulseLoader} from "react-spinners"

const CreateQuiz = () => {

    const location = useLocation()
    const [createdQuestions, setCreatedQuestions] = useState([])
    const display = 'none'
    const [quizId, setQuizId] = useState(null)
    const [error, setError] = useState(false)
    const [uploading, setUploading] = useState(false)
    const { user } = useContext(AuthContext)

    const [formdata, setFormData] = useState({
        "quiz_name": location.state.quizName,
        "quiz_scheduled": location.state.scheduled ? location.state.scheduled : false,
        "quiz_scheduled_time": location.state.quizScheduleTime,
        "question": undefined,
        "marks": 1,
        "optionType": undefined,
        "number_of_options": undefined,
        "options": [],
        "explanation": undefined,
        "correctIndices": [],
        "answer": undefined,
        "text_box_answer": undefined,
        "generate_options": []

    })

    const clearRef = useRef()

    useEffect(() => {
        init()
    }, [quizId])

    const setData = async () => {
        if (quizId !== null) {
            const data = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/questions/`)
            const questions = await data.json()
            setCreatedQuestions(() => questions)
        }
    }

    const init = async () => {

        if (formdata.quiz_name) {

            const res = await fetch(`http://127.0.0.1:8000/api/staff/help/`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "quiz_name": formdata.quiz_name
                    })
                }
            )
            const response = await res.json()
            if (response.status === 200) {
                setQuizId(() => response.quiz_id)
                if (response.quiz_schedule_time) {
                    setFormData((prev) => {
                        return {
                            ...prev,
                            quiz_scheduled: true
                        }
                    })
                    setFormData((prev) => {
                        return {
                            ...prev,
                            quiz_scheduled_time: parseDateTime(response.quiz_schedule_time)
                        }
                    })
                }
            }

            if (quizId !== null) {
                setData()
            }
        }
    }

    const parseDateTime = (date_time) => {
        if (date_time !== null) {
            const date = new Date(date_time)
            const day = date.getDate()
            const mon = date.toLocaleString('default', { month: 'long' })
            const year = date.getFullYear()
            const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            const dateTime = `${mon} ${day} ${year} ${time}`
            return dateTime.toString()
        }
        else return null

    }

    const parseDateTimeDB = (date_time) => {
        if (date_time !== null) {
            const dateTime = new Date(date_time)
            const date = dateTime.getDate()
            const month = dateTime.getMonth()
            const year = dateTime.getFullYear()
            const hour = dateTime.getHours()
            const minutes = dateTime.getMinutes()
            return [year, month, date, hour, minutes]
        }
        else return null
    }

    const handleGenerateOptions = (e) => {
        const generate_options = []
        if (parseInt(e.target.value) > 1) {
            for (let i = 0; i < parseInt(e.target.value); i++) {
                generate_options.push(<GenerateOption index={i + 1} optionType={formdata.optionType} onChangeAnswer={handleAnswer} />)
            }

        }
        setFormData(prev => {
            return {
                ...prev,
                generate_options: generate_options,
                number_of_options: parseInt(e.target.value)
            }
        })
    }

    const handleAnswer = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                answer: parseInt(e.target.value)
            }
        })
    }

    const clearForm = () => {
        clearRef.current.click()
    }

    const handleFormData = (e) => {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const valilateFormData = (body) => {
        if (body.quiz_scheduled === true && body.quiz_scheduled_time === []) {
            return false
        }

        if (body.question && body.option_type && (body.options !== []) && parseInt(formdata.marks) > 0) {
            if (formdata.optionType === "singleCorrect" && body.number_of_options && body.answer !== undefined) {
                return true
            } else if (formdata.optionType === "multiCorrect" && body.number_of_options && body.correctIndices !== []) {
                return true
            } else if (formdata.optionType === "textBox" && body.text_box_answer !== undefined) {
                return true
            }
        }
        return false
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUploading(true)
        const options = []
        const optionsMultiCorrectAns = []
        const correctIndices = []
        let optionNum = 0

        if (formdata.optionType !== "textBox") {
            optionNum = formdata.optionType !== "textBox" ? formdata.number_of_options : 0

            if (formdata.optionType === "singleCorrect" || formdata.optionType === "multiCorrect") {

                for (let index = 1; index <= optionNum; index++) {
                    options.push(e.target[`choice${index}`].value)
                }
            }

            if (formdata.optionType === "multiCorrect") {
                for (let index = 1; index <= optionNum; index++) {
                    optionsMultiCorrectAns.push(e.target[`option${index}`].checked)
                }
                for (let index = 0; index < optionsMultiCorrectAns.length; index++) {
                    if (optionsMultiCorrectAns[index])
                        correctIndices.push(index)
                }
            }
        }

        const body = {
            "quiz_name": formdata.quiz_name,
            "quiz_scheduled": formdata.quiz_scheduled,
            "quiz_scheduled_time": formdata.quiz_scheduled ? parseDateTimeDB(formdata.quiz_scheduled_time) : undefined,
            "question": formdata.question,
            "marks": formdata.marks,
            "option_type": formdata.optionType,
            "number_of_options": formdata.number_of_options,
            "options": options,
            "explanation": formdata.explanation,
            "correctIndices": formdata.optionType === "multiCorrect" ? correctIndices : [],
            "answer": formdata.optionType === "singleCorrect" ? formdata.answer : undefined,
            "text_box_answer": formdata.optionType === "textBox" ? formdata.text_box_answer : undefined,
        }



        if (valilateFormData(body) === true) {
            console.log(body)
            const res = await fetch('http://127.0.0.1:8000/api/staff/upload/',
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                }
            )

            const response = await res.json()
            if (response.status === 201) {
                clearForm()
                // init()
                setQuizId(response.quiz_id)
                // if (quizId !== null) {
                //     const data = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/questions/`,
                //         {
                //             method: "GET",
                //         }
                //     )
                //     const questions = await data.json()
                //     setCreatedQuestions(() => questions)
                // }
                setCreatedQuestions((prev) => {
                    return [...prev, { question: formdata.question }]
                })

            }
        } else {
            setError(true)
            console.log("Error...")
            console.log("Form Data: ", formdata)
            console.log("body Data: ", body)

        }
        setUploading(false)
    }

    const onDismissClose = (e) => {
        e.preventDefault()
        setError(false)
    }

    return (
        <>
            <div>
                {
                    error ?
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Hey, {user.username}</strong> Fill in all the required fields correctly before uploading...!
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" onClick={onDismissClose}>&times;</span>
                            </button>
                        </div>
                        :
                        null
                }
                <form action="upload" method="post" onSubmit={handleSubmit} noValidate>

                    <div className="d-flex justify-content-around mt-3">
                        <div className="w-50 mx-3 create-quiz">
                            <p className="badge badge-info question-title">Question</p>
                            <div className="text-editor">
                                <TextEditor onChange={setFormData} param={"question"} />
                            </div>
                            <div className="marks input-box">
                                <span className='label'>Marks</span>
                                <input type="text" name="marks" value={formdata.marks} placeholder="Enter Marks" required onChange={handleFormData} />
                            </div>
                            <div className="selection">
                                <span className='label'>Question Type</span>
                                <div className="form-check my-2">
                                    <input className="form-check-input " required type="radio" name="optionType" id="singleCorrect" onChange={(e) => {
                                        handleFormData(e); setFormData((prev) => {
                                            return {
                                                ...prev,
                                                generate_options: []
                                            }
                                        })
                                    }} value="singleCorrect" />
                                    <label className="form-check-label options" htmlFor="singleCorrect">
                                        Single Correct
                                    </label>
                                </div>
                                <div className="form-check my-2">
                                    <input className="form-check-input" type="radio" name="optionType" id="MultiCorrect" onChange={handleFormData} value="multiCorrect" />
                                    <label className="form-check-label options" htmlFor="MultiCorrect">
                                        Multi Correct
                                    </label>
                                </div>
                                <div className="form-check my-2">
                                    <input className="form-check-input" type="radio" name="optionType" id="TextBox" onChange={handleFormData} value="textBox" />
                                    <label className="form-check-label options" htmlFor="TextBox">
                                        Text Box
                                    </label>
                                </div>
                            </div>

                            <div className="marks input-box" style={{ display: (formdata.optionType === "textBox" || formdata.optionType === null) ? display : "block" }}>
                                <span className='label'>Number of options required</span>
                                <input type="text" name="number_of_options" required placeholder='Min options should be greater than 1' onChange={handleGenerateOptions} />
                            </div>

                            <div className="generated-options">
                                {formdata.generate_options.length > 1 ? <span className='label'>Options</span> : null}
                                {formdata.generate_options?.map((option, index) => <div key={index}>{option}</div>)}
                                {formdata.optionType === "textBox" ? (
                                    <TextEditor onChange={setFormData} param={"textBoxAnswer"} />
                                ) : null}
                            </div>

                            <div className="explanation">
                                <span className='label'>Explanation</span>
                                <TextEditor onChange={setFormData} param={"explanation"} />
                            </div>

                            <button type="submit" className="btn btn-info upload">{uploading ? <PulseLoader color={"#fff"} loading={uploading} size={15} /> : "Upload"}</button>
                            <button type='reset' style={{ display: 'none' }} ref={clearRef}>Reset</button>
                        </div>


                        <div className="w-50 mx-3 created-questions">

                            <div className="badge badge-primary text-wrap my-2 px-3 py-2 text-monospace quiz-name">
                                {formdata.quiz_name} {formdata.quiz_scheduled ? ("Scheduled On " + parseDateTime(formdata.quiz_scheduled_time)) : null}
                            </div>

                            {createdQuestions.map((question, index) => (
                                // <Link to={`/question/${question.id}/edit/`} className="text-decoration-none text-white" key={index}>
                                <div key={index} className="question">
                                    {/* {console.log(question.question)} */}
                                    {index + 1}. {parse(question.question)}
                                </div>
                                // <div key={index} className="p-2 mb-1 bg-dark text-white text-monospace question">
                                //     {/* {console.log(question.question)} */}
                                //     {index + 1}. {parse(question.question)}
                                // </div>
                                // </Link>
                            ))}
                            <div><Link className="btn btn-info " to={quizId ? `/quizzes/${quizId}/edit` : ''}> Edit</Link></div>

                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateQuiz