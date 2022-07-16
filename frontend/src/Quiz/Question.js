import React, { useEffect, useState, useRef, useContext } from "react"
import QuestionItem from "./QuestionItem"
import { useLocation } from 'react-router-dom'
import QuickViewModal from "./QuickViewModal"
import AuthContext from "../Context/AuthContext"

export default function Question() {
  const [qnum, setQnum] = useState(0)
  const [questions, setQuestions] = useState(null)
  const location = useLocation()
  const [quizId, setQuizId] = useState(location.state.quiz_id)
  const [responses, setResponses] = useState([])
  const [review, setReview] = useState([])
  // const [timer, setTimer] = useState({
  //   'hour': 0,
  //   'minute': 0,
  //   'second': 0,
  // })
  const [loading, setLoading] = useState(true)

  const toggleQuickViewRef = useRef()

  useEffect(() => {
    getQuestions()
    fetchUserResponses()
    setQnum(() => 0)
    setLoading(() => false)
  }, [])

  const getQuestions = async () => {
    const res = await fetch(``)
    const data = await res.json()
    // console.log("Data: ", data)
    setQuestions(() => data)
  }

  const { user } = useContext(AuthContext)

  const fetchUserResponses = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/quizzes/user/responses/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz: quizId,
          user: user.user_id,
        })
      }
    )
    const data = await res.json()
    // console.log("Questions.js > fetchUserResponses", data)
    setResponses(data.data)
  }
  /*
   response = [
    {
      questionId: 20,
      optionSelected: 124
    },
   ]
  */

  /* 
  review = [] // stores question which are marked for review
  */

  const toggleQuickView = () => {
    toggleQuickViewRef.current.click()
  }

  const handleNext = () => {
    setQnum((prevQnum) => prevQnum + 1)
    // postUserTime()
  }

  const handlePrevious = () => {
    setQnum((prevQnum) => prevQnum - 1)
    // postUserTime()
  }

  const checkSelected = (id) => {
    const found = responses.some(res => res.questionId === id)
    // console.log("CheckSelected: ", found)
    return found
  }

  const checkMarkedForReview = (id) => {
    const found = review.some(questionId => questionId === id)
    // console.log("CheckSelected: ", found)
    return found
  }

  const markForReview = (id) => {
    // console.log("Question.js > markForReview: ", id)
    const found = checkMarkedForReview(id)
    if (!found) {
      setReview((prevArray) => {
        return [...prevArray, id]
      })
    } else {
      const newItems = review.filter((questionId) => questionId !== id)
      setReview(() => newItems)
    }
    // console.log(review)
  }

  const questionElements = questions?.map((question, index) => {
    return (
      <QuestionItem
        key={index}
        questionNum={index + 1}
        id={question.id}
        relatedTo={question.relatedTo}
        question={question.question}
        marks={question.marks}
        isRadio={question.isRadio}
        isTextBox={question.isTextBox}
        createdOn={question.createdOn}
        options={question.options}
        responses={responses}
        setResponses={setResponses}
        checkMarkedForReview={checkMarkedForReview}
        markForReview={markForReview}
        toggleQuickView={toggleQuickView}
        // timer={timer}
        // setTimer={setTimer}
        qunum={qnum}
      />
    )
  })

  // If question id in responses array then button color should be changed

  const buttons = questions?.map((question, index) => (
    <button
      key={question.id}
      className={
        `
        question-btn 
        ${(checkSelected(question.id) && !checkMarkedForReview(question.id)) ? "active-btn-selected" : null}
        ${checkMarkedForReview(question.id) ? "active-btn-review" : null}
        `
      }
      onClick={() => {
        setQnum(() => index)
      }}
    >{index + 1}</button>
  ))

  return (
    <div className="quiz-page">
      <div className="questions">
        <QuickViewModal questionElements={questionElements} />
        <button type="button" ref={toggleQuickViewRef} className="btn btn-primary" data-toggle="modal" data-target="#quickViewModal" hidden>
          Launch demo modal
        </button>
        {questionElements ? questionElements[qnum] : null}
      </div>

      <div className="card question-btns" style={{ width: "18rem" }}>
        <div className="card-header">
          {buttons}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="next-prev">
              <button className="btn-all btn-question previous" onClick={handlePrevious} disabled={qnum === 0 ? true : false}>Previous</button>
              <button className="btn-all btn-question next" onClick={handleNext} disabled={qnum === questions?.length - 1 ? true : false}>Next</button>
            </div>
            <div className="end-review">
              <button className="review btn-all btn-quick-view" onClick={toggleQuickView}><span><i className="fa fa-eye"></i></span> Quick View</button>
              <button className="btn-end btn-all btn-end">End Test</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
