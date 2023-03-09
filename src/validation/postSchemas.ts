import Joi from "joi";

const inputRecipeSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title should be a string",
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("").optional(),
  ingredients: Joi.array().items(
    Joi.object({
      ingredient: Joi.string().required().messages({
        "string.base": "Ingredient should be a string",
        "string.empty": "Ingredient cannot be empty",
        "any.required": "Ingredient is required",
      }),
      quantity: Joi.number().required().messages({
        "number.base": "Quantity should be a number",
        "any.required": "Quantity is required",
      }),
      unit: Joi.string().required().messages({
        "string.base": "Unit should be a string",
        "string.empty": "Unit cannot be empty",
        "any.required": "Unit is required",
      }),
    })
  ),
  time: Joi.number().optional(),
  dinners: Joi.number().required().messages({
    "number.base": "Dinners should be a number",
    "any.required": "Dinners are required",
  }),
  instructions: Joi.string().required().messages({
    "string.base": "Instructions should be a string",
    "string.empty": "Instructions cannot be empty",
    "any.required": "Instructions is required",
  }),
  imgUrl: Joi.string().allow("").optional(),
});

const inputIngredientSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
});

export { inputRecipeSchema, inputIngredientSchema };
