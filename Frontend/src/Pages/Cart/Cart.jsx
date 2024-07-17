/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import "./Cart.css";
import { assets } from "../../../src/assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
	const {
		url,
		cartItems,
		food_list,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		promoCode,
		setPromoCode,
		checkPromoCode,
		setCheckPromoCode,
	} = useContext(StoreContext);
	const navigate = useNavigate();

	const promoCodeFunction = () => {
		if (promoCode === "GreatStack") {
			setCheckPromoCode(true);
		} else {
			setCheckPromoCode(false);
		}
	};

	return (
		<>
			{getTotalCartAmount() === 0 ? (
				<div className="no-item">
					🛒 Your Cart is Empty. 🍔 Add some delicious food and come
					again. 🍕
				</div>
			) : (
				<div className="cart">
					<div className="cart-items">
						<div className="cart-items-title">
							<p>Items</p>
							<p>Title</p>
							<p>Price</p>
							<p>Quantity</p>
							<p>Total</p>
							<p>Modify</p>
						</div>
						<br />
						<hr />
						{food_list.map((item, index) => {
							if (cartItems[item._id] > 0) {
								return (
									<>
										<div className="cart-items-title cart-items-item">
											<img
												src={
													url +
													"/images/" +
													item.image
												}
												alt="img icon illustration"
												className="item-image-prop"
											/>
											<p>{item.name}</p>
											<p>${item.price}</p>
											<p>{cartItems[item._id]}</p>
											<p>
												$
												{item.price *
													cartItems[item._id]}
											</p>
											<p className="cross">
												<div className="modify">
													<img
														onClick={() => {
															addToCart(item._id);
															promoCodeFunction();
														}}
														src={
															assets.add_icon_green
														}
														alt="add"
													/>
													{"   "}
													{"   "}
													<img
														onClick={() => {
															removeFromCart(
																item._id
															);
															promoCodeFunction();
														}}
														src={
															assets.remove_icon_red
														}
														alt="remove"
													/>
												</div>{" "}
											</p>
										</div>
										<hr />
									</>
								);
							}
						})}
					</div>
					<div className="cart-bottom">
						<div className="cart-promo-code">
							<div className="unnamed-2">
								<p>Have a promo code? Enter it here👇 </p>
								<div className="cart-promo-code-input">
									<input
										onChange={(e) => {
											setPromoCode(e.target.value);
										}}
										type="text"
										value={promoCode}
										id="promo-code"
										placeholder="Enter your promo code"
									/>
									<button onClick={promoCodeFunction}>
										Submit
									</button>
								</div>
							</div>
						</div>
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
									<p>${2}</p>
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
										{checkPromoCode === true
											? getTotalCartAmount() - 3
											: getTotalCartAmount() + 2}
									</b>
								</div>
							</div>
							<div className="button-right">
								<button
									onClick={() => {
										navigate("/order-place");
									}}
								>
									Proceed to Checkout
								</button>{" "}
							</div>
						</div>
						{/* <div className="cart-promo-code">
							<div className="unnamed-2">
								<p>Have a promo code? Enter it here👇 </p>
								<div className="cart-promo-code-input">
									<input
										onChange={(e)=>{setPromoCode(e.target.value)}}
										type="text"
										value={promoCode}
										id="promo-code"
										placeholder="Enter your promo code"
									/>
									<button onClick={promoCodeFunction}>
										Submit
									</button>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			)}
		</>
	);
};

export default Cart;
