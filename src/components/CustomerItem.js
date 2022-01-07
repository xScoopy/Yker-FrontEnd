import AddressInfo from "./AddressInfo";
import "./OrderItem.css";
import Card from "../UI/Card";
import "./OrderList.css";
import CustomerModal from "./CustomerModal";
import { useState } from "react";

const CustomerItem = (props) => {
  const [show, setShow] = useState(false);
  let addressInfo = [];
  if (props.info.shippingAddress != null) {
    addressInfo = Object.keys(props.info.shippingAddress).map((key) => {
      return props.info.shippingAddress[key];
    });
  }
  const modalClickHandle = (e) => {
    setShow(true);
  };
  return (
    <div className="customer-line">
      <Card className="each-order">
        <div>
          <p>{props.email}</p>
        </div>
        <div>
          <p>{props.info.totalSpend}</p>
        </div>
        <AddressInfo info={addressInfo}></AddressInfo>
        <div>
          <button onClick={modalClickHandle}>{props.info.orders[0]}</button>
        </div>
      </Card>

      <CustomerModal
        onClose={() => setShow(false)}
        show={show}
        title={props.info.orders[0]}
      ></CustomerModal>
    </div>
  );
};

export default CustomerItem;
