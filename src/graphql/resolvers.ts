import RecipeModel from "../models/recipe";
import IngredientModel from "../models/ingredient";
import { handleError } from "../validation/HttpError";
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

    // // Resolver to fetch all recipes
    // async recipes(parent: any) {
    //   const recipes = await RecipeModel.find();
    //   return recipes;
    // },
    // Resolver to fetch all recipes
    async recipes(parent: any) {
      try {
        const recipes = await RecipeModel.find().populate(
          "ingredients.id",
          "name"
        );

        console.log(recipes); // Check the structure of populated data

        return recipes.map((recipe) => ({
          ...recipe.toObject(),
          id: recipe._id.toString(),
          ingredients: recipe.ingredients.map((ingredient: any) => {
            if (!ingredient.id || !ingredient.id.name) {
              console.error("Ingredient or ingredient name is missing");
              console.log(ingredient); // Check the problematic ingredient
              throw new Error("Ingredient or ingredient name is missing");
            }
            const id = ingredient.id._id
              ? ingredient.id._id.toString()
              : ingredient.id.toString(); // Extract the id from the ObjectId

            return {
              id,
              name: ingredient.id.name,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
            };
          }),
        }));
      } catch (error) {
        console.error(error);
        throw error;
      }
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
      try {
        const { name } = args;
        const newIngredient = new IngredientModel({ name });
        await newIngredient.save();
        return newIngredient;
      } catch (err) {
        throw handleError(err, "ingredient");
      }
    },

    // Resolver to update an ingredient by id
    async updateIngredient(parent: any, args: any) {
      try {
        const ingredient = await IngredientModel.findOne({ _id: args.id });
        if (!ingredient) {
          throw new Error(`Ingredient with id ${args.id} not found`);
        }

        const updatedIngredient = await IngredientModel.findByIdAndUpdate(
          args.id,
          { name: args.name },
          { new: true }
        );

        return updatedIngredient;
      } catch (err) {
        throw handleError(err, "ingredient");
      }
    },

    // Resolver to delete an ingredient by id
    async deleteIngredient(parent: any, args: any) {
      try {
        const { id } = args;
        await IngredientModel.findByIdAndDelete(id);
        return id;
      } catch (err) {
        throw handleError(err, "ingredient");
      }
    },

    // Resolver to create a new recipe
    async createRecipe(parent: any, args: any) {
      try {
        const {
          title,
          description,
          ingredients,
          time,
          dinners,
          instructions,
          imgUrl,
        } = args.input;
        const newRecipe = new RecipeModel({
          title,
          description,
          ingredients,
          time,
          dinners,
          instructions,
          imgUrl,
        });
        await newRecipe.save();
        return newRecipe;
      } catch (err) {
        throw handleError(err, "recipe");
      }
    },

    // Resolver to update a recipe by id
    async updateRecipe(parent: any, args: any) {
      try {
        const recipeExists = await RecipeModel.exists({ _id: args.id });
        if (!recipeExists) {
          throw new Error(`Recipe with id ${args.id} does not exist`);
        }
        const {
          title,
          description,
          ingredients,
          time,
          dinners,
          instructions,
          imgUrl,
        } = args.input;
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
          args.id,
          {
            title,
            description,
            ingredients,
            time,
            dinners,
            instructions,
            imgUrl,
          },
          { new: true }
        );
        return updatedRecipe;
      } catch (err) {
        throw handleError(err, "recipe");
      }
    },

    // Resolver to delete a recipe by id
    async deleteRecipe(parent: any, args: any) {
      try {
        const { id } = args;
        await RecipeModel.findByIdAndDelete(id);
        return id;
      } catch (err) {
        throw handleError(err, "recipe");
      }
    },
  },
};

export default resolvers;
