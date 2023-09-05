const Joi = require('joi');

// list of valid values for email provider environment variable
const validEmailProviders = ["mailgun", "sendgrid"];

// Parameter requirements
const emailSchema = Joi.object({
    to: Joi.string().email().required(),
    to_name: Joi.string().required(),
    from: Joi.string().email().required(),
    from_name: Joi.string().required(),
    subject: Joi.string().required().max(998),
    body: Joi.string().required().max(384000),
  });

// Returns array of failed validations
function validateEmailData(req, res, next) {
    const { error } = emailSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const validationErrors = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: validationErrors });
    }

    // If no errors, continue to body of /email endpoint
    next(); 
}

// Make sure email provider environment variable is valid
function validEmailServiceProviderName(provider){
    return validEmailProviders.includes(provider.toLowerCase());
}

module.exports = { validateEmailData, validEmailServiceProviderName };