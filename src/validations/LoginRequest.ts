import Joi from 'joi';

export default Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\\s]{3,30}$')).trim().required(),
});
