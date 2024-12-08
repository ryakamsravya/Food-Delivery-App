import "./App.css";
import Header from "./components/Layout/Header";
import Home from "./components/Home";
import Footer from "./components/Layout/Footer";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (
    <Router>
  <div className="App"> 
   <Header/>
   <div className="container container-fluid">
    <Routes>
   <Route path="/" element={<Home/>} exact />
   {/* <Route path="/menu/restid/menu" element={<Menu/>}/> */}
   </Routes>
   </div>
    <Footer/>
    </div>
    </Router>
  );
}

export default App;
