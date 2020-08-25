import { toast } from "react-toastify";

export default function alertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      toast.warning("The entered password is not correct.");
      break;
    case "auth/email-already-in-use":
      toast.warning("email is already in use.");
      break;
    default:
      toast.warning("Server error, try again later.");
      break;
  }
}
