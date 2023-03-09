import { Schema, Document, model } from "mongoose";
import { IngredientDocument } from "./ingredient";

export interface RecipeDocument extends Document {
  title: string;
  description?: string;
  ingredients: Array<{
    ingredient: IngredientDocument;
    quantity: number;
    unit: string;
  }>;
  time?: number;
  dinners: number;
  instructions: string;
  imgUrl?: string;
}

const recipeSchema = new Schema<RecipeDocument>({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  ingredients: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient" },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  ],
  time: { type: Number },
  dinners: { type: Number, required: true },
  instructions: { type: String, required: true },
  imgUrl: { type: String },
});

const Recipe = model<RecipeDocument>("Recipe", recipeSchema, "recipes");

export default Recipe;
