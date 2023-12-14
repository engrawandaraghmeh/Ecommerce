import nodemailer from  "nodemailer";

export async function SendEmail(to,subject,html) {

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: "ruwanatif22@gmail.com",
    pass: "tpsy afoq pbrq qcsv",
  },
});


  const info = await transporter.sendMail({
    from: '<ruwanatif22@gmail.com>', 
    to,
    subject,
    html, 
  });

 return info;

}

