import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import Card from '../Components/Card'
import AuthContext from '../Context/AuthContext'

const QuizItem = (props) => {
    const { user } = useContext(AuthContext)
    const parseDate = (dateObj) => {
        const parsedDate = new Date(dateObj);
        const date = parsedDate.getDate();
        const month = parsedDate.getMonth();
        const year = parsedDate.getFullYear();

        const event = new Date(Date.UTC(year, month, date, 0, 0, 0))
        const options = { year: 'numeric', month: 'long', day: 'numeric' }

        return event.toLocaleDateString('en-US', options)
    }
    // console.log("rendering", props && props.id)
    return (
        <>
            {
                (user && user.isStaff) ?
                    <Link to={`${props.id}/edit/`} state={{ "quiz_id": props.id }} style={{ textDecoration: 'none', color: "black" }}>
                        <div className="card text-center m-2 quiz-item" style={{ width: "18rem" }} >
                            <div className="card-body">
                                <h5 className="card-title" >{props.index}. {props.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Created On: {parseDate(props.date)}</h6>
                                <p className="card-text">{props.description}</p>
                                <h6 className="card-text">Questions: {props.noOfQuestions}</h6>
                            </div>
                        </div>
                    </Link>
                    :
                    <>
                        {props.noOfQuestions ? <Link to={`${props.id}/questions/`} state={{ "quiz_id": props.id }} style={{ textDecoration: 'none', color: "black" }}>
                            <div className="card text-center m-2 quiz-item" style={{ width: "18rem" }} >
                                <div className="card-body">
                                    <h5 className="card-title" >{props.index}. {props.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Created On: {parseDate(props.date)}</h6>
                                    <p className="card-text">{props.description}</p>
                                    <h6 className="card-text">Questions: {props.noOfQuestions}</h6>
                                </div>
                            </div>
                            {/* <Card
                            title={props.title}
                            isFavourite={true}
                            secondaryText={"Created On: " + parseDate(props.date)}
                            // supportingText={props.description.length > 40 ? props.description.substring(0, 40) + "...": props.description}
                            supportingText={props.description}
                            img={"https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"}
                        /> */}
                        </Link>
                            :
                            null}
                    </>
            }

        </>

    )
}

export default QuizItem