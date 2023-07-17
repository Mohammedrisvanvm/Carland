import * as yup from 'yup'
const password: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/;
const email: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const SignupSchema = yup.object().shape({
    name: yup.string().min(3).matches(/^[a-zA-Z0-9\s]+$/, 'Name must not contain special characters').required(),
    email: yup.string().email('enter a valid email').required(),
    password: yup.string().min(6).matches(password, { message: 'please create strong password' }).required(),
    confirmPassword:yup.string().oneOf([yup.ref("password")],'password must match').required()
})



