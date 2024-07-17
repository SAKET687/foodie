/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import StoreContextProvider from "./Context/StoreContext.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<StoreContextProvider>
			<App />
		</StoreContextProvider>
	</BrowserRouter>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<BrowserRouter>
// 		<App />
// 		{/* <Navbar/>
// 		<Routes>
// 			<Route path="/" element={<App />} />
// 			<Route path="*" element={<App />} />
// 			<Route path="/cart" element={<Cart />} />
// 			<Route path="/order-place" element={<PlaceOrder />} />
// 		</Routes> */}
// 	</BrowserRouter>
// );
