import Modal from "../../UI/Modal/Modal";
import classes from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button/Button";
import modifyNum from "../../Helper fns/modifyAmount";
import { cartActions } from "../../store/cartSlice";
import emptyCartImg from "../../../assets/empty-cart.svg";
import { useNavigate } from "react-router-dom";
import Table from "../../UI/Table/Table";

const Cart = () => {
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart.cart);
  const dispatchFn = useDispatch();

  const headings = ["Item", "Qty", "Unit Price", "Sub-total"];

  const cartItems = cartState.map((item, i) => (
    <tr key={i} className={classes["cart-box"]}>
      <td className={classes["title-box"]}>
        <div className={classes["title-box-img"]}>
          <img src={item.src} alt={item.title} />
        </div>
        <div className={classes["title-text"]}>
          <p>{item.title}</p>
          <Button
            type={"type"}
            onClick={() => {
              dispatchFn(
                cartActions.removeMealItem({
                  title: item.title,
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
        <div className={classes["empty-cart"]}>
          <p className={classes["empty-cart-p"]}>Your cart is empty</p>
          <div className={classes["empty-cart-img"]}>
            <img src={emptyCartImg} alt="empty-cart-img" />
          </div>
        </div>
      )}

      {cartState.length > 0 && <Table headings={headings}>{cartItems}</Table>}
      {cartState.length > 0 && (
        <div className={classes.total}>
          Total: <span>N{modifyNum(String(totalPrice))}</span>
        </div>
      )}
      {cartState.length > 0 && (
        <Button
          type={"type"}
          className={classes["checkout-btn"]}
          onClick={() => {
            navigate("/dashboard/checkout");
          }}
        >
          Checkout
        </Button>
      )}
    </Modal>
  );
};

export default Cart;
