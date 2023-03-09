"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    ingredients: [
        {
            ingredient: { type: mongoose_1.Schema.Types.ObjectId, ref: "Ingredient" },
            quantity: { type: Number, required: true },
            unit: { type: String, required: true },
        },
    ],
    time: { type: Number },
    dinners: { type: Number, required: true },
    instructions: { type: String, required: true },
    imgUrl: { type: String },
});
const Recipe = (0, mongoose_1.model)("Recipe", recipeSchema, "recipes");
exports.default = Recipe;
//# sourceMappingURL=recipe.js.map