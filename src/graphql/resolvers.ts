import RecipeModel from "../models/recipe";
import IngredientModel from "../models/ingredient";

const resolvers = {
  Query: {
    // Resolver to fetch all ingredients
    async ingredients() {
      const ingredients = await IngredientModel.find();
      return ingredients;
    },

    // Resolver to fetch an ingredient by id
    async ingredient(parent: any, args: any) {
      const ingredient = await IngredientModel.findById(args.id);
      return ingredient;
    },

    // Resolver to fetch all recipes
    async recipes() {
      const recipes = await RecipeModel.find();
      return recipes;
    },

    // Resolver to fetch a recipe by id
    async recipe(parent: any, args: any) {
      const recipe = await RecipeModel.findById(args.id);
      return recipe;
    },
  },

  Mutation: {
    // Resolver to create a new ingredient
    async createIngredient(parent: any, args: any) {
      const { name } = args;
      const newIngredient = new IngredientModel({ name });
      await newIngredient.save();
      return newIngredient;
    },

    // Resolver to update an ingredient by id
    async updateIngredient(parent: any, args: any) {
      const { id, name } = args;
      const updatedIngredient = await IngredientModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      return updatedIngredient;
    },

    // Resolver to delete an ingredient by id
    async deleteIngredient(parent: any, args: any) {
      const { id } = args;
      await IngredientModel.findByIdAndDelete(id);
      return id;
    },

    // Resolver to create a new recipe
    async createRecipe(parent: any, args: any) {
      const {
        title,
        description,
        ingredients,
        time,
        dinners,
        instructions,
        imgUrl,
      } = args.input;

      // Map ingredients array to an array of ingredient objects
      const recipeIngredients = await Promise.all(
        ingredients.map(async (recipeIngredient) => {
          const { ingredient, quantity, unit } = recipeIngredient;
          const ingredientObj = await IngredientModel.findById(ingredient);
          return { ingredient: ingredientObj, quantity, unit };
        })
      );

      const newRecipe = new RecipeModel({
        title,
        description,
        ingredients: recipeIngredients,
        time,
        dinners,
        instructions,
        imgUrl,
      });
      await newRecipe.save();
      return newRecipe;
    },

    // Resolver to update a recipe by id
    async updateRecipe(parent: any, args: any) {
      const { id, input } = args;
      const {
        title,
        description,
        ingredients,
        time,
        dinners,
        instructions,
        imgUrl,
      } = input;

      // Map ingredients array to an array of ingredient objects
      const recipeIngredients = await Promise.all(
        ingredients.map(async (recipeIngredient) => {
          const { ingredient, quantity, unit } = recipeIngredient;
          const ingredientObj = await IngredientModel.findById(ingredient);
          return { ingredient: ingredientObj, quantity, unit };
        })
      );

      const updatedRecipe = await RecipeModel.findByIdAndUpdate(
        id,
        {
          title,
          description,
          ingredients: recipeIngredients,
          time,
          dinners,
          instructions,
          imgUrl,
        },
        { new: true }
      );
      return updatedRecipe;
    },

    // Resolver to delete a recipe by id
    async deleteRecipe(parent: any, args: any) {
      const { id } = args;
      await RecipeModel.findByIdAndDelete(id);
      return id;
    },
  },
  Recipe: {
    async ingredients(parent: any) {
      // Maps over the ingredients array in parent and return an array of objects containing ingredient, quantity, and unit properties
      return parent.ingredients.map((recipeIngredient) => ({
        ingredient: recipeIngredient.ingredient,
        quantity: recipeIngredient.quantity,
        unit: recipeIngredient.unit,
      }));
    },
  },
};

export default resolvers;
