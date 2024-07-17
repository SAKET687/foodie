/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");
	const { url } = useContext(StoreContext);
	const navigate = useNavigate();

	console.log(success, orderId);

	const verifyPayment = async () => {
		let newUrl = url;
		newUrl += "/api/order/verify";
		const response = await axios.post(newUrl, { success, orderId });
		if (response.data.success) {
			navigate("/orders");
		} else {
			navigate("/home");
		}
	};

	// http://localhost:5174/verify?success=true&orderId=669684f277608aaba1bcc379

	useEffect(() => {
		verifyPayment();
	});

	return (
		<>
			<div className="verify">
				<div className="spinner"></div>
				verifying your payment
			</div>
		</>
	);
};

export default Verify;
