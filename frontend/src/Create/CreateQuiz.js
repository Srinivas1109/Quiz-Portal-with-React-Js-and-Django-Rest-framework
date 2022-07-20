import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import TextEditor from '../Components/TextEditor'
import "../styles/createQuiz.css"
import GenerateOption from './GenerateOption'
import parse from 'html-react-parser'

const CreateQuiz = () => {

    const location = useLocation()
    const { quizName } = location.state

    const [createdQuestions, setCreatedQuestions] = useState([])
    const [optionType, setOptionType] = useState(null)
    const [generatedOptions, setGeneratedOptions] = useState([]) // for upload file
    // const [generatedOptionsText, setGeneratedOptionsText] = useState([]) // for database
    const display = 'none'
    const [questionText, setQuestionText] = useState(null)
    const [explanationText, setExplanationText] = useState('None')
    const [textBox, setTextBox] = useState(null)
    const [answer, setAnswer] = useState([])
    const [quizId, setQuizId] = useState(null)
    const [quizScheduleTime, setQuizScheduleTime] = useState(location.state.quizScheduleTime)
    const [scheduled, setScheduled] = useState(location.state.scheduled)


    const clearRef = useRef()
    // setCreatedQuestions((prev) => (
    //    [ ...prev, ''] 
    // ))
    // console.log(questionText)

    useEffect(() => {
        init()

    }, [quizId])

    const setData = async () => {
        if (quizId !== null) {
            const data = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/questions/`)
            const questions = await data.json()
            // console.log("createQUiz.js: ", questions)
            setCreatedQuestions(() => questions)
        }
    }

    const init = async () => {
        console.log("CreateQuiz.js: Init executed")
        setOptionType(() => null)
        setGeneratedOptions(() => [])
        setQuestionText(() => null)
        setExplanationText(() => "None")
        setTextBox(() => null)
        setAnswer(() => [])
        if (quizName) {

            const res = await fetch(`http://127.0.0.1:8000/api/staff/help/`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "quiz_name": quizName
                    })
                }
            )
            const response = await res.json()
            console.log("createQuiz.js: ", response)
            if (response.status === 200) {
                setQuizId(() => response.quiz_id)
                if (response.quiz_schedule_time) {
                    setScheduled(() => true)
                    setQuizScheduleTime(() => parseDateTime(response.quiz_schedule_time))
                }
            }

            if (quizId !== null) {
                setData()
            }
        }
    }
    // init()
    const handleOptionType = (e) => {
        // console.log(e.target.value)
        setOptionType(() => e.target.value)
        setGeneratedOptions([])
    }

    const parseDateTime = (date_time) => {
        // console.log(date_time)
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
        setGeneratedOptions([])
        // console.log(e.target.value)
        if (e.target.value > 1) {
            for (let i = 0; i < e.target.value; i++) {
                setGeneratedOptions((prev) => ([...prev, <GenerateOption index={i + 1} optionType={optionType} onChangeAnswer={handleAnswer} />]))
            }
        }
    }


    const handleAnswer = (e) => {
        // console.log(e.target.value)
        setAnswer(() => parseInt(e.target.value))
    }

    const clearForm = () => {
        clearRef.current.click()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const marks = parseInt(e.target.marks.value)

        const options = []
        const answers = []
        const correctIndices = []
        let optionNum = 0

        if (optionType !== "textBox") {
            optionNum = optionType !== "textBox" ? parseInt(e.target.optionsNumber.value) : 0
            for (let index = 1; index <= parseInt(e.target.optionsNumber.value); index++) {
                options.push(e.target[`choice${index}`].value)
            }

            if (optionType === "multiCorrect") {
                for (let index = 1; index <= optionNum; index++) {
                    answers.push(e.target[`option${index}`].checked)
                }
                for (let index = 0; index < answers.length; index++) {
                    if (answers[index])
                        correctIndices.push(index)
                }
            }
        }

        const body = {
            "quiz_name": quizName,
            "quiz_scheduled": scheduled ? scheduled : false,
            "quiz_scheduled_time": parseDateTimeDB(quizScheduleTime),
            "question": questionText,
            "marks": marks,
            "option_type": optionType,
            "number_of_options": optionNum,
            "options": options,
            "explanation": explanationText,
            "correctIndices": optionType === "multiCorrect" ? correctIndices : [],
            "answer": optionType === "singleCorrect" ? answer : null,
            "text_box_answer": optionType === "textBox" ? textBox : null,
        }

        // console.log(body)
        // const date = new Date(quizScheduleTime)
        // console.log(date)
        const res = await fetch('http://127.0.0.1:8000/api/staff/upload/',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }
        )

        const response = await res.json()
        console.log("createQuiz.js: ", response)
        if (response.status === 201) {
            clearForm()
            init()
            setQuizId(response.quiz_id)
            if (quizId !== null) {
                const data = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/questions/`,
                    {
                        method: "GET",
                    }
                )
                const questions = await data.json()
                // console.log(await data.json())
                setCreatedQuestions(() => questions)
            }

        }
    }

    return (
        <>
            <div>
                <form action="upload" method="post" onSubmit={handleSubmit} noValidate>

                    <div className="d-flex justify-content-around mt-3">
                        <div className="w-50 mx-3 create-quiz">
                            <p className="badge badge-info question-title">Question</p>
                            <div className="text-editor">
                                <TextEditor onChange={setQuestionText} />
                            </div>
                            <div className="marks input-box">
                                <span className='label'>Marks</span>
                                <input type="number" name="marks" min="1" placeholder="Enter Marks" required />
                            </div>
                            <div className="selection">
                                <span className='label'>Question Type</span>
                                <div className="form-check my-2">
                                    <input className="form-check-input " type="radio" name="optionType" id="singleCorrect" onChange={handleOptionType} value="singleCorrect" />
                                    <label className="form-check-label options" htmlFor="singleCorrect">
                                        Single Correct
                                    </label>
                                </div>
                                <div className="form-check my-2">
                                    <input className="form-check-input" type="radio" name="optionType" id="MultiCorrect" onChange={handleOptionType} value="multiCorrect" />
                                    <label className="form-check-label options" htmlFor="MultiCorrect">
                                        Multi Correct
                                    </label>
                                </div>
                                <div className="form-check my-2">
                                    <input className="form-check-input" type="radio" name="optionType" id="TextBox" onChange={handleOptionType} value="textBox" />
                                    <label className="form-check-label options" htmlFor="TextBox">
                                        Text Box
                                    </label>
                                </div>
                            </div>

                            <div className="marks input-box" style={{ display: (optionType === "textBox" || optionType === null) ? display : "block" }}>
                                <span className='label'>Number of options required</span>
                                <input type="number" name="optionsNumber" min="2" required placeholder='Min options should be greater than 1' onChange={handleGenerateOptions} />
                            </div>

                            <div className="generated-options">
                                {generatedOptions.length > 1 ? <span className='label'>Options</span> : null}
                                {generatedOptions ? generatedOptions.map((option, index) => <div key={index}>{option}</div>) : null}
                                {optionType === "textBox" ? (
                                    <TextEditor onChange={setTextBox} />
                                ) : null}
                            </div>

                            <div className="explanation">
                                <span className='label'>Explanation</span>
                                <TextEditor onChange={setExplanationText} />
                            </div>

                            <button type="submit" className="btn btn-info upload">Upload</button>
                            <button type='reset' style={{ display: 'none' }} ref={clearRef}>Reset</button>
                        </div>


                        <div className="w-50 mx-3 created-questions">

                            <div className="badge badge-primary text-wrap my-2 px-3 py-2 text-monospace quiz-name">
                                {quizName} {scheduled ? ("Scheduled On " + parseDateTime(quizScheduleTime)) : null}
                            </div>

                            {createdQuestions.map((question, index) => (
                                <Link to={`/question/${question.id}/edit/`} className="text-decoration-none text-white" key={index}>
                                    <div className="p-2 mb-1 bg-dark text-white text-monospace question">
                                        {/* <p dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question.question}` }} /> */}
                                        {index+1}. {parse(question.question)}
                                    </div>
                                </Link>
                            ))}
                            <div><Link className="btn btn-info " to={`/quizzes/${quizId}/edit`}> Edit</Link></div>

                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateQuiz
