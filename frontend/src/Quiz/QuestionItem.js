import React, { useEffect, useState, useContext } from 'react'
import Choice from "./Choice"
import "../styles/question.css"
import parse from 'html-react-parser'
import AuthContext from '../Context/AuthContext'
import Timer from '../Components/Timer'

const QuestionItem = (props) => {

    const { user } = useContext(AuthContext)

    const [timer, setTimer] = useState({
        'hour': 0,
        'minute': 0,
        'second': 0,
    })

    useEffect(() => {
        // console.log("Fetch user time", props.id)

        // setTimer(() => {
        //     return {
        //         'hour': 0,
        //         'minute': 0,
        //         'second': 0,
        //     }
        // })
        fetchUserTime()
        // postUserTime()
    }, [props.qnum])


    const options = props.options.map((option, index) => {
        return (
            <Choice
                key={index}
                id={option.id}
                relatedTo={option.relatedTo}
                choice={option.choice}
                createdon={option.createdon}
                responses={props.responses}
                setResponses={props.setResponses}
                quiz={props.relatedTo}
            />
        )
    })

    const fetchUserTime = async () => {
        const res = await fetch(
            `http://127.0.0.1:8000/api/quizzes/user/timer/`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quiz: props.relatedTo,
                    user: user.user_id,
                    question: props.id
                })
            }
        )
        const data = await res.json()
        // console.log(data.data)
        setTimer(data.data)
        // postUserTime()
    }

    // const postUserTime = async () => {
    //     // const res = await fetch(
    //     //     `http://127.0.0.1:8000/api/quizzes/user/timer-post/`,
    //     //     {
    //     //         method: 'POST',
    //     //         headers: { 'Content-Type': 'application/json' },
    //     //         body: JSON.stringify({
    //     //             quiz: props.relatedTo,
    //     //             user: user.user_id,
    //     //             question: props.id,
    //     //             time: {
    //     //                 'hours': timer.hour,
    //     //                 'minutes': timer.minute,
    //     //                 'seconds': timer.second
    //     //             }
    //     //         })
    //     //     }
    //     // )
    //     // const data = await res.json()
    //     // console.log(data.data)
    //     // setTimer(data.data)
    //     console.log("QuestionItem.js > postUserTime")
    //     console.log(timer)
    // }
    // console.log("QuestionItem: ", props.responses)

    
    return (
        <div className='question-item'>

            <div className="card">
                <div className='d-flex justify-content-between' style={{ backgroundColor: "rgb(23,162,184)" }}>
                    <span className="badge badge-info" style={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", width: "10%", }}>{props.marks} Marks</span>
                    <span className="badge badge-info" style={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", width: "20%" }}><span className='far'>&#xf017; &nbsp;</span>
                        <Timer
                            initialHour={timer.hour}
                            initialMinute={timer.minute}
                            initialSeconds={timer.second}
                            // qnum={props.qnum}
                            // questionId={props.id}
                            // quizId={props.relatedTo}
                        />
                    </span>
                </div>
                <div className="card-header question">
                    {/* <span style={{ color: "hwb(188 9% 10%)" }}>Q{props.questionNum}. </span><p dangerouslySetInnerHTML={{ __html: props.question }} /> */}
                    <span style={{ color: "hwb(188 9% 10%)" }}>Q{props.questionNum}. ID:{props.id} {parse(props.question)}</span>
                </div>
                <ul className="list-group list-group-flush">
                    {options}
                </ul>

                <div className="card-header">
                    <button className="review btn-all btn-review" onClick={() => { props.markForReview(props.id) }}><span><i className="fa fa-star-o" ></i></span> Mark For Review</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionItem