const axios = require('axios');
const { htmlToText } = require('html-to-text');

function sendEmail(provider, data){

    // Extract the HTML body from the request
    const htmlBody = data.body.body;

    // Convert HTML to plain text
    const plainTextBody = htmlToText(htmlBody, {
        wordwrap: 80, 
    });

    switch(provider) {
        case "mailgun": return sendEmailWithMailgun(data, plainTextBody); 
        case "sendgrid": return sendEmailWithSendgrid(data, plainTextBody); 
        // Add future options here
    }
}

function sendEmailWithMailgun(data, plainTextBody) {
    const mailgunUrl = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;

    // Mailgun API requires form data
    const formData = new FormData();
    formData.append('from', data.body.from_name + ` <${data.body.from}>`);
    formData.append('to', data.body.to);
    formData.append('subject', data.body.subject);
    formData.append('text', plainTextBody);

    return axios.post(mailgunUrl, formData, {
        auth: {
            username: 'api',
            password: process.env.MAILGUN_API_KEY,
        }
    })
    .then((response) => {
        return response.data;
        // Handle the success response from Mailgun
    })
    .catch((error) => {
        throw error;
    });
}

function sendEmailWithSendgrid(data, plainTextBody){
    const sendgridUrl = `https://api.sendgrid.com/v3/mail/send`

    // Sendgrid API accepts JSON
    const emailData = {
        "personalizations": [
        {
            "to": [
            {
                "email": data.body.to,
                "name": data.body.to_name
            }
            ],
            "subject": data.body.subject
        }
        ],
        "content": [
        {
            "type": "text/plain",
            "value": plainTextBody
        }
        ],
        "from": {
        "email": data.body.from,
        "name": data.body.from_name
        },
        "reply_to": {
        "email": data.body.from,
        "name": data.body.from_name
        }
    }

    return axios.post(sendgridUrl, emailData, {
        headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
    })
    .then((response) => {
        return "Email sent successfully.";
        // Sendgrid returns empty an string, so we need a custom message
    })
    .catch((error) => {
        throw error;
    });
}

module.exports = { sendEmail };