import React, { useState } from "react"
import QuestionItem from "../Components/QuestionItem"

export default function Question() {
  const [qnum, setQnum] = useState(0)
  const duplicate = [
    {

      "id": 34,

      "relatedTo": 26,
      "question": "In this article, I’d like to reacquaint you with the humble workhorse of communication that is the paragraph. Paragraphs are everywhere. In fact, at the high risk of stating the obvious, you are reading one now. Despite their ubiquity, we frequently neglect their presentation. This is a mistake.",
      "marks": 4,
      "isRadio": true,
      "isTextBox": false,
      "createdOn": "2022-06-28T17:52:22.137Z",
      "lastModifiedOn": "2022-06-28T17:52:22.137Z"
      ,
      "options": [
        {

          "id": 124,

          "relatedTo": 34,
          "choice": "Apis",
          "createdOn": "2022-06-28T17:52:22.140Z",
          "lastModifiedOn": "2022-06-28T17:52:22.140Z"
        }
        ,
        {

          "id": 125,

          "relatedTo": 34,
          "choice": "Coleoptera",
          "createdOn": "2022-06-28T17:52:22.145Z",
          "lastModifiedOn": "2022-06-28T17:52:22.145Z"
        }
        ,
        {

          "id": 126,

          "relatedTo": 34,
          "choice": "Formicidae",
          "createdOn": "2022-06-28T17:52:22.147Z",
          "lastModifiedOn": "2022-06-28T17:52:22.147Z"
        }
        ,
        {

          "id": 127,

          "relatedTo": 34,
          "choice": "Rhopalocera",
          "createdOn": "2022-06-28T17:52:22.150Z",
          "lastModifiedOn": "2022-06-28T17:52:22.150Z"
        }

      ]
    },
    {

      "id": 44,
      "relatedTo": 26,
      "question": "What is the scientific name of a butterfly?",
      "marks": 4,
      "isRadio": true,
      "isTextBox": false,
      "createdOn": "2022-06-28T17:52:22.137Z",
      "lastModifiedOn": "2022-06-28T17:52:22.137Z",
      "options": [
        {

          "id": 128,

          "relatedTo": 44,
          "choice": "Apis",
          "createdOn": "2022-06-28T17:52:22.140Z",
          "lastModifiedOn": "2022-06-28T17:52:22.140Z"
        }
        ,
        {

          "id": 129,

          "relatedTo": 44,
          "choice": "Coleoptera",
          "createdOn": "2022-06-28T17:52:22.145Z",
          "lastModifiedOn": "2022-06-28T17:52:22.145Z"
        }
        ,
        {

          "id": 130,

          "relatedTo": 44,
          "choice": "Formicidae",
          "createdOn": "2022-06-28T17:52:22.147Z",
          "lastModifiedOn": "2022-06-28T17:52:22.147Z"
        }
        ,
        {

          "id": 131,

          "relatedTo": 44,
          "choice": "Rhopalocera",
          "createdOn": "2022-06-28T17:52:22.150Z",
          "lastModifiedOn": "2022-06-28T17:52:22.150Z"
        }

      ]
    },
    {

      "id": 3,

      "relatedTo": 26,
      "question": "What is the scientific name of a butterfly?",
      "marks": 4,
      "isRadio": true,
      "isTextBox": false,
      "createdOn": "2022-06-28T17:52:22.137Z",
      "lastModifiedOn": "2022-06-28T17:52:22.137Z",
      "options": [
        {

          "id": 132,

          "relatedTo": 3,
          "choice": "Apis",
          "createdOn": "2022-06-28T17:52:22.140Z",
          "lastModifiedOn": "2022-06-28T17:52:22.140Z"
        }
        ,
        {

          "id": 133,

          "relatedTo": 3,
          "choice": "Coleoptera",
          "createdOn": "2022-06-28T17:52:22.145Z",
          "lastModifiedOn": "2022-06-28T17:52:22.145Z"
        }
        ,
        {

          "id": 134,

          "relatedTo": 3,
          "choice": "Formicidae",
          "createdOn": "2022-06-28T17:52:22.147Z",
          "lastModifiedOn": "2022-06-28T17:52:22.147Z"
        }
        ,
        {

          "id": 135,

          "relatedTo": 3,
          "choice": "Rhopalocera",
          "createdOn": "2022-06-28T17:52:22.150Z",
          "lastModifiedOn": "2022-06-28T17:52:22.150Z"
        }

      ]
    },
    {

      "id": 40,

      "relatedTo": 26,
      "question": "What is the scientific name of a butterfly?",
      "marks": 4,
      "isRadio": true,
      "isTextBox": false,
      "createdOn": "2022-06-28T17:52:22.137Z",
      "lastModifiedOn": "2022-06-28T17:52:22.137Z"
      ,
      "options": [
        {

          "id": 136,

          "relatedTo": 40,
          "choice": "Apis",
          "createdOn": "2022-06-28T17:52:22.140Z",
          "lastModifiedOn": "2022-06-28T17:52:22.140Z"
        }
        ,
        {

          "id": 137,

          "relatedTo": 40,
          "choice": "Coleoptera",
          "createdOn": "2022-06-28T17:52:22.145Z",
          "lastModifiedOn": "2022-06-28T17:52:22.145Z"
        }
        ,
        {

          "id": 138,

          "relatedTo": 40,
          "choice": "Formicidae",
          "createdOn": "2022-06-28T17:52:22.147Z",
          "lastModifiedOn": "2022-06-28T17:52:22.147Z"
        }
        ,
        {

          "id": 139,

          "relatedTo": 40,
          "choice": "Rhopalocera",
          "createdOn": "2022-06-28T17:52:22.150Z",
          "lastModifiedOn": "2022-06-28T17:52:22.150Z"
        }

      ]
    },
    {

      "id": 41,

      "relatedTo": 26,
      "question": "What is the scientific name of a butterfly?",
      "marks": 4,
      "isRadio": true,
      "isTextBox": false,
      "createdOn": "2022-06-28T17:52:22.137Z",
      "lastModifiedOn": "2022-06-28T17:52:22.137Z"
      ,
      "options": [
        {

          "id": 140,

          "relatedTo": 41,
          "choice": "Apis",
          "createdOn": "2022-06-28T17:52:22.140Z",
          "lastModifiedOn": "2022-06-28T17:52:22.140Z"
        }
        ,
        {

          "id": 141,

          "relatedTo": 41,
          "choice": "Coleoptera",
          "createdOn": "2022-06-28T17:52:22.145Z",
          "lastModifiedOn": "2022-06-28T17:52:22.145Z"
        }
        ,
        {

          "id": 142,

          "relatedTo": 41,
          "choice": "Formicidae",
          "createdOn": "2022-06-28T17:52:22.147Z",
          "lastModifiedOn": "2022-06-28T17:52:22.147Z"
        }
        ,
        {

          "id": 143,

          "relatedTo": 41,
          "choice": "Rhopalocera",
          "createdOn": "2022-06-28T17:52:22.150Z",
          "lastModifiedOn": "2022-06-28T17:52:22.150Z"
        }

      ]
    },
    {

      "id": 42,

      "relatedTo": 26,
      "question": "What is the scientific name of a butterfly?",
      "marks": 4,
      "isRadio": true,
      "isTextBox": false,
      "createdOn": "2022-06-28T17:52:22.137Z",
      "lastModifiedOn": "2022-06-28T17:52:22.137Z"
      ,
      "options": [
        {

          "id": 144,

          "relatedTo": 42,
          "choice": "Apis",
          "createdOn": "2022-06-28T17:52:22.140Z",
          "lastModifiedOn": "2022-06-28T17:52:22.140Z"
        }
        ,
        {

          "id": 145,

          "relatedTo": 42,
          "choice": "Coleoptera",
          "createdOn": "2022-06-28T17:52:22.145Z",
          "lastModifiedOn": "2022-06-28T17:52:22.145Z"
        }
        ,
        {

          "id": 146,

          "relatedTo": 42,
          "choice": "Formicidae",
          "createdOn": "2022-06-28T17:52:22.147Z",
          "lastModifiedOn": "2022-06-28T17:52:22.147Z"
        }
        ,
        {

          "id": 147,

          "relatedTo": 42,
          "choice": "Rhopalocera",
          "createdOn": "2022-06-28T17:52:22.150Z",
          "lastModifiedOn": "2022-06-28T17:52:22.150Z"
        }

      ]
    },
    {

      "id": 43,

      "relatedTo": 26,
      "question": "What is the scientific name of a butterfly?",
      "marks": 4,
      "isRadio": true,
      "isTextBox": false,
      "createdOn": "2022-06-28T17:52:22.137Z",
      "lastModifiedOn": "2022-06-28T17:52:22.137Z"
      ,
      "options": [
        {

          "id": 148,

          "relatedTo": 43,
          "choice": "Apis",
          "createdOn": "2022-06-28T17:52:22.140Z",
          "lastModifiedOn": "2022-06-28T17:52:22.140Z"
        }
        ,
        {

          "id": 149,

          "relatedTo": 43,
          "choice": "Coleoptera",
          "createdOn": "2022-06-28T17:52:22.145Z",
          "lastModifiedOn": "2022-06-28T17:52:22.145Z"
        }
        ,
        {

          "id": 150,

          "relatedTo": 43,
          "choice": "Formicidae",
          "createdOn": "2022-06-28T17:52:22.147Z",
          "lastModifiedOn": "2022-06-28T17:52:22.147Z"
        }
        ,
        {

          "id": 151,

          "relatedTo": 43,
          "choice": "Rhopalocera",
          "createdOn": "2022-06-28T17:52:22.150Z",
          "lastModifiedOn": "2022-06-28T17:52:22.150Z"
        }

      ]
    },
  ]

  const [responses, setResponses] = useState([])

  /*
   response = [
    {
      questionId: 20,
      optionSelected: 124
    },
   ]
  */

  const handleNext = () => {
    setQnum((prevQnum) => prevQnum + 1)
  }

  const handlePrevious = () => {
    setQnum((prevQnum) => prevQnum - 1)
  }

  const questionElements = duplicate.map((question, index) => {
    return (
      <QuestionItem
        key={index}
        questionNum={index + 1}
        id={question.id}
        relatedTo={question.relatedTo}
        question={question.question}
        marks={question.marks}
        isRadio={question.isRadio}
        isTextBox={question.isTextBox}
        createdOn={question.createdOn}
        options={question.options}
        responses={responses}
        setResponses={setResponses}
      />
    )
  })

  // console.log("Question: ", responses)
  const buttons = duplicate.map((item, index) => (
    <button key={index} className="question-btn" onClick={() => { setQnum((prev) => index) }}>{index + 1}</button>
  ))

  return (
    <div className="quiz-page">
      <div className="questions">
        {questionElements[qnum]}
      </div>

      <div className="card question-btns" style={{ width: "18rem" }}>
        <div className="card-header">
          {buttons}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="next-prev">
              <button className="btn-all btn-question previous" onClick={handlePrevious} disabled={qnum === 0 ? true : false}>Previous</button>
              <button className="btn-all btn-question next" onClick={handleNext} disabled={qnum === duplicate.length - 1 ? true : false}>Next</button>
            </div>
            <button className="btn-end btn-all btn-end">End Test</button>
          </li>
        </ul>
      </div>
    </div>
  )
}