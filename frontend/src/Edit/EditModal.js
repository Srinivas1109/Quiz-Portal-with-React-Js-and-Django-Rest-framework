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

    const handleClick = (id) => {
        props.setQuestion(prev => {
            return {
                ...prev, selectedChoice: id
            }
        })
    }

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
                                    <label htmlFor="question-text">Question: </label>
                                    <input type="text" className='edit-input edit-input-question' name='question' value={props.question.question} id="question-text" onChange={handleChange} />
                                </div>

                                <div className="marks">
                                    <label htmlFor="marks">Marks: </label>
                                    <input type="number" className='edit-input edit-input-marks' name='marks' value={props.question.marks} id="marks" onChange={handleChange} min="1" />
                                </div>

                                <div className="options">
                                    <p>options:</p>
                                    {props.question.choices.map((choice, index) => {

                                        return (
                                            <div className='edit-choice' key={index}>
                                                <input
                                                    className={`edit-input option ${choice.optionId === props.question.selectedChoice ? "active-option" : ""}`}
                                                    value={(props.question.choices.find(option => option.optionId === choice.optionId)?.choice)}
                                                    name={`choice${choice.optionId}`}
                                                    onChange={(e) => { handleOnChange(e, choice.optionId) }}
                                                    onClick={() => { handleClick(choice.optionId) }}
                                                />
                                                {(choice.optionId === props.question.selectedChoice) && <span className="badge badge-success edit-selected-badge">selected</span>}
                                            </div>
                                        )
                                    })}
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