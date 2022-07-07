import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import TextEditor from './TextEditor'
import "../styles/createQuiz.css"
import GenerateOption from './GenerateOption'

const CreateQuiz = () => {

    const location = useLocation()
    const { quizName } = location.state

    // const [createdQuestions, setCreatedQuestions] = useState([])
    const [optionType, setOptionType] = useState(null)
    const [generatedOptions, setGeneratedOptions] = useState([]) // for upload file
    // const [generatedOptionsText, setGeneratedOptionsText] = useState([]) // for database
    const display = 'none'
    const [questionText, setQuestionText] = useState(null)
    const [explanationText, setExplanationText] = useState('None')
    const [textBox, setTextBox] = useState(null)
    const [answer, setAnswer] = useState([])

    // setCreatedQuestions((prev) => (
    //    [ ...prev, ''] 
    // ))
    // console.log(questionText)

    const handleOptionType = (e) => {
        // console.log(e.target.value)
        setOptionType(() => e.target.value)
        setGeneratedOptions([])
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
        console.log(e.target.value)
        setAnswer(() => parseInt(e.target.value))
    }

    const handleSubmit = (e) => {
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

        console.log(body)
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
                        </div>


                        <div className="w-50 mx-3 created-questions">
                            <div className="badge badge-primary text-wrap my-2 px-3 py-2 text-monospace quiz-name">
                                {quizName}
                            </div>

                            <Link to="/" className="text-decoration-none text-white">
                                <div className="p-3 mb-2 bg-dark text-white text-monospace question">
                                    1. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem libero fugiat iste soluta corporis. Nisi eum adipisci dignissimos nostrum numquam unde dolore
                                </div>
                            </Link>
                            <Link to="/" className="text-decoration-none text-white">
                                <div className="p-3 mb-2 bg-dark text-white text-monospace question">
                                    2. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem libero fugiat iste soluta corporis. Nisi eum adipisci dignissimos nostrum numquam unde dolore
                                </div>
                            </Link>

                            <Link className="btn btn-info " to="/preview-all"> Preview All</Link>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateQuiz

