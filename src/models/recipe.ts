import { Schema, Document, model } from "mongoose";

export interface RecipeDocument extends Document {
  title: string;
  description?: string;
  ingredients: Array<{
    id: string; // Reference to the Ingredient _id
    quantity: number;
    unit: string;
  }>;
  time?: number;
  dinners: number;
  instructions: string;
  imgUrl?: string;
}

const recipeSchema = new Schema<RecipeDocument>({
  title: {
    type: String,
    required: [true, "Title field is required"],
    unique: true,
  },
  description: { type: String },
  ingredients: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Ingredient", // Reference the Ingredient model
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

const Recipe = model<RecipeDocument>("Recipe", recipeSchema, "recipes");

export default Recipe;
