import Modal from "../../UI/Modal/Modal";
import classes from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button/Button";
import modifyNum from "../../Helper fns/modifyAmount";
import { cartActions } from "../../store/cartSlice";
import emptyCartImg from "../../../assets/empty-cart.svg";

const Cart = () => {
  const cartState = useSelector((state) => state.cart.cart);
  const dispatchFn = useDispatch();

  const cartItems = cartState.map((item, i) => (
    <tr key={i} className={classes["cart-box"]}>
      <td className={classes["title-box"]}>
        <div className={classes["title-box-img"]}>
          <img src={item.src} alt={item.title} />
        </div>
        <div>
          <p>{item.title}</p>
          <Button
            type={"type"}
            onClick={() => {
              dispatchFn(
                cartActions.removeMealItem({
                  id: item.id,
                  quantity: item.quantity,
                })
              );
            }}
            className={classes["remove-btn"]}
          >
            Remove
          </Button>
        </div>
      </td>
      <td> {item.quantity}</td>
      <td>N{modifyNum(String(item.price))}</td>
      <td>N{modifyNum(String(item.totalPrice))}</td>
    </tr>
  ));

  const totalPrice = cartState
    .map((item) => item.totalPrice)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <Modal childClassName={classes["cart"]}>
      {cartState.length > 0 && <p className={classes.heading}>Your cart</p>}
      {cartState.length === 0 && (
        <p className={classes["empty-cart"]}>Your cart is empty</p>
      )}
      {cartState.length === 0 && (
        <div>
          <img src={emptyCartImg} alt="empty-cart-img" />
        </div>
      )}
      {cartState.length > 0 && (
        <div className={classes["table-box"]}>
          <table>
            <thead>
              <tr>
                <th className={classes["first"]}>Item</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>{cartItems}</tbody>
          </table>
        </div>
      )}
      {cartState.length > 0 && (
        <div className={classes.total}>
          Total: <span>N{modifyNum(String(totalPrice))}</span>
        </div>
      )}
      {cartState.length > 0 && (
        <Button type={"type"} className={classes["checkout-btn"]}>
          Checkout
        </Button>
      )}
    </Modal>
  );
};

export default Cart;
