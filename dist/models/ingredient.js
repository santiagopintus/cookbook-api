"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        minLength: [2, "Name should be at least two characters long"],
        required: [true, "Name field is required"],
        unique: true,
    },
});
const Ingredient = (0, mongoose_1.model)("Ingredient", ingredientSchema, "ingredients");
exports.default = Ingredient;
//# sourceMappingURL=ingredient.js.map