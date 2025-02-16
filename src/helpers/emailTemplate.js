const emailTemplate = (firstName,otp)=>{
    return`<!DOCTYPE html>
<html>
<head>
    <title>OTP Verification</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        .otp {
            display: inline-block;
            background-color: #007BFF;
            color: white;
            padding: 12px 20px;
            font-size: 24px;
            font-weight: bold;
            border-radius: 5px;
            letter-spacing: 4px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Hi,${firstName}</h1>
        <h2>Your OTP Code</h2>
        <p>Use the OTP below to verify your email. This code is valid for 10 minutes.</p>
        <p class="otp">${otp}</p>
        <p>If you didn’t request this, please ignore this email.</p>
        <p class="footer">© 2025 Your Company. All rights reserved.</p>
    </div>

</body>
</html>
`
}

module.exports = {emailTemplate}