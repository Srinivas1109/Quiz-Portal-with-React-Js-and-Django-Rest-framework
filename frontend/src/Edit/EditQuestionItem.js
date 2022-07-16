import React from 'react'
import EditChoiceItem from './EditChoiceItem'
import "../styles/EditQuiz.css"


const EditQuestionItem = (props) => {
    const options = props.options.map((option, index) => {
        return (
            <EditChoiceItem
                key={index}
                id={option.id}
                relatedTo={option.relatedTo}
                choice={option.choice}
                createdon={option.createdon}
                setEditedQuestions={props.setEditedQuestions}
                editedQuestions={props.editedQuestions}
            />
        )
    })

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(event.target)
        console.log("Submit Clicked...!")
    }
    const handleDelete = (event) =>{
        event.preventDefault()
        console.log("Delete Clicked...!")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="edit-form">

                    Q{props.questionNum}.
                    <input
                        type="text"
                        defaultValue={props.question}
                        className="edit-question-input"
                        name={`question${props.id}`}
                        onChange={props.newFormData}
                    />
                    {options}
                    <div className="edit-form-btns">
                        <button className='edit-from-submit-btn'><i className="fa fa-save"></i> Save</button>
                        <button className='edit-from-delete-btn' onClick={handleDelete}><i className="fa fa-trash-o"></i> Delete</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditQuestionItem