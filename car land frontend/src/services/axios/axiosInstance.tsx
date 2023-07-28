import axios from "axios";

 export const axiosBase=axios.create({
    baseURL:"http://localhost:3131/",
    timeout:5000,
    headers: {
        "Content-Type": "application/json",
      }
 })
