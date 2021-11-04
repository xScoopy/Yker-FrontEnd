import AddressInfo from "./AddressInfo"
import "./OrderItem.css";
import Card from "../UI/Card";

const CustomerItem = (props) => {
    let addressInfo = []
    if(props.info.shippingAddress != null){
        addressInfo = Object.keys(props.info.shippingAddress).map((key) => {
            return (
                props.info.shippingAddress[key]
            )
          })
    }

    
  return (
    <div>
      <Card className="each-order">
        <div className="each-order__category">
          <p>{props.email}</p>
        </div>
        <div className="each-order__category">
            <p>{props.info.totalSpend}</p>
        </div>
        <AddressInfo info={addressInfo}></AddressInfo>
        <div>
            <p>{props.info.orders[0]}</p>
        </div>
      </Card>

    </div>
  );
};

export default CustomerItem;
