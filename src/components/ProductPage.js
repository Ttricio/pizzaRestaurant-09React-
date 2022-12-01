import styles from "../styles/ProductPage.module.scss";

import { useState } from "react";
import pizzas from "../data/Pizzas";
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/cartSlice";
import { useParams } from "react-router-dom";

const Product = () => {
	const params = useParams();
	console.log(params);
	const idOfPizza = parseFloat(params["id"]);
	console.log(idOfPizza);

	const currentPizza = pizzas.find(
		(singlePizza) => singlePizza.id === idOfPizza
	);
	const [price, setPrice] = useState(currentPizza.prices[0]);
	const [size, setSize] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const [extras, setExtras] = useState([]);
	const dispatch = useDispatch();

	const changePrice = (number) => {
		setPrice(price + number);
	};

	const handleSize = (sizeIndex) => {
		const difference =
			currentPizza.prices[sizeIndex] - currentPizza.prices[size];
		setSize(sizeIndex);
		changePrice(difference);
	};

	const handleChange = (e, option) => {
		const checked = e.target.checked;

		if (checked) {
			changePrice(option.price);
			setExtras((prev) => [...prev, option]);
		} else {
			changePrice(-option.price);
			setExtras(extras.filter((extra, index) => extra.index !== option.index));
		}
	};

	const addToCartHandler = () => {
		dispatch(addProduct({ ...currentPizza, extras, price, quantity,  }));
	};

	// const pizza = {
	// 	id: 1,
	// 	img: "/img/pizza.png",
	// 	name: "CAMPAGNOLA",
	// 	price: [19.9, 23.9, 27.9],
	// 	desc: "Pizza with tomato sauce and mashrooms",
	// };
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.imgContainer}>
					<img
						src={currentPizza.img}
						alt='pizza'
						layout='fill'
						objectFit='contain'
					/>
				</div>
			</div>
			<div className={styles.right}>
				<h1 className={styles.title}>{currentPizza.title}</h1>

				<span className={styles.price}>${price}</span>
				<p className={styles.desc}>{currentPizza.desc}</p>
				<h3 className={styles.choose}>Choose a size</h3>
				<div className={styles.sizes}>
					<div className={styles.size} onClick={() => handleSize(0)}>
						<img src='/img/size.png' alt='pizza icon choose a size' />
						<span className={styles.number}>Small</span>
					</div>
					<div className={styles.size} onClick={() => handleSize(1)}>
						<img src='/img/size.png' alt='pizza icon choose a size' />
						<span className={styles.number}>Medium</span>
					</div>
					<div className={styles.size} onClick={() => handleSize(2)}>
						<img src='/img/size.png' alt='pizza icon choose a size' />
						<span className={styles.number}>Large</span>
					</div>
				</div>
				<h3 className={styles.choose}>Choose additional ingredients</h3>
				<div className={styles.ingredients}>
					{currentPizza.extraOptions.map((option) => (
						<div className={styles.option} key={option.index}>
							<input
								type='checkbox'
								id={option.text}
								name={option.text}
								className={styles.checkbox}
								onChange={(e) => handleChange(e, option)}
							/>
							<label htmlFor={option.text}>{option.text}</label>
						</div>
					))}
				</div>
				<div className={styles.add}>
					<input
						type='number'
						defaultValue={1}
						className={styles.quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<button className={styles.button} onClick={addToCartHandler}>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;
