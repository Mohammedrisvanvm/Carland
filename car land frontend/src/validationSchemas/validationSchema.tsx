import * as yup from "yup";
const password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/;
const email: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const SignupSchema = yup.object().shape({
  userName: yup
    .string()
    .trim()
    .min(3)
    .matches(/^[a-zA-Z0-9\s]+$/, "Name must not contain special characters")
    .required(),
  email: yup.string().email("enter a valid email").required(),
  password: yup
    .string()
    .trim()
    .min(6)
    .matches(password, { message: "please create strong password eg:Huaert5@" })
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password must match")
    .required(),
});
export const LoginSchema = yup.object().shape({
  userName: yup
    .string()
    .trim()
    .min(3)
    .matches(/^[a-zA-Z0-9\s]+$/, "Enter a Name")
    .required(),
  email: yup
    .string()
    .email("enter a valid email eg:risvan@gmail.com")
    .required(),
  password: yup
    .string()
    .trim()
    .min(6)
    .matches(password, {
      message: "please enter password Atleast 6 characters eg:Huat5@",
    })
    .required(),
});
export const AddCarSchema = yup.object().shape({
  vehicleName: yup
    .string()
    .trim()
    .min(3)
    .matches(/^[a-zA-Z0-9\s]+$/, "Name must not contain special characters")
    .required(),
  vehicleNumber: yup
    .string()
    .trim()
    .min(9)
    .matches(
      /^[A-Z\d]{3}\d{2}[A-Z\d]{3}$/,
      "Number must not contain special characters  eg:kl10a2020"
    )
    .required(),
  colour: yup
    .string()
    .trim()
    .min(3)
    .matches(/^[a-zA-Z0-9\s]+$/, "colour must not contain special characters")
    .required(),
  numofseats: yup
    .string()
    .trim()
    .matches(/^\d+$/, "seats must be number")
    .max(6, "vehicle seats must below 6 ")
    .required(),
  mileage: yup
    .string()
    .trim()
    .matches(/^\d+$/, "mileage must be number")
    .required(),
  fairPrice: yup
    .string()
    .trim()
    .matches(/^\d+$/, "fair price must be number")
    .required(),
  fairKm: yup
    .string()
    .trim()
    .matches(/^\d+$/, "fair km must be number")
    .required(),
  vehicleValidityDate: yup
    .string()
    .trim()
    .matches(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format (dd-mm-yyyy)")
    .required("Vehicle validity date is required"),
});
