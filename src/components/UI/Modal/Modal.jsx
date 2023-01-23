import classes from "./Modal.module.scss";
import Button from "../Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";

const Modal = (props) => {
  const dispatchFn = useDispatch();

  const closeModalHandler = (e) => {
    if (e.target.dataset.close) {
      dispatchFn(cartActions.changeCartLink(""));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={"modal"}
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 500, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        data-close={"close"}
        className={`${classes["modal-box"]} ${props.boxClassName}`}
        onClick={closeModalHandler}
      >
        <div className={`${classes["modal-child"]} ${props.childClassName}`}>
          <Button
            type="button"
            className={classes["back-btn"]}
            onClick={() => {
              dispatchFn(cartActions.changeCartLink(""));
            }}
          >
            Back
          </Button>
          {props.children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
