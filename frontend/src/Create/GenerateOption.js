import React from 'react'
import "../styles/GenerateOption.css"

const GenerateOption = (props) => {
  return (
    <div>
      {props.optionType === "singleCorrect" ? (
        <div className="form-check my-2">
          <input className="form-check-input " type="radio" name="question" id={`radio${props.index}`} onChange={props.onChangeAnswer} value={props.index} />
          <label className="form-check-label choice" htmlFor={`radio${props.index}`} >
            <input className="input-box" type="text" placeholder={`Enter option ${props.index}`} name={`choice${props.index}`} id={`radio${props.index}`}  />
          </label>
        </div>
      ) : null}

      {props.optionType === "multiCorrect" ? (
        <div className="form-check my-2">
          <input className="form-check-input " type="checkbox" name={`option${props.index}`} id={`checkbox${props.index}`} value={props.index} />
          <label className="form-check-label choice" htmlFor={`checkbox${props.index}`} >
            <input className="input-box" type="text" placeholder={`Enter option ${props.index}`} name={`choice${props.index}`}  />
          </label>
        </div>
      ) : null}

    </div>
  )
}

export default GenerateOption