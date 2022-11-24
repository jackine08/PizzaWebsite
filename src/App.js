import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Menu from "./components/pages/Menu";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Cart from "./components/pages/Cart";
import OrderManage from "./components/pages/manage/OrderManage";
import IngredientManage from "./components/pages/manage/IngredientManage";
import DeliveryManage from "./components/pages/manage/DeliveryManage";
import ServerTest_O from "./components/pages/server_test/Test_Order";
import ServerTest_S from "./components/pages/server_test/Test_Stock";
import Pay from "./components/pages/Pay";
import OrderList from "./components/pages/OrderList";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/OrderManage" element={<OrderManage />} />
          <Route path="/IngredientManage" element={<IngredientManage />} />
          <Route path="/DeliveryManage" element={<DeliveryManage />} />
          <Route path="/Pay" element={<Pay />} />
          <Route path="/OrderList" element={<OrderList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
