import React, { useState } from 'react'
import EditChoiceItem from './EditChoiceItem'
import "../styles/EditQuiz.css"
import { useNavigate } from 'react-router-dom'


const EditQuestionItem = (props) => {
    const [formData, setFormData] = useState({
        'quizId': props.relatedTo,
        'questionId': props.id,
        'question': props.question,
        'choices': props.options.map(option => {
            return {
                "optionId": option.id, "option": option.choice
            }
        }), //this should be an array
        'selectedChoice': props.selectedChoice.selected,
        'selectedChoiceId': props.selectedChoice.id,
        'marks': props.marks
    })

    const options = props.options?.map((option, index) => {
        // console.log("options rerendered: ", index+1)
        return (
            <EditChoiceItem
                key={index}
                id={option.id}
                relatedTo={option.relatedTo}
                choice={option.choice}
                createdon={option.createdon}
                selectedChoice={formData?.selectedChoice}
                setEditedQuestions={props.setEditedQuestions}
                editedQuestions={props.editedQuestions}
                formData={formData}
                data={props.data}
                setFormData={setFormData}
            />
        )
    })

    const handleNewFormData = (e) => {
        // console.log(e.target.name)
        setFormData(prev => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
        // console.log(formData)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const res = await fetch(
            `http://127.0.0.1:8000/api/quizzes/${props.relatedTo}/edit/`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            }

        )

        const data = await res.json()
        console.log("Edited: ", data)
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        const res = await fetch(
            `http://127.0.0.1:8000/api/quizzes/${props.relatedTo}/edit/`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            }

        )

        const data = await res.json()
        console.log("Deleted: ", data)
        console.log("Before: ", props.data)
        if (data.data === 204) {
            const newData = props.data.questions?.filter(question => question.id !== data.deleted_id)
            console.log("newData: ", newData)
            props.setData((prev) => {
                // console.log("setting new data")
                return {
                    ...prev,
                    questions: newData
                }
            })
            console.log("After", props.data)
            // navigateTo("/")
            // setFormData(null)
        }
    }

    console.log("EditQuestion rendered")
    return (
        <div>
            
                <form onSubmit={handleSubmit}>
                    <div className="edit-form">
                        <div className='edit-question'>
                            <h4 className='edit-question-tag'>
                                Q{props.questionNum}.
                            </h4>
                            <input
                                type="text"
                                value={formData?.question}
                                className="edit-question-input"
                                name={`question`}
                                onChange={handleNewFormData}
                            />

                            <h5>
                                Marks:
                            </h5>
                            <input
                                type="number"
                                value={formData?.marks}
                                className="edit-marks-input"
                                name={`marks`}
                                id="marks"
                                onChange={handleNewFormData}
                            />


                        </div>
                        <div className="edit-options">
                            <h5>Options: {props.isRadio ? "Single Correct" : "Multi Correct"}</h5>
                            {options}
                        </div>
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