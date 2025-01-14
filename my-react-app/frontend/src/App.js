import "./App.css";
import Header from "./components/Layout/Header";
import Home from "./components/Home";
import Footer from "./components/Layout/Footer";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Menu from "./components/Menu";
import Cart from "./components/cart/Cart";
import Delivery from "./components/cart/Delivery";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import {useEffect,useState} from "react";
import {loadUser} from "./actions/userActions";
import store from "./store";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
//........................................payment................................................
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
function App() {
  const [stripeApiKey,setStripeApiKey]=useState("");
  useEffect(()=>{
    store.dispatch(loadUser());
    async function getStripeKey(){
      const {data}=await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeKey();
  },[]);
  return (
    <Router>
  <div className="App"> 
   <Header/>
   <div className="container container-fluid">
    <Routes>
   <Route path="/" element={<Home/>} exact />
   <Route path="/eats/stores/search/:keyword"
   element={<Home/>} exact/>
   <Route path="/eats/stores/:id/menus" element={<Menu/>} exact/>
   {/* <Route path="/menu/restid/menu" element={<Menu/>}/> */}
   <Route path="/cart" element={<Cart/>} exact/>
   <Route path="/delivery" element={<Delivery/>} exact/>
   {/* user login page */}
   <Route path="/users/login" element={<Login/>} exact/>
   <Route path="/users/signup" element={<Register/>} exact/>
   <Route path="/users/me" element={<Profile/>} exact/>
   <Route path="/users/me/update" element={<UpdateProfile/>} exact/>
   <Route path="/users/forgetPassword" element={<ForgotPassword/>} exact/>
   <Route path="/users/resetPassword/:token" element={<NewPassword/>} exact/>
   <Route path="/confirm" element={<ConfirmOrder/>} exact/>
   {
    stripeApiKey &&(
      <Route path="/payment"
      element={
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment/>
        </Elements>
      }
      />
    )
   }
   {/* order success */}
   <Route path="/success" element={<OrderSuccess/>} exact/>
   {/* orderList */}
   <Route path="/eats/orders/me/myOrders" element={<ListOrders/>} exact/>
   <Route path="/eats/orders/:id" element={<OrderDetails/>} exact/>
   </Routes>
   </div>
    <Footer/>
    </div>
    </Router>
  );
}

export default App;
