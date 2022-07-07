import React from 'react'
import { Link } from "react-router-dom"

const QuizItem = (props) => {

    const parseDate = (dateObj) => {
        const parsedDate = new Date(dateObj);
        const date = parsedDate.getDate();
        const month = parsedDate.getMonth();
        const year = parsedDate.getFullYear();

        const event = new Date(Date.UTC(year, month, date, 0, 0, 0))
        const options = { year: 'numeric', month: 'long', day: 'numeric' }

        return event.toLocaleDateString('en-US', options)
    }

    return (
        <Link to= {`${props.id}/questions`} style={{ textDecoration: 'none', color: "black" }}>
            <div className="card text-center m-2 quiz-item" style={{ width: "18rem" }} >
                <div className="card-body">
                    <h5 className="card-title" >{props.id} {props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Created On: {parseDate(props.date)}</h6>
                    <p className="card-text">{props.description}</p>
                </div>

            </div>
        </Link>

    )
}

export default QuizItem