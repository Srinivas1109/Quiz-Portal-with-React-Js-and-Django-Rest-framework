import React from 'react'

const QuickViewModal = (props) => {

    return (
        <>
            {/* <!-- Button trigger modal --> */}


            {/* <!-- Modal --> */}
            <div className="modal fade bd-example-modal-lg" id="quickViewModal" tabindex="-1" role="dialog" aria-labelledby="quickViewModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="quickViewModalTitle"><span><i className="fa fa-eye"></i></span> Quick View</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {props.questionElements ? props.questionElements : null}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuickViewModal