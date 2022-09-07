import classes from "./Modal.module.scss";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { motion, AnimatePresence } from "framer-motion";

const Modal = (props) => {
  const navigate = useNavigate();

  const closeModalHandler = (e) => {
    if (e.target.dataset.mark) {
      navigate("/dashboard");
    } else {
      return;
    }
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      <motion.div
        key={"modal"}
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 500, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        data-mark={"blank"}
        className={`${classes["modal-box"]} ${props.boxClassName}`}
        onClick={closeModalHandler}
      >
        <div className={`${classes["modal-child"]} ${props.childClassName}`}>
          <Button
            type="button"
            className={classes["back-btn"]}
            onClick={goBackHandler}
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
