import Twilio from "twilio";
import otpGenerator from "otp-generator";
const accountid: string | undefined = process.env.TWILIO_ACCOUNT_SID;
const Auth: string | undefined = process.env.AUTH_TOKEN;

const client = Twilio(accountid, Auth);

function getotp() {
    const min = 100000; // Minimum value (inclusive)
    const max = 999999; // Maximum value (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  


export const sendOtp = async (phoneNumber: number):Promise<number> => {
  try {
    let otp=getotp()
//    await client.messages
//       .create({
//         body: `otp verification from carland  ${ otp}`,
//         to: `+91${phoneNumber}`, // Recipient's phone number
//         from: "++1 267 362 9139", // Your Twilio phone number
//       })
//       .then((message) => console.log(message.sid))
//       .catch((error) => console.error("Error sending message:", error));
    return otp
  } catch (error: any) {
    throw new Error(error);
  }
};

// const verifyOtp=async(phoneNumber:number,code:number)=>{
//     try {
//         const verification=await client.verify.services(accountid:String).verificationChecks.create({
//             to: phoneNumber,
//             code: code,
//           });

//           console.log('Message sent. SID:', verification.sid);

//     } catch (error:any) {
//       throw new Error(error)
//     }
//     }
