
import Modal from "./Modal"
import React, {useState} from 'react'

const OrderItem = (props) => {
const [show, setShow] = useState(false)


    return (
        <div>
            <p>Order Number: {props.orderNumber}</p>
            <p>Created On: {new Date(props.createdOn).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
            <p>Fulfillment Status: {props.fulfillmentStatus}</p>
            <p>Total Items: {props.lineItems.length}</p>
            <p>Total Cost: {props.grandTotal.value}</p>
            <Modal onClose={() => setShow(false)} show={show} title="Order Number Here" orderLineItems={props.lineItems}>
            </Modal>
        </div>
    )

}

export default OrderItem