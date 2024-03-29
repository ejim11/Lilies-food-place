import classes from "./GetNotifiedSection.module.scss";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import { useState } from "react";

const GetNotifiedSection = () => {
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const getEmailHandler = async (e) => {
    e.preventDefault();
    if (!inputValue.includes("@") && inputValue.length === 0) {
      setError(true);
      return;
    }
    console.log(inputValue);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/subscribe", {
        method: "POST",
        body: { form: inputValue },
        headers: {
          "content-type": "application/json",
        },
      });

      console.log(res);
    } catch (err) {
      console.log(err.message);
    }

    // reseting the value of the input
    setInputValue("");
  };

  const checkEmailHandler = (e) => {
    setInputValue(e.target.value);

    if (e.target.value.trim() === "") {
      setError(false);
    } else {
      setError(false);
    }
  };

  return (
    <Card className={classes["get-notified"]}>
      <h2>Get notified when we update!</h2>
      <div className={classes["get-notified-box"]}>
        <p>
          Get notified when we add new items to our specials menu, update our
          price list of have promos!
        </p>
        <div className={classes["form-container"]}>
          <form onSubmit={getEmailHandler}>
            <div
              className={`${classes["input-div"]} ${
                error ? classes["input-error"] : "input-clean"
              }`}
            >
              <input
                placeholder="gregphillips@gmail.com"
                type={"email"}
                onChange={checkEmailHandler}
                value={inputValue}
              />
              {error && <p>Fill in a valid email</p>}
            </div>
            <Button type={"submit"}>Get notified</Button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default GetNotifiedSection;
