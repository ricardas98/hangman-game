const Joi = require("joi");

module.exports = {
  //Game
  createGameValidation: (data) => {
    const schema = Joi.object({});
    return schema.validate(data);
  },

  updateGameValidation: (data) => {
    const schema = Joi.object({
      letter: Joi.string().min(1).max(1).required(),
    });
    return schema.validate(data);
  },
};
