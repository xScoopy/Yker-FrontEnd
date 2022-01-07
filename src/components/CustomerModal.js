import "./Modal.css";
import CustomNotes from "./CustomNotes";
import { useState } from "react";

const CustomerModal = (props) => {
  const [orderInfo, setOrderInfo] = useState(null)
  if (!props.show) {
    return null;
  }
  const getOrderInfo = () => {
      fetch(`http://localhost:3000/routes/orders/${props.title}`, {
        method: "GET",
        mode: "cors",
      })
        .then((result) => {
          result.json()
          .then((jsonRes) => {
            setOrderInfo([jsonRes])
          })
        })
        .catch((err) => {
          console.log(err);
        });
  }
  console.log(orderInfo)
  try{
    console.log(orderInfo[0].lineItems[0].id)
  }
  catch{
    console.log("nope")
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Order Details</h4>
        </div>
        <div className="modal-body">
          <p> Modal Body </p>
          <button onClick={getOrderInfo}>Refresh</button>
          <ul className="modal-lineItems-ul">
            
          <li>{orderInfo ? `${orderInfo[0].lineItems[0].productName} - $ ${orderInfo[0].lineItems[0].unitPricePaid.value}` : "None"}</li>
          <li>{orderInfo ? `Quantity: ${orderInfo[0].lineItems[0].quantity}`:"None"}</li>  
          </ul>
          <br />
          <h4 className="notes-header">Custom Notes</h4>
          <CustomNotes customerEmail={props.customerEmail} />
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
