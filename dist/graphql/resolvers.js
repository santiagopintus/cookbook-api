"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_1 = __importDefault(require("../models/recipe"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const apollo_server_errors_1 = require("apollo-server-errors");
const postSchemas_1 = require("../validation/postSchemas");
const resolvers = {
    Query: {
        // Resolver to fetch all ingredients
        ingredients() {
            return __awaiter(this, void 0, void 0, function* () {
                const ingredients = yield ingredient_1.default.find();
                return ingredients;
            });
        },
        // Resolver to fetch an ingredient by id
        ingredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const ingredient = yield ingredient_1.default.findById(args.id);
                return ingredient;
            });
        },
        // Resolver to fetch all recipes
        recipes() {
            return __awaiter(this, void 0, void 0, function* () {
                const recipes = yield recipe_1.default.find();
                return recipes;
            });
        },
        // Resolver to fetch a recipe by id
        recipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const recipe = yield recipe_1.default.findById(args.id);
                return recipe;
            });
        },
    },
    Mutation: {
        // Resolver to create a new ingredient
        createIngredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { name } = args;
                const { error } = postSchemas_1.inputIngredientSchema.validate({ name });
                // If there is an error, throw an error with custom messages
                if (error) {
                    const messages = error.details.map((detail) => detail.message);
                    throw new apollo_server_errors_1.UserInputError("Failed to create recipe", { messages });
                }
                const newIngredient = new ingredient_1.default({ name });
                yield newIngredient.save();
                return newIngredient;
            });
        },
        // Resolver to update an ingredient by id
        updateIngredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id, name } = args;
                const updatedIngredient = yield ingredient_1.default.findByIdAndUpdate(id, { name }, { new: true });
                return updatedIngredient;
            });
        },
        // Resolver to delete an ingredient by id
        deleteIngredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id } = args;
                yield ingredient_1.default.findByIdAndDelete(id);
                return id;
            });
        },
        // Resolver to create a new recipe
        createRecipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { title, description, ingredients, time, dinners, instructions, imgUrl, } = args.input;
                // Validate input against Joi schema
                const { error } = postSchemas_1.inputRecipeSchema.validate({
                    title,
                    description,
                    ingredients,
                    time,
                    dinners,
                    instructions,
                    imgUrl,
                }, { abortEarly: false });
                // If there is an error, throw an error with custom messages
                if (error) {
                    const messages = error.details.map((detail) => detail.message);
                    throw new apollo_server_errors_1.UserInputError("Failed to create recipe", { messages });
                }
                // Map ingredients array to an array of ingredient objects
                const recipeIngredients = yield Promise.all(ingredients.map((recipeIngredient) => __awaiter(this, void 0, void 0, function* () {
                    const { ingredient, quantity, unit } = recipeIngredient;
                    const ingredientObj = yield ingredient_1.default.findById(ingredient);
                    return { ingredient: ingredientObj, quantity, unit };
                })));
                const newRecipe = new recipe_1.default({
                    title,
                    description,
                    ingredients: recipeIngredients,
                    time,
                    dinners,
                    instructions,
                    imgUrl,
                });
                yield newRecipe.save();
                return newRecipe;
            });
        },
        // Resolver to update a recipe by id
        updateRecipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id, input } = args;
                const { title, description, ingredients, time, dinners, instructions, imgUrl, } = input;
                // Map ingredients array to an array of ingredient objects
                const recipeIngredients = yield Promise.all(ingredients.map((recipeIngredient) => __awaiter(this, void 0, void 0, function* () {
                    const { ingredient, quantity, unit } = recipeIngredient;
                    const ingredientObj = yield ingredient_1.default.findById(ingredient);
                    return { ingredient: ingredientObj, quantity, unit };
                })));
                const updatedRecipe = yield recipe_1.default.findByIdAndUpdate(id, {
                    title,
                    description,
                    ingredients: recipeIngredients,
                    time,
                    dinners,
                    instructions,
                    imgUrl,
                }, { new: true });
                return updatedRecipe;
            });
        },
        // Resolver to delete a recipe by id
        deleteRecipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id } = args;
                yield recipe_1.default.findByIdAndDelete(id);
                return id;
            });
        },
    },
    Recipe: {
        ingredients(parent) {
            return __awaiter(this, void 0, void 0, function* () {
                // Maps over the ingredients array in parent and return an array of objects containing ingredient, quantity, and unit properties
                return parent.ingredients.map((recipeIngredient) => ({
                    ingredient: recipeIngredient.ingredient,
                    quantity: recipeIngredient.quantity,
                    unit: recipeIngredient.unit,
                }));
            });
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map