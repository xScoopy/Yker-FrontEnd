const AddressInfo = (props) => {
    console.log(props.info)
    return (
        <div>
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