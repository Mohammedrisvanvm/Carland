import * as yup from "yup";

const password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/;
const email: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phone: RegExp = /^[0-9]{10}$|^[0][0-9]{10}$/;

export const AdminAuthSchema = yup.object().shape({
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
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
export const AddCarSchema = yup.object().shape({
  vehicleName: yup
    .string()
    .trim()
    .min(3)
    .matches(/^[a-zA-Z0-9\s]+$/, "Name must not contain special characters")
    .required(),
    year: yup.number()
    .min(2005,'year must be at least 2005')
    .max(currentYear,'year must not be at morethan this year')
    .required(),
  vehicleNumber: yup
    .string()
    .min(3)
    .trim()
    .min(7)
    // .matches(
    //   /^[A-Za-z]{2}\s[0-9]{2}/,
    //   "number is not valid eg:KL10N2020"
    // )
    .required(),
  colour: yup
    .string()
    .trim()
    .min(3)
    .matches(/^[a-zA-Z0-9\s]+$/, "colour must not contain special characters")
    .required(),
  numofseats: yup
    .number()
    .max(6, "vehicle seats must below 6 ")
    .min(2, "vehicle seats atleast 2")
    .required(),
  mileage: yup.number().min(5, "mileage must be at least 5").required(),
  fairPrice: yup
    .number()
    .min(1500, "fair Price must be at least 1500")
    .required(),
  fairKm: yup.number().min(100, "fair km must be at least 100").required(),
  vehicleValidityDate: yup
    .date()
    .required("Future date is required")
    .min(new Date(), "Date must be in the future"),
  //   vehiclesingleimage: yup
  //     .mixed()
  //     .test(
  //       "FILE_TYPE",
  //       "Invalid!",
  //       (value: any) => value && ["image/png", "image/jpg"].includes(value.type)
  //     ),
  //     vehiclemultipleimage: yup
  //     .mixed()
  //     .test(
  //       "FILE_TYPE",
  //       "Invalid!",
  //       (value: any) =>value && ["image/png", "image/jpeg"].includes(value.type) )
});
export const vendorSignUpSchema = yup.object().shape({
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
  number: yup
    .string()
    .trim()
    .min(10)
    .max(10)
    .matches(phone, {
      message: "please enter 10 valid number eg:1234567890",
    })
    .required(),
});
export const vendorLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("enter a valid email eg:risvan@gmail.com")
    .required(),
  number: yup
    .string()
    .trim()
    .min(10)
    .max(10)
    .matches(phone, {
      message: "please enter 10 valid number eg:1234567890",
    })
    .required(),
});
export const vendorHubSchema = yup.object().shape({
  hubName: yup
    .string()
    .trim()
    .min(3)
    .matches(/^[a-zA-Z0-9\s]+$/, "Enter a Name")
    .required(),

  pincode: yup
    .string()
    .trim()
    .min(6, "pincode must be 6 number")
    .matches(/^\d+$/, "pincode must be number")
    .max(6, "pincode must be 6 number")
    .required(),
  validityDate: yup
    .date()
    .required("Future date is required")
    .min(new Date(), "Date must be in the future"),
});
const pickUpDate = new Date();
pickUpDate.setDate(pickUpDate.getDate() + 1);

const dropDate = new Date(pickUpDate);
dropDate.setDate(dropDate.getDate() + 1);

const minDate = pickUpDate.toISOString().split("T")[0];

export const bookingDateSchema = yup.object().shape({
  pickUpDate: yup.date().min(minDate, 'Date must be tomorrow').required(),
  dropDate: yup
    .date()
    .min(dropDate.toISOString().split("T")[0], 'Date must be 1 day after pickupdate').required()
});