import { Schema, Document, model } from "mongoose";

/* Mongoose schema used for validating data */
export interface IngredientDocument extends Document {
  id: string;
  name: string;
}

const ingredientSchema = new Schema({
  name: {
    type: String,
    minLength: [2, "Name should be at least two characters long"],
    required: [true, "Name field is required"],
    unique: true,
  },
});

const Ingredient = model<IngredientDocument>(
  "Ingredient",
  ingredientSchema,
  "ingredients"
);

export default Ingredient;
