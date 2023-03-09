"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
const Ingredient = (0, mongoose_1.model)("Ingredient", ingredientSchema, "ingredients");
exports.default = Ingredient;
//# sourceMappingURL=ingredient.js.map