import UserForm from "../UserForm/UserForm";
import VendorForm from "../VendorForm/VendorForm";

const SignUpForm = (props) => {
  return <>{props.vendorState ? <UserForm /> : <VendorForm />}</>;
};

export default SignUpForm;
