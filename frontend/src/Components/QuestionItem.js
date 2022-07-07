import React from 'react'
import Choice from "./Choice"
import "../styles/question.css"

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
            />
        )
    })
    // console.log("QuestionItem: ", props.responses)
    return (
        <div className='question-item'>
            <div className="card">
                <div className='d-flex justify-content-between' style={{backgroundColor: "rgb(23,162,184)"}}>
                    <span className="badge badge-info" style={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", width: "10%",  }}>{props.marks} Marks</span>
                    <span className="badge badge-info" style={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", width: "20%" }}><span className='far'>&#xf017; &nbsp;</span> 00 : 00 : 00</span>
                </div>
                <div className="card-header question">
                    <span style={{ color: "hwb(188 9% 10%)" }}>Q{props.questionNum}. </span>{props.question}
                </div>
                <ul className="list-group list-group-flush">
                    {options}
                </ul>

                {/* TODO */}
                <div className="card-header">
                    <button className="review btn-all btn-review"><span><i className="fa fa-star-o" ></i></span> Mark For Review</button>
                    <button className="review btn-all btn-quick-view"><span><i className="fa fa-eye"></i></span> Quick View</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionItem