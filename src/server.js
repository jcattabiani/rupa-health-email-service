require('dotenv').config();
const express = require('express');
const { validateEmailData, validEmailServiceProviderName } = require('./validationService');
const { sendEmail } = require('./emailService');

// Environment variables 
const emailProvider = process.env.EMAIL_SERVICE_PROVIDER;
const port = process.env.PORT;

// Check if the email service provider name is valid
if (!validEmailServiceProviderName(emailProvider)) {
    console.error('Invalid email service provider. Server cannot start.');
    process.exit(1);
}

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Email endpoint
app.post('/email', validateEmailData, (req, res) => {

    // Use emailProvider to determine which email API to hit, process response
    sendEmail(emailProvider, req)
    .then((response) => {
        console.log(response)
        res.status(200).json(response);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;