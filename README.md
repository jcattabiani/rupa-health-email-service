# Rupa Health Transactional Email Service

## How to install and run

1. Clone this repository.
2. Navigate to the project directory and run `npm install` to install the necessary dependencies.
3. Configurations are stored in the .env file. Enter your Mailgun domain and API key, and your Sendgrid API key.
4. Set the EMAIL_SERVICE_PROVIDER variable to either mailgun or sendgrid, and run the application with `npm start`.
5. Once the server is running, you can hit the endpoint http://localhost:{PORT}/email. By default, `PORT` is 3000.
6. Run tests with `npm test`. 

## Technical choices

### Framework

I built this application using Node.js. I was drawn to this option because I'm most comfortable with JavaScript, and because it has a robust ecosystem of packages that I could use to streamline the process. It took very little time to spin up a server and expose an endpoint, and the libraries I used simplified a ton of lower level functionality.

### Libraries

- Express: Provided a framework for handling HTTP requests, defining routes, and applying middleware for stuff like JSON parsing and data validation
- Axios: Simplified the process of making HTTP requests and handling responses
- Dotenv: Separated configurations and sensitive info (like API keys) from the codebase
- HTML-to-text: Easy conversion from HTML to plaintext while preserving a semblance of structure
- JOI: Made validating incoming HTTP requests and handling those errors painless
- Mocha: Provided structure for testing
- Chai/Chai-http: Used with mocha for testing assertions

## Tradeoffs/Limitations

If I had more time, there are a few improvements I'd like to make:
- Better error handling from the email APIs - Right now, it just throws a 500 with 'Internal server error' if anything goes wrong.
- Custom validation messages - I just went with the JOI defaults, but I don't love "x is not allowed to be empty".
- Flesh out tests - I only included basic pass/fail validation tests, but it should really make sure every field validates correctly. Also, the "pass" test probably shouldn't hit an external API. 
- Allow multiple "to" and "to_name" fields - Both email APIs support sending emails to multiple recipients, but this interface does not. This is probably the biggest weakness.
- Better HTML to plain text - I do like how the html-to-text library preserves line breaks between html tags, but I'm not crazy about how it capitalizes headers. I could also convert to Markdown instead.
- Make it easier to add new email providers - Right now, if we wanted to add a third email provider, we'd have to make a change to the .env file, emailService, and validationService. The .env change is inevitable but it would be nice to be able to change the code in only one other place. 

## Time spent

Just over 4 hours

## Aditional notes

While I work on APIs almost every day, I've never built one from scratch! Please forgive the inevitable oversights. Overall, I really enjoyed the challenge and look forward to doing this kind of thing in the future.
