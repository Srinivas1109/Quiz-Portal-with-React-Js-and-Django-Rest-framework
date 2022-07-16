import React from 'react'
import "../styles/staff.css"
import CreateQuizModal from './CreateQuizModal'
import EditQuizModal from '../Edit/EditQuizModal'

const Staff = () => {
    return (
        <>
            <CreateQuizModal />
            <EditQuizModal />
            <div className="content-center">
                <div className="container-content">
                    <div className="title">Following things offered</div>
                    <div className="all-options">
                        {/* <Link to="/" className=" create-new-quiz">Create New Quiz</Link> */}
                        <button className= "create-new-quiz" data-toggle="modal" data-target="#createNewQuiz">Create New Quiz</button>
                        {/* <button type="button" className="btn btn-primary create-new-quiz" data-toggle="modal" data-target="#exampleModalCenter">
                            Launch demo modal
                        </button> */}
                        {/* <Link to="/" className=" edit-quiz">Edit Quiz (TODO)</Link> */}
                        <button className= "edit-quiz" data-toggle="modal" data-target="#editQuiz">Edit Quiz</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Staff