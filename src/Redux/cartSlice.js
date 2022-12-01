import { createSlice } from "@reduxjs/toolkit";

// I create a initialState as a separate object to clear a code

const initialState = {
	cartItems: [], // empty array coz user doen't have any itam in a cart
	amount: 0,
	total: 0,
};

const cartSlice = createSlice({
	name: "cart",

	// I can leave inital state here or I can create a const to clear code. Declaration above. Both ways are ok.
	// initialState: {
	// 	products: [],
	// 	quantity: 0,
	// 	total: 0,
	// },
	initialState,

	// reducers modifies our state we export it and to our store.js

	reducers: {
		addProduct: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			);
			if (itemIndex >= 0) {
				state.cartItems[itemIndex].quantity += 1;
			} else {
				const tempProduct = { ...action.payload };
				state.cartItems.push(tempProduct);
				state.amount += 1;
				state.total = action.payload.price * action.payload.quantity;
			}
		},
		// removeProduct: (state, action) => {
		// 	const nextCartItems = state.cartItems.filter(
		// 		(product) => product.id !== action.payload.id
		// 	);
		// 	state.cartItems = nextCartItems;
		// },

		removeProduct: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== action.payload
			);
			state.amount -= 1;
		},
		increase: (state, action) => {
			const cartItem = state.cartItems.find(
				(item) => item.id === action.payload
			);
			cartItem.quantity++;
		},
		decrease: (state, action) => {
			const cartItem = state.cartItems.find(
				(item) => item.id === action.payload
			);
			cartItem.quantity--;
		},
		

		// thanks to immer library I can modify a state directly without previous state. Clear code. Just desired state.
		clearCart: (state) => {
			// I can use return { cartItems: []} but then I update all object states in initialState object in this case it would be totally ok and would make code leaner

			state.cartItems = [];
			state.amount = 0;
			state.total = 0;
		},
		calculateTotals: (state, action) => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach((item) => {
				amount += item.quantity;
				total += item.quantity * item.price;
			});
			state.amount = amount;
			state.total = total;
		},
	},
});
console.log(`=============`);
console.log(cartSlice);

export const {
	addProduct,
	clearCart,
	removeProduct,
	increase,
	decrease,
	calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
