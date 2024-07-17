/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// // /* eslint-disable no-unused-vars */
// // /* eslint-disable react/prop-types */
// // import { createContext, useEffect, useState } from "react";
// // import axios from "axios";
// // // import { food_list } from "../assets/assets";

// // export const StoreContext = createContext(null);

// // const StoreContextProvider = (props) => {
// // 	const url = "http://localhost:4000";
// // 	const [cartItems, setCartItems] = useState({});
// // 	const [token, setToken] = useState(localStorage.getItem("token") || "");
// // 	const [food_list, setFoodList] = useState([]);

// // 	// useEffect(() => {
// // 	// 	async function loadFoodList() {
// // 	// 		await fetchFoodList();
// // 	// 		if (localStorage.getItem("token")) {
// // 	// 			console.log(localStorage.getItem("token"));
// // 	// 			setToken(localStorage.getItem("token"));
// // 	// 			loadCartData(token);
// // 	// 		}
// // 	// 	}
// // 	// 	loadFoodList();
// // 	// }, [token]);

// // 	useEffect(() => {
// // 		async function loadFoodList() {
// // 			await fetchFoodList();
// // 			if (token) {
// // 				loadCartData(token);
// // 			}
// // 		}
// // 		loadFoodList();
// // 	}, [token]);

// // 	const fetchFoodList = async () => {
// // 		let newUrl = url;
// // 		newUrl += "/api/food/list";
// // 		const res = await axios.get(newUrl);
// // 		setFoodList(res.data.data);
// // 	};

// // 	const loadCartData = async (token) => {
// // 		let newUrl = url;
// // 		newUrl += "/api/cart/get";
// // 		try {
// // 			const response = await axios.post(
// // 				newUrl,
// // 				{},
// // 				{ headers: { token } }
// // 			);
// // 			if (response.data.success) {
// // 				console.log("Cart data is wrosgfsfgsf");
// // 				console.log(response.data);
// // 				console.log(response.data.message);
// // 				// setCartItems(response.data.cartData);
// // 			} else {
// // 				console.log("else: ");
// // 				console.log(response.data);

// // 				console.log(response.data.message);
// // 			}
// // 		} catch (error) {
// // 			console.log("getting error");
// // 			console.log(error);
// // 		}
// // 	};

// // 	const addToCart = async (itemId) => {
// // 		if (!cartItems[itemId]) {
// // 			setCartItems((prev) => ({
// // 				...prev,
// // 				[itemId]: 1,
// // 			}));
// // 		} else {
// // 			setCartItems((prev) => ({
// // 				...prev,
// // 				[itemId]: prev[itemId] + 1,
// // 			}));
// // 		}
// // 		if (token) {
// // 			await axios.post(
// // 				url + "/api/cart/add",
// // 				{ itemId },
// // 				{ headers: { token } }
// // 			);
// // 		}
// // 	};

// // 	const removeFromCart = async (itemId) => {
// // 		setCartItems((prev) => ({
// // 			...prev,
// // 			[itemId]: prev[itemId] - 1,
// // 		}));
// // 		if (token) {
// // 			await axios.post(
// // 				url + "/api/cart/remove",
// // 				{ itemId },
// // 				{ headers: { token } }
// // 			);
// // 		}
// // 	};

// // 	const getTotalCartAmount = () => {
// // 		let totalAmount = 0;
// // 		for (const item in cartItems) {
// // 			if (cartItems[item] > 0) {
// // 				let itemInfo = food_list.find(
// // 					(product) => product._id === item
// // 				);
// // 				totalAmount += itemInfo.price * cartItems[itemInfo._id];
// // 			}
// // 		}
// // 		return totalAmount;
// // 	};

// // 	const contextValue = {
// // 		url,
// // 		token,
// // 		setToken,
// // 		food_list,
// // 		fetchFoodList,
// // 		cartItems,
// // 		setCartItems,
// // 		addToCart,
// // 		removeFromCart,
// // 		getTotalCartAmount,
// // 	};

// // 	return (
// // 		<StoreContext.Provider value={contextValue}>
// // 			{props.children}
// // 		</StoreContext.Provider>
// // 	);
// // };

// // export default StoreContextProvider;

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const url = "http://localhost:4000";
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [food_list, setFoodList] = useState([]);

//   useEffect(() => {
//     async function loadInitialData() {
//       await fetchFoodList();
//       if (token) {
//         await loadCartData(token);
//       }
//     }
//     loadInitialData();
//   }, [token]);

//   const fetchFoodList = async () => {
//     const newUrl = `${url}/api/food/list`;
//     const res = await axios.get(newUrl);
//     setFoodList(res.data.data);
//   };

//   const loadCartData = async (token) => {
//     const newUrl = `${url}/api/cart/get`;
//     try {
//       const response = await axios.post(newUrl, {}, { headers: { token } });
//       if (response.data.success) {
//         const cartData = response.data.cartData.reduce((acc, item) => {
//           acc[item.itemId] = item.quantity;
//           return acc;
//         }, {});
//         console.log("Cart data loaded:", cartData);  // Add logging
//         setCartItems(cartData);
//       } else {
//         console.log("Error loading cart data: ", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error loading cart data: ", error);
//     }
//   };

//   const addToCart = async (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1,
//     }));

//     if (token) {
//       await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] - 1,
//     }));

//     if (token) {
//       await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         const itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   };

//   const contextValue = {
//     url,
//     token,
//     setToken,
//     food_list,
//     fetchFoodList,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const url = "http://localhost:4000";
	const [cartItems, setCartItems] = useState({});
	const [token, setToken] = useState(localStorage.getItem("token") || "");
	const [food_list, setFoodList] = useState([]);
	const [promoCode, setPromoCode] = useState("");
	const [checkPromoCode, setCheckPromoCode] = useState(false);

	useEffect(() => {
		async function loadInitialData() {
			await fetchFoodList();
			if (token) {
				await loadCartData(token);
			}
		}
		loadInitialData();
	}, [token]);

	const fetchFoodList = async () => {
		const newUrl = `${url}/api/food/list`;
		const res = await axios.get(newUrl);
		setFoodList(res.data.data);
	};

	const loadCartData = async (token) => {
		const newUrl = `${url}/api/cart/get`;
		try {
			const response = await axios.post(
				newUrl,
				{},
				{ headers: { token } }
			);
			if (response.data.success) {
				console.log("Cart data loaded:", response.data.cartData); // Log the response
				setCartItems(response.data.cartData);
			} else {
				console.log("Error loading cart data: ", response.data.message);
			}
		} catch (error) {
			console.error("Error loading cart data: ", error);
		}
	};

	const addToCart = async (itemId) => {
		setCartItems((prev) => ({
			...prev,
			[itemId]: (prev[itemId] || 0) + 1,
		}));

		if (token) {
			await axios.post(
				`${url}/api/cart/add`,
				{ itemId },
				{ headers: { token } }
			);
		}
	};

	const removeFromCart = async (itemId) => {
		setCartItems((prev) => ({
			...prev,
			[itemId]: prev[itemId] - 1,
		}));

		if (token) {
			await axios.post(
				`${url}/api/cart/remove`,
				{ itemId },
				{ headers: { token } }
			);
		}
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				const itemInfo = food_list.find(
					(product) => product._id === item
				);
				totalAmount += itemInfo.price * cartItems[item];
			}
		}
		return totalAmount;
	};

	const contextValue = {
		url,
		token,
		setToken,
		food_list,
		fetchFoodList,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		promoCode,
		setPromoCode,
		checkPromoCode,
		setCheckPromoCode,
	};

	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
