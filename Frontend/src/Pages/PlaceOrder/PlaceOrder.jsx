/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
	const {
		getTotalCartAmount,
		checkPromoCode,
		token,
		food_list,
		url,
		cartItems,
	} = useContext(StoreContext);

	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		houseNo: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		phone: "",
	});

	const onChangeHandler = (event) => {
		const name = event.target.id;
		const value = event.target.value;
		setData((data) => ({ ...data, [name]: value }));
		// console.log(data);
	};

	// useEffect(
	// 	(event) => {
	// 		console.log(data);
	// 	},
	// 	[data]
	// );

	const placeOrder = async (event) => {
		event.preventDefault();
		let orderItems = [];
		food_list.map((key) => {
			if (cartItems[key._id] > 0) {
				let iteminfo = key;
				iteminfo["quantity"] = cartItems[key._id];
				orderItems.push(iteminfo);
			}
		});
		console.log(orderItems);
		let orderData = {
			address: data,
			items: orderItems,
			amount: getTotalCartAmount() + 2,
		};

		try {
			let response = await axios.post(
				url + "/api/order/place",
				orderData,
				{
					headers: { token },
				}
			);
			if (response.data.success) {
				const { session_url } = response.data;
				window.location.replace(session_url);
			} else {
				console.log(response.data.success);
				console.log(response.data);
				console.log("Error in payment/placing order, try again.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form onSubmit={placeOrder} className="place-order">
				<div className="place-order-left">
					<p className="title">Delivery Information</p>
					<div className="multi-fields">
						<input
							value={data.firstName}
							onChange={onChangeHandler}
							required
							type="text"
							id="firstName"
							placeholder="Enter Your First Name"
						/>
						<input
							value={data.lastName}
							onChange={onChangeHandler}
							type="text"
							id="lastName"
							placeholder="Enter Your Last Name (Optional)"
						/>
					</div>
					<input
						value={data.email}
						onChange={onChangeHandler}
						required
						type="email"
						id="email"
						placeholder="Enter Your Email Id"
					/>
					<input
						value={data.houseNo}
						onChange={onChangeHandler}
						required
						type="text"
						id="houseNo"
						placeholder="Enter House No. / Street"
					/>
					<div className="multi-fields">
						<input
							value={data.city}
							onChange={onChangeHandler}
							required
							type="text"
							id="city"
							placeholder="Enter City"
						/>
						<input
							value={data.state}
							onChange={onChangeHandler}
							required
							type="text"
							id="state"
							placeholder="Enter State"
						/>
					</div>
					<div className="multi-fields">
						<input
							value={data.zipCode}
							onChange={onChangeHandler}
							required
							type="text"
							id="zipCode"
							placeholder="Enter ZIP Code"
						/>
						<input
							value={data.country}
							onChange={onChangeHandler}
							required
							type="text"
							id="country"
							placeholder="Enter Country"
						/>
					</div>
					<input
						value={data.number}
						onChange={onChangeHandler}
						type="number"
						id="phone"
						placeholder="Enter Your Phone Number"
					/>
				</div>
				<div className="place-order-right">
					<div className="cart-total">
						<h2>Cart Total:</h2>
						<div className="unnammed">
							<div className="cart-total-details">
								<p>Subtotal</p>
								<p>${getTotalCartAmount()}</p>
							</div>{" "}
							<hr />
							<div className="cart-total-details">
								<p>Delivery Fee</p>
								<p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
							</div>{" "}
							<hr />
							{checkPromoCode === true ? (
								<>
									<div className="cart-total-details coupon">
										<p>Coupon Saving</p>
										<p> - ${5}</p>
									</div>
									<hr />
								</>
							) : (
								<></>
							)}
							<div className="cart-total-details">
								<b>Total</b>
								<b>
									$
									{getTotalCartAmount() === 0
										? 0
										: checkPromoCode === true
										? getTotalCartAmount() - 3
										: getTotalCartAmount() + 2}
								</b>
							</div>
						</div>
						<div className="button-right">
							<button type="submit">Proceed to Payment</button>{" "}
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default PlaceOrder;
