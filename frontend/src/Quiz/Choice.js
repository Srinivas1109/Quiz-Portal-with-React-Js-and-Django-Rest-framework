import React, { useContext } from "react"
import AuthContext from "../Context/AuthContext"
import "../styles/choice.css"

export default function Choice(props) {
    const { user } = useContext(AuthContext)

    function exist(array, id, param) {
        const found = array.some(el => el[param] === id)
        return found
    }

    const handleClick = async () => {
        // console.log(exist())
        // const responses = props.responses
        if (!exist(props.responses, props.relatedTo, "questionId")) {
            props.setResponses((prev) => {
                return [...prev, { questionId: props.relatedTo, optionSelected: props.id }]
            })
        } else {
            props.setResponses((responses) => {
                return responses.map(item =>
                    item.questionId === props.relatedTo
                        ? { ...item, optionSelected: props.id }
                        : item
                )
            })
        }
        // console.log("Choice: ", props.responses)
        const res = await fetch('http://127.0.0.1:8000/api/quizzes/test/', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: user.user_id,
                quiz: props.quiz,
                question: props.relatedTo,
                option: props.id
            })
        })

        const data = await res.json()
        console.log("Choice.js > handleClick", data)
    }

    return (
        <div>
            <li className={`list-group-item option ${exist(props.responses, props.id, "optionSelected") ? "active-option" : ""}`} onClick={handleClick}>
                {props.choice}
                {exist(props.responses, props.id, "optionSelected") && <span className="badge badge-success user-selected-badge">selected</span>}
            </li>
        </div>
    )
}