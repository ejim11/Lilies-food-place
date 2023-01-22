import { useNavigate } from "react-router-dom";
import classes from "./VendorItem.module.scss";

const VendorItem = ({ vendor }) => {
  const navigate = useNavigate();

  return (
    <li className={classes["vendor-item"]}>
      <img src={vendor.vendor_avatar} alt={vendor.company_name} />
      <p>vendor name: {vendor.company_name}</p>
      <p>email: {vendor.email}</p>
      <p>phone: {vendor.phone}</p>
      <button
        onClick={() => {
          navigate(`${vendor.unique_id}`);
        }}
      >
        View Vendor
      </button>
    </li>
  );
};

export default VendorItem;
