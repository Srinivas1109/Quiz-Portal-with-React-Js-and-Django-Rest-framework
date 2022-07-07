import React from "react"
import "../styles/choice.css"

export default function Choice(props) {

    function exist(array, id, param) {
        const found = array.some(el => el[param] === id)
        return found
    }

    const handleClick = () => {
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
    }

    return (
        <li className={`list-group-item option ${exist(props.responses, props.id, "optionSelected")?"active-option": ""}`} onClick={handleClick}>{props.choice}</li>
    )
}