import Joi from 'joi';

export default Joi.object({
	name: Joi.string().alphanum().min(5).max(20).trim().required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\\s]{3,30}$')).required(),
	passwordConfirm: Joi.ref('password'),
}).with('password', 'passwordConfirm');
