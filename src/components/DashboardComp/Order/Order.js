import Modal from "../../UI/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Order.module.scss";
import emptyCartImg from "../../../assets/empty-cart.svg";
import Table from "../../UI/Table/Table";
import modifyNum from "../../Helper fns/modifyAmount";
import { cartActions } from "../../store/cartSlice";
import Button from "../../UI/Button/Button";

const Order = () => {
  const orderState = useSelector((state) => state.cart.order);
  const dispatchFn = useDispatch();
  const headings = ["Item", "Qty", "Price", "Status"];
  const cartItems = orderState.map((item, i) => (
    <tr key={i} className={classes["order-box"]}>
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
                cartActions.removeOrderMealItem({
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
      <td className={classes.cooking}>{item.status}</td>
    </tr>
  ));

  return (
    <Modal childClassName={classes["order"]}>
      {orderState.length > 0 && <p className={classes.heading}>Your order</p>}
      {orderState.length === 0 && (
        <div>
          <p className={classes["empty-order"]}>Your don't have any orders</p>
          <div>
            <img src={emptyCartImg} alt="empty-order-img" />
          </div>
        </div>
      )}
      {orderState.length > 0 && <Table headings={headings}>{cartItems}</Table>}
    </Modal>
  );
};

export default Order;
