import styles from "../styles/Navbar.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";

const Navbar = () => {
	// I use a store name for an argument coz this points that i get a state from store.js
	const { amount } = useSelector((store) => store.cart);

	// this below is also correct I can get access to whole stet object from store.js. Above I use  object destructuring ang get amount, then pass this amount as a constant to div with className counter.

	// const amount = useSelector((state)=> state.cart.amount)
	// in this case I have to pass quantity constant

	return (
		<div className={styles.container}>
			<div className={styles.phone}>
				<div className={styles.callButton}>
					<img src='/img/telephone.png' alt='' />
				</div>
				<div className={styles.texts}>
					<div className={styles.text}>ORDER NOW!</div>
					<div className={styles.text}>012 345 678</div>
				</div>
			</div>
			<div className={styles.item}>
				<ul className={styles.list}>
					<NavLink to='/'>
						<li className={styles.listItem}>Home</li>
					</NavLink>

					<NavLink to=''>
						<li className={styles.listItem}>Menu</li>
					</NavLink>
					<NavLink to='/'>
						<img src='/img/logo_center.png' alt='' width={97} height={81} />
					</NavLink>

					<li className={styles.listItem}>Events</li>

					
						<li className={styles.listItem}>Contact</li>
					
				</ul>
				<NavLink to='/cart'>
					<div className={styles.cart}>
						<img src='/img/cart.png' alt='' width={30} height={30} />
						<div className={styles.counter}>{amount}</div>
					</div>
				</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
