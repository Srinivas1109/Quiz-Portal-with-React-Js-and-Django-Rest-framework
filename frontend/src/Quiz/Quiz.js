import React, { useState, useEffect } from "react"
import QuizItem from "./QuizItem"

export default function Quiz() {
    const [quizzes, setQuiz] = useState([])

    useEffect(() => {
        // console.log('useEffect in Quiz.js')
        getQuizzes()
    }, [])

    const getQuizzes = async () => {
        const res = await fetch('/quiz/')
        const data = await res.json()
        // console.log("Data: ", data)
        setQuiz(() => data)
    }


    const quizElements = quizzes.map((quiz, index) => {
        return (
            <QuizItem
                id={quiz.id}
                index={index + 1}
                title={quiz.title}
                date={quiz.createdOn}
                description={`Some description of the quiz ${quiz.title}`}
                key={index}
            />
        )
    })

    return (
        <>
            <div className="quiz-items-list">
                {quizElements}
            </div>

        </>
    )
}