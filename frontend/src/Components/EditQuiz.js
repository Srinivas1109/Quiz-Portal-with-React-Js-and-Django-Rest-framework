import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom"

const EditQuiz = () => {
    const location = useLocation()
    const [quizId, setQuizId] = useState(location.state.quiz_id)
    console.log("EditQuiz.js: ", quizId)

    const getQuestions = () => {
        console.log("EditQuiz.js: need to fetch questions to edit")
    }
    return (
        <div>
            <h1>

            EditQuiz: Functionalities
            </h1>
            <h1>

                1.Create
            </h1>
            <h1>
                2.Update

            </h1>
            <h1>
                3.Delete

            </h1>
        </div>
    )
}

export default EditQuiz