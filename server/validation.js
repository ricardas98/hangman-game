const Joi = require("joi");

module.exports = {
  //Game
  createGameValidation: (data) => {
    const schema = Joi.object({});
    return schema.validate(data);
  },

  //Word
  createWordValidation: (data) => {
    const schema = Joi.object({
      value: Joi.string().min(3).max(15).required(),
    });
    return schema.validate(data);
  },
};
