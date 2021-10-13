

const OrderItem = (props) => {
    


    return (
        <div>
            <p>Order Number: {props.orderNumber}</p>
            <p>Created On: {new Date(props.createdOn).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
            <p>Fulfillment Status: {props.fulfillmentStatus}</p>
            <p>Items:</p>
            <ul>
                {props.lineItems.map(({ id, productName }) => {
                    return <li key={id}>{productName}</li>
                })}
            </ul>
            <p>Total Cost: {props.grandTotal.value}</p>
        </div>
    )

}

export default OrderItem