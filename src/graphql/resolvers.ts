import db from "../db";
import RecipeModel from "../models/recipe";
import IngredientModel from "../models/ingredient";

const resolvers = {
  Query: {
    async recipes() {
      const recipes = await RecipeModel.find();
      return recipes;
    },
    async recipe(parent: any, args: any) {
      const recipe = await RecipeModel.findById(args.id);
      return recipe;
    },
    async ingredients() {
      const ingredients = await IngredientModel.find();
      return ingredients;
    },
    async ingredient(parent: any, args: any) {
      const ingredient = await IngredientModel.findById(args.id);
      return ingredient;
    },
  },
  Mutation: {
    async createIngredient(parent: any, args: any) {
      const { name, quantity } = args;
      const newIngredient = new IngredientModel({ name, quantity });
      await newIngredient.save();
      return newIngredient;
    },
    async updateIngredient(parent: any, args: any) {
      const { id, name, quantity } = args;
      const updatedIngredient = await IngredientModel.findByIdAndUpdate(
        id,
        { name, quantity },
        { new: true }
      );
      return updatedIngredient;
    },
    async deleteIngredient(parent: any, args: any) {
      const { id } = args;
      await IngredientModel.findByIdAndDelete(id);
      return id;
    },
    async createRecipe(parent: any, args: any) {
      const { title, description, ingredients } = args.input;
      const recipeIngredients = await IngredientModel.insertMany(ingredients);
      const newRecipe = new RecipeModel({
        title,
        description,
        ingredients: recipeIngredients,
      });
      await newRecipe.save();
      return newRecipe;
    },
    async updateRecipe(parent: any, args: any) {
      const { id, input } = args;
      const { title, description, ingredients } = input;
      const recipeIngredients = await IngredientModel.insertMany(ingredients);
      const updatedRecipe = await RecipeModel.findByIdAndUpdate(
        id,
        { title, description, ingredients: recipeIngredients },
        { new: true }
      );
      return updatedRecipe;
    },
    async deleteRecipe(parent: any, args: any) {
      const { id } = args;
      await RecipeModel.findByIdAndDelete(id);
      return id;
    },
  },
  Recipe: {
    async ingredients(parent: any) {
      const recipe = await RecipeModel.findById(parent.id).populate(
        "ingredients"
      );
      return recipe.ingredients;
    },
  },
};

export default resolvers;
