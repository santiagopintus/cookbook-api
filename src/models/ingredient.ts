import { Schema, Document, model } from "mongoose";

export interface IngredientDocument extends Document {
  name: string;
}

const ingredientSchema = new Schema({
  name: { type: String, required: true },
});

const Ingredient = model<IngredientDocument>(
  "Ingredient",
  ingredientSchema,
  "ingredients"
);

export default Ingredient;
