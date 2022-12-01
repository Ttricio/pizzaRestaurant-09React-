import React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../Redux/cartSlice";
import { closeModal } from "../Redux/modalSlice";
import styles from "../styles/Modal.module.scss";

const Modal = () => {
	const dispatch = useDispatch();
	const confirmHandler = () => {
		dispatch(clearCart());
		dispatch(closeModal());
	};
    const cancelHandler =()=>{
        dispatch(closeModal())

    }
	return (
		<aside className={styles.container}>
			<div className={styles.modal}>
				<h4>
					Are you sure yo want to remove all items from your shopping cart?
				</h4>
				<div className={styles.btn__container}>
					<button
						type='button'
						className={styles.confirm__btn}
						onClick={confirmHandler}>
						Confirm
					</button>
					<button type='button' className={styles.clear__btn}
                    onClick={cancelHandler}>
						Cancel
					</button>
				</div>
			</div>
		</aside>
	);
};
export default Modal;
