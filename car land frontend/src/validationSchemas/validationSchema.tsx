import * as yup from 'yup'
const password: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/;
const email: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const SignupSchema = yup.object().shape({
    userName: yup.string().trim().min(3).matches(/^[a-zA-Z0-9\s]+$/, 'Name must not contain special characters').required(),
    email: yup.string().email('enter a valid email').required(),
    password: yup.string().trim().min(6).matches(password, { message: 'please create strong password eg:Huaert5@' }).required(),
    confirmPassword:yup.string().oneOf([yup.ref("password")],'password must match').required()
})
export const LoginSchema=yup.object().shape({
    userName: yup.string().trim().min(3).matches(/^[a-zA-Z0-9\s]+$/, 'Enter a Name').required(),
    email: yup.string().email('enter a valid email eg:risvan@gmail.com').required(),
    password: yup.string().trim().min(6).matches(password, { message: 'please enter password Atleast 6 characters eg:Huat5@' }).required(),
})



