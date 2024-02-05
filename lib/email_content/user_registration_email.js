export const user_register_email = ({
    first_name, last_name, email, username, password
}) => {
  const email_content = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Information</title>
</head>
<body style="font-family: Arial, sans-serif;">

  <h2>Your Account Information</h2>

  <p><strong>Full Name:</strong> ${first_name + last_name}</p>
  <p><strong>Username:</strong> ${username}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Password:</strong> ${password}</p>

  <p>Thank you for creating an account with us. If you have any questions or concerns, please feel free to contact us.</p>

  <p>Best regards,<br> Commerce Control Pro</p>

</body>
</html>

    `;

  return email_content;
};
