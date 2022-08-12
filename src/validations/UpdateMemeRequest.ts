import Joi from 'joi';

export default Joi.object({
	name: Joi.string().min(5).max(20).trim().required(),
});
