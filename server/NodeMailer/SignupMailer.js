import nodemailer from "nodemailer";



const SignupMailer = (email, name) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: "chandrashekharsaini322@gmail.com",
            pass: "volfdzdbyovzmlix",
        },

        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    });


    const mailUser = {
        from: 'chandrashekharsaini322@gmail.com',
        to: email,
        subject: "Welcome to VideoCompressor - Signup Successful!",

        html: ` 
          <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Signup - Video Compress</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://play-lh.googleusercontent.com/-jFvYPoz5GmPoOHa5UyCBkyO8sG-XUk6NSI5fciodaPUFNCSUV1YSlJJoJFf7rMdCtU" 
             alt="Company Logo" 
             style="max-width: 150px; border-radius: 50px; width: 30%; height: 30%;" />
        <p style="
          background: linear-gradient(to right, rgb(15, 174, 208), rgb(14, 169, 204), rgb(16, 184, 215), rgb(77, 202, 153), rgb(139, 217, 86), rgb(165, 223, 59));  
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 24px;
          font-weight: 700;
        ">
          Video Compress
        </p>
      </div>
      <h2 style="color: #2e6da4; text-align: center; font-size: 24px;">Welcome to Video Compress!</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #555;">Hi ${name},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #555;">
        We're excited to have you join our community! Your signup was successful, and you're now ready to explore our platform. Feel free to reach out if you have any questions or need support.
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <!-- LinkedIn -->
        <a href="https://www.linkedin.com/company/yourcompany" style="display: inline-block; margin: 0 5px; text-decoration: none; color: #555; font-size: 16px;">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style="width: 32px; height: 32px;" />
          <span style="display: block;">LinkedIn</span>
        </a>
        <!-- YouTube -->
        <a href="https://www.youtube.com/yourcompany" style="display: inline-block; margin: 0 5px; text-decoration: none; color: #555; font-size: 16px;">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" style="width: 32px; height: 32px;" />
          <span style="display: block;">YouTube</span>
        </a>
        <!-- Twitter -->
        <a href="https://www.twitter.com/yourcompany" style="display: inline-block; margin: 0 5px; text-decoration: none; color: #555; font-size: 16px;">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" style="width: 32px; height: 32px;" />
          <span style="display: block;">Twitter</span>
        </a>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #555;">
        If you need help, you can contact us anytime at 
        <a href="mailto:support@yourwebsite.com" style="color: #2e6da4;">support@yourwebsite.com</a> 
        or call us at <strong>+91 8445680548</strong>.
      </p>
      <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; 2024 Video Compress. All rights reserved.</p>
      </footer>
    </div>
  </body>
</html>

        `
        
    }

    const mailOption = transporter.sendMail(mailUser, (error, info) => {
        if (error) {
            console.log(error)
        }

        console.log(inof);
    })
}

export default SignupMailer;