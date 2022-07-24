import React, { useEffect, useState, useRef, useContext } from "react"
import QuestionItem from "./QuestionItem"
import { useParams } from 'react-router-dom'
import QuickViewModal from "./QuickViewModal"
import AuthContext from "../Context/AuthContext"

export default function Question() {
  const [qnum, setQnum] = useState(-1)
  const [questions, setQuestions] = useState(null)

  const params = useParams()
  const quizId = params.id
  const [responses, setResponses] = useState([])
  const [userTime, setUserTime] = useState([])
  const [review, setReview] = useState([])
  const [userTextAnswer, setUserTextAnswer] = useState([])
  // console.log("userAnswer: ", userTextAnswer)
  const [loading, setLoading] = useState(true)

  const toggleQuickViewRef = useRef()


  useEffect(() => {
    getQuestions()
    fetchUserResponses()
    fetchUserTime()
    setQnum(() => 0)
    setLoading(() => false)
    // console.log("Init done")
  }, [])

  const getQuestions = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/quizzes/${quizId}/questions/`)
    const data = await res.json()
    console.log("Data: ", data)
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

  const fetchUserTime = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/quizzes/user/timer/`,
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
    setUserTime(data.data)
    // console.log("Time->", data.data)
  }

  const toggleQuickView = () => {
    toggleQuickViewRef.current.click()
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

  function findTimerIndex(array, id, param) {
    const index = array.findIndex(ele => ele[param] === id)
    return index
  }

  const postUserTime = async () => {
    // console.log("------------------------------------------------------------------")
    // console.log("Post User Time:")
    // console.log("Question Id: ", questions[qnum]?.id)
    // console.log("QUiz Id: ", quizId)
    // console.log("Time: ", userTime[findTimerIndex(userTime, questions[qnum]?.id, "questionId")]?.time)
    // console.log("------------------------------------------------------------------")

    const res = await fetch(
      "http://127.0.0.1:8000/api/quizzes/user/timer-post/",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz: quizId,
          user: user.user_id,
          question: questions[qnum]?.id,
          time: userTime[findTimerIndex(userTime, questions[qnum]?.id, "questionId")]?.time
        })
      }
    )
    const data = await res.json()
    console.log(data, data.data.time)

  }
  const handleNext = () => {
    // console.log(`Questions.js > Next-> questionId: ${questions[qnum].id} quizId: ${quizId} Timer: ${timer.hour} : ${timer.minute}: ${timer.second}`)
    // postUserTimeRef.current.postUserTime()
    postUserTime()
    setQnum((prevQnum) => prevQnum + 1)
    // postUserTime()
  }

  const handlePrevious = () => {
    // console.log(`Questions.js > Previous-> questionId: ${questions[qnum].id} quizId: ${quizId} Timer: ${timer.hour} : ${timer.minute}: ${timer.second}`)
    // postUserTimeRef.current.postUserTime()
    postUserTime()
    setQnum((prevQnum) => prevQnum - 1)
    // postUserTime()
  }

  function exist(array, id, param) {
    const found = array.some(el => el[param] === id)
    return found
  }

  useEffect(() => {
    // console.log("qnum changed")
    // console.log("Qnum: ", qnum)
    if (qnum > -1 && questions) {
      // console.log("Entered in")
      const id = questions[qnum].id
      const exists = exist(userTime, id, "questionId")
      const index = exists ? findTimerIndex(userTime, id, "questionId") : -1
      let hh = exists ? userTime[index]?.time.hour : 0
      let mm = exists ? userTime[index]?.time.minute : 0
      let ss = exists ? userTime[index]?.time.second : 0

      let clearTime = setInterval(() => {
        ss++

        if (ss === 59) {
          mm++
          ss = 0
        }

        if (mm === 59) {
          hh++
          mm = 0
        }

        if (!exists) {
          setUserTime((prev) => {
            return [...prev, { questionId: id, time: { "hour": hh, "minute": mm, "second": ss } }]
          })
        } else {
          setUserTime((usertimer) => {
            return usertimer.map(item =>
              item.questionId === id
                ? { ...item, time: { "hour": hh, "minute": mm, "second": ss } }
                : item
            )
          })
        }

      }, 1000)


      return () => {
        clearInterval(clearTime);
      };
    }
  }, [qnum, questions])




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
        userTime={userTime}
        userTimeIndex={findTimerIndex(userTime, question.id, "questionId")}
        onChangeTextAnswer={setUserTextAnswer}
      />
    )
  })
  // console.log("UserText:", userTextAnswer)
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
        // console.log(`Questions.js > ButtonClick-> questionId: ${questions[qnum].id} quizId: ${quizId} Timer: ${timer.hour} : ${timer.minute}: ${timer.second}`)
        // postUserTimeRef.current.postUserTime()
        postUserTime()
        setQnum(() => index)
      }}
    >{index + 1}</button>
  ))

  return (
    <>

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

    </>

  )
}
