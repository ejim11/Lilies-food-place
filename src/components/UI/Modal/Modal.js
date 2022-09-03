import classes from "./Modal.module.scss";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
  const navigate = useNavigate();

  const closeModalHandler = (e) => {
    if (e.target.dataset.mark) {
      navigate("/dashboard");
    } else {
      return;
    }
  };

  return (
    <div
      data-mark={"blank"}
      className={`${classes["modal-box"]} ${props.boxClassName}`}
      onClick={closeModalHandler}
    >
      <div className={`${classes["modal-child"]} ${props.childClassName}`}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
