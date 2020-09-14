import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxae14d589f43b4853a4871aa87dba2391.mailgun.org",
});
// to:string,
const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: 'kim.hoyeon93@gmail.com',
    to: 'kim.hoyeon93@gmail.com',
    subject,
    html,
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, Please verify your email`;
    const emailBody = `Thank you for testing my nuber project!, Please verify your email by clicking following link <a href="https://nuber.com/verification/${key}">here</a>`
    return sendEmail(emailSubject, emailBody)
}