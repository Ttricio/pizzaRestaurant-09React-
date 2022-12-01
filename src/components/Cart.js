import styles from "../styles/Cart.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, increase, decrease } from "../Redux/cartSlice";
import { openModal } from "../Redux/modalSlice";
import { ArrowUp, ArrowDown } from "./helpers/CartIcons";

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const modalHandler = () => {
		dispatch(openModal());
	};
	return (
		<div className={styles.container}>
			{cart.amount > 0 ? (
				<div className={styles.left}>
					<table className={styles.table}>
						<tbody>
							<tr className={styles.trTitle}>
								<th>Product</th>
								<th>Name</th>
								<th>Extras</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
								<th>Remove</th>
							</tr>
							{cart.cartItems.map((product) => (
								<tr className={styles.tr} key={product.id} {...product}>
									<td>
										<div className={styles.imgContainer}>
											<img
												src={product.img}
												layout='fill'
												objectFit='cover'
												alt=''
											/>
										</div>
									</td>
									<td>
										<span className={styles.name}>{product.title}</span>
									</td>
									<td>
										<span className={styles.extras}>
											{product.extras.map((extra) => (
												<span key={extra}> {extra.text},</span>
											))}
										</span>
									</td>
									<td>
										<span className={styles.price}>${product.price}</span>
									</td>
									<td>
										<div className={styles.price__container}>
											<span className={styles.quantity}>
												{product.quantity}
											</span>
											<div className={styles.arrows}>
												<button onClick={() => dispatch(increase(product.id))}>
													<ArrowUp />
												</button>
												<button
													onClick={() => {
														if (product.quantity === 1) {
															return;
														}
														dispatch(decrease(product.id));
													}}>
													<ArrowDown />
												</button>
											</div>
										</div>
									</td>
									<td>
										<span className={styles.total}>
											${product.price * product.quantity}
										</span>
									</td>
									<td>
										<button
											className={styles.removeBtn}
											onClick={() => dispatch(removeProduct(product.id))}>
											Remove
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className={styles.clearAll}>
						<button className={styles.removeBtn} onClick={modalHandler}>
							Clear Cart
						</button>
					</div>
				</div>
			) : (
				<section className={styles.left}>
					{" "}
					<span className={styles.empty}>Your cart is empty!</span>
				</section>
			)}
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>CART TOTAL</h2>

					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Total:</b>${cart.total}
					</div>
					<NavLink to='/orders/21'>
						<button className={styles.button}>CHECKOUT NOW!</button>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Cart;
