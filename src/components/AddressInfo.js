const AddressInfo = (props) => {
    return (
        <div className="each-order__category">
            <div>
                <p>city: {props.info[4]}</p>
            </div>
            <div>
                <p>state: {props.info[5]}</p>
            </div>
        </div>
    )
}
export default AddressInfo