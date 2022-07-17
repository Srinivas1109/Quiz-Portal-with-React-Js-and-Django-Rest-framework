import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import EditQuestionItem from './EditQuestionItem'
import "../styles/EditQuiz.css"

const EditQuiz = () => {
    const location = useLocation()
    // const [quizId, setQuizId] = useState(location.state.quiz_id)
    const params = useParams()
    const quizId = params.id
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

    const [editedQuestions, setEditedQuestions] = useState([])

    const newFormData = (questionData) => {
        console.log('questionData')
        console.log(questionData)
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

        console.log(data)
    }

    const questionElements = data.questions?.map((question, index) => {
        return (
            <EditQuestionItem
                key={index}
                questionNum={index + 1}
                id={question.id}
                relatedTo={question.relatedTo}
                question={question.question}
                marks={question.marks}
                isRadio={question.isRadio}
                isTextBox={question.isTextBox}
                createdOn={question.createdOn}
                options={question.choices}
                newFormData={newFormData}
                editedQuestions={editedQuestions}
            />
        )
    })



    return (

        <div>
            {questionElements}
        </div>
    )
}

export default EditQuiz