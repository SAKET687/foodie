/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import SideBar from "./Components/SideBar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Order from "./Pages/Order/Order";

const App = () => {
	const url = "https://foodie-backend-yast.onrender.com";

	return (
		<>
			<ToastContainer />
			<Navbar />
			<hr />
			<div className="app-content">
				<SideBar />
				<Routes>
					<Route path="*" element={<List url={url} />} />
					<Route path="/" element={<List url={url} />} />
					<Route path="/add" element={<Add url={url} />} />
					<Route path="/list" element={<List url={url} />} />
					<Route path="/order" element={<Order url={url} />} />
				</Routes>
			</div>
		</>
	);
};

export default App;
