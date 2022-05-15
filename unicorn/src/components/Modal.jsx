
const Modal = ({setOpenModal, message, header}) => {

  return (
    <div>
      <div className="modal-background">
          <div className="modalContainer">

            <div className="modal-header">
              <h1>{header}</h1>
            </div>

            <div className="modal-body">
              <p className="modalText">{message}<span className="modalImage"><img src="http://media2.giphy.com/media/26vUw5sYGcqmMDoBy/giphy.gif" alt="unicorn"/></span></p>
            </div>

            <div className="modal-footer">
              <button className="closeBtn" onClick={() => {setOpenModal(false)}}>Close</button>
            </div>
          </div>
      </div>
    </div>
    )
  }

export default Modal