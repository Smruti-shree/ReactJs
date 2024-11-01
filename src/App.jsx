
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import ContactUs from "./ContactUs";
import Home from "./Home";
import PurchaseHistory from "./PurchaseHistory";


import './App.css'
import VegItems from "./VegItems";
import NonvegItems from "./NonvegItems";
import { useSelector } from "react-redux";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLoginComponent from "./FacebookLoginComponent";
import { FacebookProvider } from "react-facebook";


function App()
{
  const cart =useSelector((state)=> state.cart);
  const totalItems = cart.reduce((sum,item) => sum + item.quantity,0);
  return(
    <>
    <FacebookProvider appId="1486357472053325">
    <FacebookLoginComponent/>
    </FacebookProvider>

    <GoogleOAuthProvider clientId="1054924899649-0oet9kkm8pp2son4j032mcpmj5c1v7p5.apps.googleusercontent.com">
    <GoogleLoginComponent/>
    </GoogleOAuthProvider>
    <Router>
      <nav>
      <Link to ='/home' className="nav-item" data-icon="🏠">Home</Link>
      <Link to ='/veg' className="nav-item" data-icon="🥬">Veg Items</Link>
      <Link to ='/nonveg' className="nav-item" data-icon="🍖">Non-veg Items</Link>
      <Link to ='/cart' className="nav-item" data-icon="🛒">Cart({totalItems})</Link>
      <Link to ='/purchaseHistory' className="nav-item" data-icon="📜">Purchase History</Link>
      <Link to ='/contactUs' className="nav-item" data-icon="📞">Contact Us</Link>
      <Link to ='/AboutUs' className="nav-item" data-icon="ℹ️">About Us</Link>
      </nav>



      <Routes>
        <Route path = '/home' element={<Home/>}/>
        <Route path = '/veg' element={<VegItems/>}/>
        <Route path = '/nonveg' element={<NonvegItems/>}/>
        <Route path = '/cart' element={<Cart/>}/>
        <Route path = '/purchaseHistory' element={<PurchaseHistory/>}/>
        <Route path = '/contactUs' element={<ContactUs/>}/>
        <Route path = '/AboutUs' element={<AboutUs/>}/>
      </Routes>

    </Router>

    </>
  )
}
export default App;