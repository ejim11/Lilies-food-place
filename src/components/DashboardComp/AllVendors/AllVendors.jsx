import { client } from "../../../axiosconfig";
import { useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { vendorsListActions } from "../../../store/vendorsListSlice";
import GridBox from "../../UI/GridBoxAndItem/GridBox";
import VendorItem from "../../UI/GridBoxAndItem/vendorItem";

const AllVendors = () => {
  const token = useSelector((state) => state.auth.token);
  const vendorsList = useSelector((state) => state.vendorsList.list);

  const dispatchFn = useDispatch();

  const getAllVendors = useCallback(async () => {
    // getting lists of all vendors
    const res = await client.get("api/vendors", {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });

    dispatchFn(vendorsListActions.setVendorsList(res.data));
  }, [token, dispatchFn]);

  useEffect(() => {
    getAllVendors();
  }, [getAllVendors]);

  return (
    <GridBox>
      {vendorsList.map((vendor, i) => (
        <VendorItem key={i} vendor={vendor} />
      ))}
    </GridBox>
  );
};

export default AllVendors;
