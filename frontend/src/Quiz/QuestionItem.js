import React from 'react'
import Choice from "./Choice"
import "../styles/question.css"
import parse from 'html-react-parser'

const QuestionItem = (props) => {

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
    // console.log(props.userTimer[props.userTimerIndex].time)
    return (
        <div className='question-item'>

            <div className="card">
                <div className='d-flex justify-content-between' style={{ backgroundColor: "rgb(23,162,184)" }}>
                    <span className="badge badge-info" style={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", width: "10%", }}>{props.marks} Marks</span>
                    <span className="badge badge-info" style={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", width: "20%" }}><span className='far'>&#xf017; &nbsp;</span>
                        <span>
                        {   props.userTime ?(
                            `${props.userTime[props.userTimeIndex]?.time.hour < 10 ? `0${props.userTime[props.userTimeIndex]?.time.hour}` : props.userTime[props.userTimeIndex]?.time.hour} 
                            : ${props.userTime[props.userTimeIndex]?.time.minute < 10 ? `0${props.userTime[props.userTimeIndex]?.time.minute}` : props.userTime[props.userTimeIndex]?.time.minute}
                            : ${props.userTime[props.userTimeIndex]?.time.second < 10 ? `0${props.userTime[props.userTimeIndex]?.time.second}` : props.userTime[props.userTimeIndex]?.time.second}`
                        ):
                        null
                        }
                    </span>
                        {/* {props.userTimer ?
                            <span>
                                {props.userTimer[props.userTimerIndex]?.time.hour} : {props.userTimer[props.userTimerIndex]?.time.minute} : {props.userTimer[props.userTimerIndex]?.time.second}
                            </span> 
                            : null

                        } */}

                    </span>
                </div>
                <div className="card-header question">
                    {/* <span style={{ color: "hwb(188 9% 10%)" }}>Q{props.questionNum}. </span><p dangerouslySetInnerHTML={{ __html: props.question }} /> */}
                    <span style={{ color: "hwb(188 9% 10%)" }}>Q{props.questionNum}. {parse(props.question)}</span>
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