import axios, { AxiosInstance } from "axios";
// import { userCheck } from "../apis/userApi/userApi";
// import { Authcheck } from "../../interfaces/userAuth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store/storeHook";
import { userCheck } from "../apis/userApi/userApi";
// import { setUser } from "../../redux/Slices/UserSlice/UserSlice";

// const vendor =useAppSelector((state)=>state.vendor)
// const dispatch =useDispatch()
export const axiosBase   = axios.create({
  baseURL: "http://localhost:3131/",
  timeout: 10000,
  withCredentials: true,
});

axiosBase.interceptors.request.use(
  async(config) => {
    // try {
    //   let data:Authcheck=await userCheck()

    //   if (data && data.data && data.data.user) {
    //     dispatch(setUser(data.data.user));
    //   } else {
    //     console.error(
    //       "User data is undefined or not in the expected format."
    //     );
    //   } 
    // } catch (error) {
    //   console.log(error);
      
    // }
    // if(!config.token){

    //   config.token=vendor.accessToken
    // }

      console.info(
        "Request: \n\n  URL: " + config.url + "\n  Method: " + config.method + "\n  Headers: " + JSON.stringify(
          config.headers
        ) + "\n  Data: " + JSON.stringify(config.data)
      );
     
      console.log(config);
      
      return config;
    },
    (error) => {
      console.error("Request error: " + error.message);
      return Promise.reject(error);
    } 
  );

  axiosBase.interceptors.response.use(
    (response) => {
      // console.info(
      //   "Response: \n\n  Status: " + response.status + "\n  Headers: " + JSON.stringify(
      //     response.headers
      //   ) + "\n  Data: " + JSON.stringify(response.data)
        
      //   );
      //   console.log(response)
      return response;
    },
    (error) => {
      console.error("Response error: " + error.message);
      return Promise.reject(error);
    }
  );



