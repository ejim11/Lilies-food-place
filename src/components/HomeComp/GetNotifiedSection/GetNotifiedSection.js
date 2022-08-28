import classes from "./GetNotifiedSection.module.scss";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";

const GetNotifiedSection = () => {
  const getEmailHandler = (e) => {
    e.preventDefault();
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
            <input placeholder="gregphillips@gmail.com" type={"email"} />
            <Button type={"submit"}>Get notified</Button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default GetNotifiedSection;
