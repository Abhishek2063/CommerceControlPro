export const reset_password_email = ({
    first_name,
    last_name,
    email,
    username,
    password,
  }) => {
    const data = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Update Confirmation</title>
</head>
<body>
  <p>Hello ${first_name + last_name} ,</p>
  <p>Your password for the account with username: ${username} and email: ${email} has been successfully updated.</p>
  <p>Now your password is : ${password}</p>
  <p>If you did not make this change, please contact us immediately at [Support Email] for assistance.</p>
  <p>Thank you for using Commerce Control Pro.</p>
  <p>Best regards,</p>
  <p>The Commerce Control Pro Team</p>
</body>
</html>

    `;
    return data;
}