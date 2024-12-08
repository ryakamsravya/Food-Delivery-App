import React from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {
    addItemToCart,
    removeItemFromCart,
    updateCartQuantity,
} from "../../actions/cartActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {cartItems}=useSelector((state)=>state.cart);
    // function to remove item from cart
    const removeCartItemHandler=(id)=>{
        dispatch(removeItemFromCart(id));
    }
    // function to increase quantity
    const increaseQty=(id,quantity,stock)=>{
        const newQty=quantity+1;
        if(newQty>stock)return;
        dispatch(addItemToCart(id,newQty));
    };
    // function for decreasing quantity
    const decreaseQty=(id,quantity)=>{
        if(quantity>1){
            const newQty=quantity-1;
            dispatch(updateCartQuantity(id,newQty));
        }
    };
    // function to navigate to delivery page
    const checkoutHandler=()=>{
        navigate("/delivery");
    };
  return (
    <>
    {/*conditional rendering based on cartItems */}
    {
        cartItems.length===0?(
            <h2 className="mt-5">Your Cart is Empty</h2>
        ):(
            <>
            {/* displaying the number of items in cart */}
            <h2 className="mt-5">
                Your Cart:<b>{cartItems.length} items</b>
            </h2>
            {/* cart items  */}
            <div className="rowd-flex justify-content-between cart">
                <div className="col-12 col-lg-8">
                    {cartItems.map((item)=>(
                        <>
                        <hr/>
                        <div className="cart-item" key={item.fooditem}>
                <div className="row">
                    {/* display item image */}
                    <div className="col-4 col-lg-3">
                        <img src={item.image} alt="items" height="90" width="115"></img>
                    </div>
                    {/* display item name */}
                    <div className="col-5 col-lg-3">{item.name}</div>
                    {/* display item price */}
                    <div className="col-4 col-lg-2 mt-4mt-lg-0">
                        <p id="card_item_price">
                            <FontAwesomeIcon icon={faIndianRupeeSign} size="xs"/>
                            {item.price}
                        </p>
                    </div>
                    {/* quantity controls */}
                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                            {/* decrease qty button */}
                            <span className="btn btn-danger minus" 
                            onClick={()=>
                            decreaseQty(item.fooditem,item.quantity)}
                            >-
                            </span>
                            {/* display current quantity */}
                            <input 
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                            />
                            {/* increase quantity button */}
                            <span className="btn btn-primary plus" 
                            onClick={()=>
                            increaseQty(
                                item.fooditem,
                                item.quantity,
                                item.stock
                            )
                            }
                            >+

                            </span>
                        </div>
                    </div>
                    {/* remove item button */}
                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={()=> removeCartItemHandler(item.fooditem)}
                        ></i>
                    </div>

                     </div>
                   </div>
                        </>
                    ))}
                </div>
                {/* order summary */}
                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        {/* display total */}
                        <p>
                            Subtotal:
                            <span className="order-summary-values">
                                {cartItems.reduce((acc,item)=>acc+Number(item.quantity),0)}
                                (Units)
                            </span>
                        </p>
                        {/* reduce() in javascript is used to count total no of items in cart by adding the qauntities of each item */}
                        {/* display total */}
                        {/* acc means accumulator-used to accumulate the result-accumulator start before 
                        any callback function is applied to 1st item in cart */}
                        <p>
                        Total:
                        <span className="order-summary-values">
                            <FontAwesomeIcon icon={faIndianRupeeSign} size="xs"/>
                            {cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0).toFixed(2)}
                        </span>
                        </p>
                        <hr/>
                        {/* checkout button */}
                        <button id="checkout_btn"
                        className="btn btn-primary btn-block"
                        onClick={checkoutHandler}>Check Out</button>
                    </div>
                </div>
            </div> 
            </>
        )
    }
    </>
  )
}

export default Cart
