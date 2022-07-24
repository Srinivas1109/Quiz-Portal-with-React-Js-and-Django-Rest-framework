import React from 'react'

const EditModal = (props) => {
    // console.log(props.question)

    const handleChange = (e) => {
        props.setQuestion((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleOnChange = (e, id) => {
        // setValue(e.target.value)
        props.setQuestion(prev => {

            const newChoices = prev.choices.map(item =>
                item.optionId === id
                    ? { ...item, choice: e.target.value }
                    : item
            )

            return {
                ...prev, "choices": newChoices
            }
        })
    }
    // console.log("OnChange")
    function exist(array, id, param) {
        const found = array.some(el => {
            console.log(el)
            return el[param] === id
        })
        console.log(found)
        return found
    }

    const handleClick = (id) => {
        // console.log(props.question)
        if (!exist(props.question.selectedChoice, id, "correctChoice")) {
            const newSelectedChoice = {
                id: null,
                question: props.question.questionId,
                correctChoice: id
            }
            props.setErrors((prev) => {
                return {
                    ...prev,
                    error: false,
                }
            })
            props.setQuestion((prev) => {
                return {
                    ...prev,
                    selectedChoice: [
                        ...prev.selectedChoice, { ...newSelectedChoice }
                    ]


                }
            })
        } else {
            const afterRemovedChoices = []
            const len = props.question.selectedChoice.length
            for (let i = 0; i < len && len !== 1; i++) {
                if(props.question.selectedChoice[i].correctChoice !== id){
                    afterRemovedChoices.push(props.question.selectedChoice[i])
                }
            }
            if(afterRemovedChoices.length !== 0){
                props.setQuestion((prev) => {
                    return {
                        ...prev,
                        selectedChoice: [
                            ...afterRemovedChoices
                        ]
    
    
                    }
                })

            }

            if(props.question.selectedChoice.length !== 1){
                const res = fetch(
                    `http://127.0.0.1:8000/api/quizzes/${props.quizId}/edit/`,
                    {
                        method: "DELETE",
                        headers:{'Content-Type': 'application/json'},
                        body:JSON.stringify({
                            delete_Choice_id: id
                        })
                    }
                )
            }

            
            // console.log("afterRemovedChoices: ", afterRemovedChoices)

        }
    }
    // const handleClick = (id) => {
    //     props.setQuestion(prev => {
    //         return {
    //             ...prev, selectedChoice: id
    //         }
    //     })
    // }
    // { console.log(props.question.selectedChoice) }
    return (
        <div>
            {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button> */}

            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{props.quizTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='question-body'>
                                <div className="question">
                                    {/* {console.log(parse(props.question.question.props))} */}
                                    <label htmlFor="question-text" className='text-success'>Question: </label>
                                    {/* <TextEditor onChange={handleChange} value={(props.question.question)}/> */}
                                    <input type="text" className='edit-input edit-input-question' name='question' value={props.question.question} id="question-text" onChange={handleChange} />
                                </div>

                                <div className="marks">
                                    <label htmlFor="marks" className='text-success '>Marks: </label>
                                    <input type="number" className='edit-input edit-input-marks' name='marks' value={props.question.marks} id="marks" onChange={handleChange} min="1" />
                                </div>

                                <div className="options">
                                    <div><span className='text-success'>options:</span> {props.question.isRadio && !props.question.isTextBox? <span className='text-primary'>Single Correct</span>: <span className='text-primary'>Multi Correct</span>}</div>
                                    {props.question.choices.map((choice, index) => {

                                        return (
                                            <div className='edit-choice' key={index}>
                                                <input
                                                    className={`edit-input option ${props.question.selectedChoice.some(ele => choice.optionId === ele.correctChoice) ? "active-option" : ""}`}
                                                    value={(props.question.choices.find(option => option.optionId === choice.optionId)?.choice)}
                                                    name={`choice${choice.optionId}`}
                                                    onChange={(e) => { handleOnChange(e, choice.optionId) }}
                                                    onClick={() => { handleClick(choice.optionId) }}
                                                />
                                                {(props.question.selectedChoice.some(ele => choice.optionId === ele.correctChoice)) && <span className="badge badge-success edit-selected-badge">selected</span>}
                                            </div>
                                        )
                                    })}
                                    {props.errors.error && <p className='text-danger'>{props.errors.errorText}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success" onClick={props.handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal