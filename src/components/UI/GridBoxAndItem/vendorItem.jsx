import { useNavigate } from "react-router-dom";
import classes from "./VendorItem.module.scss";

const VendorItem = ({ vendor }) => {
  const navigate = useNavigate();

  return (
    <li className={classes["vendor-item"]}>
      <div className={classes["vendor-img"]}>
        <img src={vendor.vendor_avatar} alt={vendor.company_name} />
      </div>
      <h3 className={classes["vendor-name"]}>{vendor.company_name}</h3>
      <p className={classes["vendor-text"]}>
        <span>Email:</span> {vendor.email}
      </p>
      <p className={classes["vendor-text"]}>
        <span>Phone:</span> {vendor.phone}
      </p>
      <button
        onClick={() => {
          navigate(`${vendor.unique_id}`);
        }}
        className={classes.btn}
      >
        View Vendor
      </button>
    </li>
  );
};

export default VendorItem;
