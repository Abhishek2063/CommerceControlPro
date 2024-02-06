export const forget_password = (existingUser, app_url) => {
  const url = app_url.appUrl + "/reset-password?email=" + existingUser.email;
  const data = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body>
  <p>Hello ${existingUser.first_name + existingUser.last_name},</p>
  <p>We received a request to reset the password for your account associated with the email address: ${
    existingUser.email
  }.</p>
  <p>If you did not make this request, you can safely ignore this email. No changes will be made to your account.</p>
  <p>If you did request a password reset, please click the button below to verify your request:</p>
  <a href="${url}" target="_blank" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Request</a>
  <p>If the button does not work, you can also copy and paste the following link into your browser:</p>
  <p>${url}</p>
  <p>This link will expire in 24 hours for security reasons.</p>
  <p>Thank you,</p>
  <p>Commerce Control Pro</p>
</body>
</html>

    `;
  return data;
};
