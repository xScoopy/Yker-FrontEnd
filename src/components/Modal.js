import "./Modal.css";

const Modal = (props) => {
    if(!props.show) {
        return null;
    }
    return (
        <div className="modal" onClick={props.onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4 className="modal-title">Order Details</h4>
            </div>
            <div className="modal-body">
                <p>Items</p>
                <ul>
                    {props.orderLineItems.map(({ productName })=> {
                        return <li>{productName}</li>
                    })}
                </ul>
            </div>
            <div className="modal-footer">
              <button onClick={props.onClose} className="button">
                Close
              </button>
            </div>
          </div>
        </div>
      );
}

export default Modal