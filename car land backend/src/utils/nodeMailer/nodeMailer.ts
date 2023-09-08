import nodemailer from 'nodemailer'

export function sendEmail (email:string , password:string){
  console.log(email
    ,"fsdfdfd" , password);

  return new Promise((resolve, reject)=>{
      let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD ,
          },
        });
    
          var mailOptions={
            from: process.env.EMAIL,
            to: email,
            subject: "Learnly Email verification",
            html: `
            <p>We are excited to have you as a teacher of Learnly. To get started, please use your  email address and the following password to log in</p>
            <p><b>Password: ${password}</b></p>
            `,
          }
      
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("error", error, info)
              reject(error)

            } else {
              console.log("success")
              resolve({status :true, message:"Email sent successfull"})
            }
          });
  })
}