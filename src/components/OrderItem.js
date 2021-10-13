import Modal from "./Modal";
import React, { useState } from "react";
import "./OrderItem.css";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [show, setShow] = useState(false);

  const modalClickHandler = (e) => {
    setShow(true);
  };

  return (
    <div>
      <Card className="each-order">
        <div className="each-order__category">
          <p>{props.orderNumber}</p>
        </div>
        <div className="each-order__category">
          <p>{new Date(props.createdOn).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}</p>
        </div>
        <div className="each-order__category">
          <p>{props.fulfillmentStatus}</p>
        </div>
        <div className="each-order__category">
          <p>{props.lineItems.length}</p>
        </div>
        <div className="each-order__category">
          <p className="each-order__total-price">{props.grandTotal.value}</p>
        </div>
        <button onClick={modalClickHandler}>Details</button>
      </Card>
      <Modal
        onClose={() => setShow(false)}
        show={show}
        title={props.orderNumber}
        orderLineItems={props.lineItems}
      ></Modal>
    </div>
  );
};

export default OrderItem;
