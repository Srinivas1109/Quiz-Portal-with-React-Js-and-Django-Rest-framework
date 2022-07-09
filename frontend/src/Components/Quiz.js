import React, { useState, useEffect } from "react"
import QuizItem from "./QuizItem"

export default function Quiz() {
    const [quizzes, setQuiz] = useState([])

    const duplicate = [
        {
            "id": 26,
            "title": "General_Knowledge",
            "createdOn": "2022-06-28T17:52:22.134484Z",
            "lastModifiedOn": "2022-06-28T17:52:22.134484Z"
        },
        {
            "id": 27,
            "title": "Animals knowledge",
            "createdOn": "2022-06-28T17:52:22.134484Z",
            "lastModifiedOn": "2022-06-28T17:52:22.134484Z"
        },
        {
            "id": 28,
            "title": "Human knowledge",
            "createdOn": "2022-06-28T17:52:22.134484Z",
            "lastModifiedOn": "2022-06-28T17:52:22.134484Z"
        },
        {
            "id": 29,
            "title": "Tech",
            "createdOn": "2022-06-28T17:52:22.134484Z",
            "lastModifiedOn": "2022-06-28T17:52:22.134484Z"
        },
        {
            "id": 30,
            "title": "Social",
            "createdOn": "2022-06-28T17:52:22.134484Z",
            "lastModifiedOn": "2022-06-28T17:52:22.134484Z"
        },
        {
            "id": 31,
            "title": "Social-Sience",
            "createdOn": "2022-06-28T17:52:22.134484Z",
            "lastModifiedOn": "2022-06-28T17:52:22.134484Z"
        },
        {
            "id": 32,
            "title": "English Grammar",
            "createdOn": "2022-06-28T17:52:22.134484Z",
            "lastModifiedOn": "2022-06-28T17:52:22.134484Z"
        },
        {
            "id": 33,
            "title": "Computers",
            "createdOn": "2022-06-28T17:52:22.134484Z",
            "lastModifiedOn": "2022-06-28T17:52:22.134484Z"
        },
    ]

    useEffect(() => {
        console.log('useEffect in Quiz.js')
        getQuizzes()
        // setQuiz(duplicate)
    }, [])

    const getQuizzes = async () => {
        const res = await fetch('/quiz/')
        const data = await res.json()
        // console.log("Data: ", data)
        setQuiz(() => data)
    }


    const quizElements = quizzes.map((quiz, index) => {
        return (
            <QuizItem id={quiz.id} index={index+1} title={quiz.title} date={quiz.createdOn} description={`Some description of the quiz ${quiz.title}`} key={index} />
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