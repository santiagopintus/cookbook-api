"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputIngredientSchema = exports.inputRecipeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const inputRecipeSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.base": "Title should be a string",
        "string.empty": "Title cannot be empty",
        "any.required": "Title is required",
    }),
    description: joi_1.default.string().allow("").optional(),
    ingredients: joi_1.default.array().items(joi_1.default.object({
        ingredient: joi_1.default.string().required().messages({
            "string.base": "Ingredient should be a string",
            "string.empty": "Ingredient cannot be empty",
            "any.required": "Ingredient is required",
        }),
        quantity: joi_1.default.number().required().messages({
            "number.base": "Quantity should be a number",
            "any.required": "Quantity is required",
        }),
        unit: joi_1.default.string().required().messages({
            "string.base": "Unit should be a string",
            "string.empty": "Unit cannot be empty",
            "any.required": "Unit is required",
        }),
    })),
    time: joi_1.default.number().optional(),
    dinners: joi_1.default.number().required().messages({
        "number.base": "Dinners should be a number",
        "any.required": "Dinners are required",
    }),
    instructions: joi_1.default.string().required().messages({
        "string.base": "Instructions should be a string",
        "string.empty": "Instructions cannot be empty",
        "any.required": "Instructions is required",
    }),
    imgUrl: joi_1.default.string().allow("").optional(),
});
exports.inputRecipeSchema = inputRecipeSchema;
const inputIngredientSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "string.base": "Name should be a string",
        "string.empty": "Name cannot be empty",
        "any.required": "Name is required",
    }),
});
exports.inputIngredientSchema = inputIngredientSchema;
//# sourceMappingURL=postSchemas.js.map