// import Twilio from "twilio";

// const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.AUTH_TOKEN);

export function getotp() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sendOtp = async (phoneNumber: number): Promise<number> => {
  // console.log(client);
  
  try {
    const otp = getotp();
    // await client.messages
    //   .create({
    //     body: `otp verification from carland  ${otp}`,
    //     to: `+91${phoneNumber}`,
    //     from: "++1 267 362 9139",
    //   })
     
    return otp;
  } catch (error: any) {
    console.log(error);
    
    throw new Error(error);
  }
};
