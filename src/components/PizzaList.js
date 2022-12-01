import styles from "../styles/PizzaList.module.scss";
import PizzaCard from "./PizzaCard";
import pizzas from "../data/Pizzas";

const PizzaList = (props) => {
	return (
		<div className={styles.container} id='menu'>
			<h1 className={styles.title}>We make authentic Neapolitan Pizza Style</h1>
			<p className={styles.desc}>
				Our pizza is wood fire baked according to Neapolitan tradition. You can
				choose one of the classic types of italian pizza.
			</p>
			<div className={styles.wrapper}>
				{pizzas.map((pizza) => (
					<PizzaCard pizza={pizza} key={pizza.id} />
				))}
			</div>
		</div>
	);
};

export default PizzaList;
