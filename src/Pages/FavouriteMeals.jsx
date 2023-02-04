import { client } from "../axiosconfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import img from "../assets/meal-bread-fruit.jpg";

async function blobFromUrl(url, name = "File Name") {
  const res = await fetch(url);
  const blob = await res.blob();
  console.log(blob);
  const file = new File([blob], name, { type: blob.type });
  return file;
}

const FavouriteMeals = () => {
  const token = useSelector((state) => state.auth.token);

  const [pic, setPic] = useState();

  const addMeal = async (e) => {
    e.preventDefault();
    console.log(pic.file);

    let formdata = new FormData();

    formdata.append("meal_name", "Sandwich");
    formdata.append(
      "meal_details",
      "Bread, mayonese and tomatoes giving a delicious breakfast"
    );
    formdata.append("meal_price", "450");
    formdata.append("meal_avatar", pic.file);
    formdata.append("quantity", "10");
    try {
      const res = await client.post(
        `api/meals`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
        {
          xsrfHeaderName: "X-XSRF-Token",
        }
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // const getFavouriteMeals = async () => {
  //   try {
  //     const res = await client.post(
  //       `api/favMeal/MEAL6018`,
  //       formdata,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "content-type": "application/json",
  //         },
  //       },
  //       {
  //         xsrfHeaderName: "X-XSRF-Token",
  //       }
  //     );

  //     // USER295805;

  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getMeals = async () => {
    try {
      const res = await client.get("api/fetch_fav_meal", {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(e) {
    console.log(e.target.files);
    const url = URL.createObjectURL(e.target.files[0]);
    setPic({ file: e.target.files[0], url: url });
    console.log(url);
  }

  return (
    <>
      {/* <div onClick={getFavouriteMeals}>Favourite Meals</div> */}
      <p onClick={getMeals}>get meals</p>
      <form onSubmit={addMeal}>
        <input
          type="file"
          onChange={handleChange}
          id={"profile-img"}
          accept="image/*"
        />
        <button type="submit">post meal</button>
      </form>
    </>
  );
};
export default FavouriteMeals;
