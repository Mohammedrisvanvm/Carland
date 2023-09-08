import * as yup from "yup";


const password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/;
const email: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phone:RegExp= /^[0-9]{10}$|^[0][0-9]{10}$/;


export const AdminAuthSchema= yup.object().shape({
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
  })
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
    .min(6)
    // .matches(
    //   /^[A-Za-z]{2}\s[0-9]{2}\s[A-Za-z]{2}\s[0-9]{4}$/,
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
export const vendorSignUpSchema= yup.object().shape({
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
export const vendorLoginSchema= yup.object().shape({
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

