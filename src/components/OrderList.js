import React, { useState } from "react";
import OrderItem from "./OrderItem";
import CustomerItem from "./CustomerItem";
import Card from "../UI/Card";
import "./OrderList.css";
import "./CustomerItems.css";

const OrderList = (props) => {
  const [orders, setOrders] = useState(props.orders);
  const [error, setError] = useState("");
  const [labelVisibility, setLabelVisibility] = useState("hidden");
  const [customerVisibility, setCustomerVisibility] = useState("hidden");
  const [customerInfo, setCustomerInfo] = useState([]);
  const [customerBuild, setCustomerBuild] = useState(false)

  //refresh orders
  const refreshHandler = () => {
    fetch("http://localhost:3000/routes/orders", {
      method: "GET",
      mode: "cors",
    })
      .then((result) => result.json())
      .then((res) => {
        setOrders(res.result);
        setLabelVisibility("visible");
        setCustomerVisibility("hidden");
        setCustomerInfo([])
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const buildCustomers = async () => {
    const customers = {};
    for (let i = 0; i < orders.length; i += 1) {
      if (customers[orders[i].customerEmail] in customers) {
        customers[orders[i].totalSpend] += orders[i].grandTotal.value;
        customers[orders[i].orders].push(orders[i].orderNumber);
      } else {
        customers[orders[i].customerEmail] = {
          shippingAddress: orders[i].shippingAddress,
          totalSpend: orders[i].grandTotal.value,
          orders: [orders[i].id],
        };
      }
    }
    setCustomerBuild(true)
    return customers;
  };
  const customTimeout = async() => {
    setTimeout(console.log("timer going after 5 sec"), 5000)
  }
  const customerHandler = async () => {
    //get all unique customer names
    const customers = await buildCustomers();
    await customTimeout();
    setLabelVisibility("hidden");
    setCustomerVisibility("visible");
    setCustomerInfo(customers);
  };
  //Order mapping to individual components
  const orderItems = orders.map(
    ({
      orderNumber,
      fulfillmentStatus,
      createdOn,
      lineItems,
      grandTotal,
      customerEmail,
    }) => {
      return (
        <OrderItem
          key={orderNumber}
          orderNumber={orderNumber}
          fulfillmentStatus={fulfillmentStatus}
          createdOn={createdOn}
          lineItems={lineItems}
          grandTotal={grandTotal}
          customerEmail={customerEmail}
        ></OrderItem>
      );
    }
  );

  const customerItems = Object.keys(customerInfo).map((key) => {
    return (
    <CustomerItem
    key={key}
    email={key}
    info={customerInfo[key]}
    ></CustomerItem>
    )
  })

  return (
    <div>
      <p>{error}</p>
      <div className="button-headers">
        <button onClick={refreshHandler}>Get Orders</button>
        <button onClick={customerHandler}>Get Customers</button>
      </div>
      <div style={{ visibility: customerVisibility }}>
        <Card classname="customers">
          <div className="customers-labels">
            <label>Email</label>
            <label>Total Spend</label>
            <label>Location</label>
            <label>Orders</label>
          </div>
        
        {customerBuild && customerItems ? customerItems : null}
        </Card>
      </div>
      <div style={{ visibility: labelVisibility }}>
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
    </div>
  );
};

export default OrderList;
