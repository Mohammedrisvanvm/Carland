import * as yup from 'yup'
const password:RegExp=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/;
const email:RegExp=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

const SignupSchema=yup.object().shape({
    name:yup.string().min(3).required(),
    email:yup.string().email('enter a valid email').required(),
    password:yup
})



