import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "../styles/EditQuiz.css"
import EditModal from './EditModal'
import NoDataFound from "../styles/Images/noDataFound.jpg"

const EditQuiz = () => {

    const editModalRef = useRef()
    const params = useParams()
    const quizId = params.id
    const navigateTo = useNavigate()

    const [popUp, setPopUp] = useState({ bool: false, question: '' })

    const [data, setData] = useState({
        'quiz': null,
        'questions': null
    })

    const editData = (param, dataDB) => {
        setData((prev) => {
            return {
                ...prev,
                [param]: dataDB
            }
        })
    }

    useEffect(() => {
        getQuestions()
    }, [quizId])


    const getQuestions = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/edit/`)
            const data = await res.json()
            editData("quiz", data.quiz)
            editData("questions", data.questions)

        } catch (e) {
            console.log("Error EditQuiz.js: ", e)
        }
    }

    const handleDelete = async (event, id) => {
        event.preventDefault()

        const res = await fetch(
            `http://127.0.0.1:8000/api/quizzes/${quizId}/edit/`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 'questionId': id })
            }

        )

        const res_data = await res.json()
        if (res_data.data === 204) {
            const newData = data.questions?.filter(question => question.id !== res_data.deleted_id)
            setData((prev) => {
                return {
                    ...prev,
                    questions: newData
                }
            })
        }
    }

    const [question, setQuestion] = useState({
        'quizId': '',
        'questionId': '',
        'question': '',
        'choices': [], //this should be an array
        'selectedChoice': '',
        'selectedChoiceId': '',
        'marks': ''
    })

    useEffect(() => {
        editModalRef.current.click()
    }, [popUp])

    const updateQuestion = (question) => {
        setPopUp({
            bool: true,
        })
        setQuestion({
            'quizId': quizId,
            'questionId': question.id,
            'question': question.question,
            'choices': question.choices.map(choice => {
                return {
                    optionId: choice.id,
                    choice: choice.choice,
                }
            }), //this should be an array
            'selectedChoice': question.selectedChoice.selected,
            'selectedChoiceId': question.selectedChoice.id,
            'marks': question.marks,
        })
        // console.log("EditQuiz.js: ", question)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        editModalRef.current.click()
        const res = await fetch(
            `http://127.0.0.1:8000/api/quizzes/${quizId}/edit/`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(question)
            }

        )

        const edited_data = await res.json()
        // console.log("edited_data: ", edited_data)
        if (edited_data.status === 100) {

            let oldQuestion = data.questions.find(question => question.id === edited_data.data.questionId)
            // Modify old question
            // console.log("oldQuestion: ", oldQuestion)
            oldQuestion.id = edited_data.data.questionId
            oldQuestion.question = edited_data.data.question
            oldQuestion.marks = edited_data.data.marks
            oldQuestion.selectedChoice.selected = edited_data.data.selectedChoice
            let oldChoices = oldQuestion.choices
            for (let i = 0; i < oldChoices.length; i++) {
                const index = oldChoices.findIndex(choice => {
                    return choice.id === edited_data.data.choices[i].optionId
                })
                oldChoices[index].choice = edited_data.data.choices[i].choice
            }

            // console.log("newQuestion: ", oldQuestion)
        }


        // setData((prev) => {
        //     return { ...prev,

        //     }
        // })
        // console.log("Edited Question: ", data)
    }

    const handleAddClick = () => {
        navigateTo("/create", {state: {'quizName': data.quiz.title}})
    }

    const questionElements = data.questions?.map((question, index) => (
        <div key={question.id} className="question-link">
            <div className="question-text">
                {index + 1}. {question.question}
            </div>
            <div className="edit-delete-buttons">
                <button className='edit-btn' onClick={() => {
                    updateQuestion(question)
                }}><i className="fa fa-pencil"></i> </button>
                <button className='delete-btn' onClick={
                    (e) => { handleDelete(e, question.id) }}><i className="fa fa-trash-o"></i> </button>
            </div>
        </div>
    ))

    return (

        <div className='questions-link-container'>
            <button ref={editModalRef} type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" hidden>Edit Modal</button>
            <div className='edit-header'>
                <h3>Edit</h3>
                <button className='add-new-item' onClick={handleAddClick}><span className='edit-plus-icon'>+</span> ADD</button>

            </div>
            {(questionElements && questionElements.length > 0) ? questionElements : <img className="edit-empty-img" src={NoDataFound} alt="No data found" />}

            {popUp.bool &&
                <EditModal
                    quizTitle={data.quiz.title}
                    handleSubmit={handleSubmit}
                    question={question}
                    setQuestion={setQuestion}
                />

            }


        </div>
    )
}

export default EditQuiz