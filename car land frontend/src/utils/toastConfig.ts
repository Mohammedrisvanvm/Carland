import { toast } from "react-toastify";

export const toastHelper = (service: string, message: string) => {


  if (service === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
