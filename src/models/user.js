const joiUserSchema = Joi.object({
  username: Joi.string().min(7).required(),
  age: Joi.number().required(),
});
