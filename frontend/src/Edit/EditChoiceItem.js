import React, { useState } from 'react'

const EditChoiceItem = (props) => {

  // const [value, setValue] = useState(props.choice)

  const handleOnChange = (e) => {
    // setValue(e.target.value)
    props.setFormData(prev => {

      const newChoices = prev.choices.map(item =>
        item.optionId === props.id
          ? { ...item, option: e.target.value }
          : item
      )

      return {
        ...prev, "choices": newChoices
      }
    })
  }
  // console.log("OnChange")

  const handleClick = () => {
    props.setFormData(prev => {
      return {
        ...prev, selectedChoice: props.id
      }
    })
  }
  console.log("Edit Choice rendered")
  return (

    <input
      className={`edit-choice-input option ${props.id === props.selectedChoice ? "active-option" : ""}`}
      value={(props.formData.choices.find(choice => choice.optionId === props.id)?.option)}
      // value={value ?? ""}
      name={`choice${props.id}`}
      onChange={handleOnChange}
      onClick={handleClick}
    />
  )
}

export default EditChoiceItem