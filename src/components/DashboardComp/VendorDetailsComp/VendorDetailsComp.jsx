import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { client } from "../../../axiosconfig";
import GridBox from "../../UI/GridBoxAndItem/GridBox";
import MealItem from "../../UI/GridBoxAndItem/MealItem";
import classes from "./VendorDetailsComp.module.scss";

const VendorDetailsComp = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [vendorMeals, setVendorMeals] = useState([]);

  const vendorsList = useSelector((state) => state.vendorsList.list);

  const token = useSelector((state) => state.auth.token);

  const [vendor] = vendorsList.filter(
    (vendor) => vendor.unique_id === params.vendorId
  );

  console.log(vendor);

  const getVendorMeals = useCallback(async () => {
    const res = await client.get(`api/vendor_meal/${params.vendorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    setVendorMeals(res.data);
  }, [params, token]);

  useEffect(() => {
    getVendorMeals();
  }, [getVendorMeals]);

  return (
    <div className={classes["container"]}>
      <button
        className={classes.btn}
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <div className={classes["details"]}>
        <img src={vendor.vendor_avatar} alt={vendor.company_name} />
        <div className={classes["vendor-details"]}>
          <h2>{vendor.company_name}</h2>
          <p>{vendor.address}</p>
          <p>{vendor.email}</p>
          <p>{vendor.phone}</p>
        </div>
      </div>
      <div className={classes["vendor-meal-list"]}>
        {vendorMeals.map((meal, i) => (
          <MealItem key={i} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default VendorDetailsComp;
