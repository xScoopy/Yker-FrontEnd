import "./Modal.css";
import CustomNotes from './CustomNotes'

const Modal = (props) => {
    if(!props.show) {
        return null;
    }
    return (
        <div className="modal" onClick={props.onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4 className="modal-title">{props.title}</h4>
            </div>
            <div className="modal-body">
                <ul className='modal-lineItems-ul'>
                    {props.orderLineItems.map(({ productName, unitPricePaid, customizations })=> {
                        return (
                        <li className='modal-lineItems-li'>{productName} - ${unitPricePaid.value}
                        <ul className='customizations-ul'>
                            {customizations.map(({ label, value }) => {
                                return <li className='customizations-li'>{label}: {value}</li>
                            })}
                        </ul>
                        </li>
                        )
                    })}
                </ul>
                    <br />
                    <h4 className='notes-header'>Custom Notes</h4>
                    <CustomNotes  customerEmail={props.customerEmail}/>
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