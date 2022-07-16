import React from 'react'

const EditChoiceItem = (props) => {
  return (

    <input
      className='edit-choice-input option'
      defaultValue={props.choice}
      name={`choice${props.id}`}
      onChange={props.newFormData}
    />
  )
}

export default EditChoiceItem