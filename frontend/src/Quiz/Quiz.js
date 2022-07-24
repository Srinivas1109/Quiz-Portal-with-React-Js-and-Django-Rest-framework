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
                id={quiz.quiz.id}
                index={index + 1}
                title={quiz.quiz.title}
                date={quiz.quiz.createdOn}
                description={`Some description of the quiz ${quiz.quiz.title}`}
                key={index}
                noOfQuestions={quiz.no_of_question}
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