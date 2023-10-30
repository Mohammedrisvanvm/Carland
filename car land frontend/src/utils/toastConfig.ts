import { toast } from "react-toastify";

export const toastHelper = (service: string, message: string) => {
  if (service === "success") toast.success(message);
  if (service === "error") toast.error(message);
};
