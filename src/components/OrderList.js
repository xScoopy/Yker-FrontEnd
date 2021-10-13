import React, { useState } from "react";
import OrderItem from "./OrderItem";
import Card from "../UI/Card";
import "./OrderList.css";

const OrderList = (props) => {
  const [orders, setOrders] = useState(props.orders);
  const [error, setError] = useState("");

  //refresh orders
  const refreshHandler = () => {
    fetch("http://localhost:3000/routes/orders", {
      method: "GET",
      mode: "cors",
    })
      .then((result) => result.json())
      .then((res) => {
        setOrders(res.result);
      })
      .catch((err) => {
        setError(err.message);
      });
  };


  //Order mapping to individual components
  const orderItems = orders.map(
    ({ orderNumber, fulfillmentStatus, createdOn, lineItems, grandTotal }) => {
      return (
        <OrderItem
          key={orderNumber}
          orderNumber={orderNumber}
          fulfillmentStatus={fulfillmentStatus}
          createdOn={createdOn}
          lineItems={lineItems}
          grandTotal={grandTotal}
        ></OrderItem>
      );
    }
  );
  return (
    <div>
      <p>{error}</p>
      <div className="button-headers">
        <button onClick={refreshHandler}>Get Orders</button>
        <button>Get Customers</button>
      </div>
      <Card className="orders">
        <div className="orders-labels">
          <label>Order Number</label>
          <label>Created On</label>
          <label>Fulfillment Status</label>
          <label>Total Items</label>
          <label>Total Cost</label>
          <label></label>
          <label></label>
          <label></label>
          <label></label>
        </div>
        {orderItems}
      </Card>
    </div>
  );
};

export default OrderList;
