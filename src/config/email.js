import "dotenv/config";
import { createTransport } from "nodemailer";

console.log(process.env["EMAIL_USER"]);

export const messenger = createTransport({
  host: process.env["SMTP_HOST"],
  port: Number(process.env["SMTP_PORT"]),
  secure: true,
  auth: {
    user: process.env["EMAIL_USER"],
    pass: process.env["EMAIL_PASS"],
  },
  family: 4, // forces IPv4, avoids ENETUNREACH on IPv6-broken Docker networks
});



// const messenger = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
  
// });