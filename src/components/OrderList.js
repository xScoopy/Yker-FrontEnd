import React, { useState } from 'react';

const OrderList = (props) => {
    const [orders, setOrders] = useState(props.orders)
    const [error, setError] = useState("")

    //refresh orders
    const refreshHandler = () => {
        fetch("http://localhost:3000/routes/orders", {
            method: "GET",
            mode: "cors"
        })
        .then((result) => result.json())
        .then((res) => {
            setOrders(res.result)
        })
        .catch((err) => {
            setError(err.message)
        })
    }

    //Order mapping to individual components
    const orderItems = orders.map(
        ({ orderNumber, fulfillmentStatus, createdOn, lineItems, grandTotal}) => {
            return (
            <OrderItem 
            orderNumber={orderNumber} 
            fulfillmentStatus={fulfillmentStatus}
            createdOn={createdOn}
            lineItems={lineItems}
            grandTotal={grandTotal}
            >
            </OrderItem>
            )
        }
    )
    return (
        <div>
            <button onClick={refreshHandler}>Refresh</button>
            {orderItems}
        </div>
    )

}

export default OrderList