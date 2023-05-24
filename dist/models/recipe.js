"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title field is required"],
        unique: true,
    },
    description: { type: String },
    ingredients: [
        {
            id: {
                type: String,
                required: [true, "Ingredient ID field is required"],
            },
            quantity: {
                type: Number,
                required: [true, "Quantity field is required"],
            },
            unit: { type: String, required: [true, "Unit field is required"] },
        },
    ],
    time: { type: Number },
    dinners: { type: Number, required: [true, "Dinners field is required"] },
    instructions: {
        type: String,
        required: [true, "Instructions field is required"],
        minLength: [10, "Instructions should be at least 10 characters long"],
    },
    imgUrl: { type: String },
});
const Recipe = (0, mongoose_1.model)("Recipe", recipeSchema, "recipes");
exports.default = Recipe;
//# sourceMappingURL=recipe.js.map