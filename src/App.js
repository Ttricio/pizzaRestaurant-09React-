import styles from "./styles/App.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PizzaList from "./components/PizzaList";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Modal from "./components/Modal";
import { calculateTotals } from "./Redux/cartSlice";

const Layout = () => {
	const cart = useSelector((store) => store.cart);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(calculateTotals());
	}, [cart, dispatch]);

	const { isOpen } = useSelector((store) => store.modal);
	return (
		<>
			{isOpen ? <Modal /> : null}
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <PizzaList />,
			},
			{
				path: "/product/:id",
				element: <ProductPage />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/orders/21",
				element: <Orders />,
			},
		],
	},
]);

function App() {
	return (
		<div className={styles.container}>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
