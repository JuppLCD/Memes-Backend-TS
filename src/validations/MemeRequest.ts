import Joi from 'joi';

export default Joi.object({
	name: Joi.string().alphanum().min(5).max(20).trim().required(),
	access: Joi.boolean().optional(),
});
