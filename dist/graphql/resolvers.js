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
const HttpError_1 = require("../validation/HttpError");
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
        recipes(parent) {
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
                try {
                    const { name } = args;
                    const newIngredient = new ingredient_1.default({ name });
                    yield newIngredient.save();
                    return newIngredient;
                }
                catch (err) {
                    throw (0, HttpError_1.handleError)(err, "ingredient");
                }
            });
        },
        // Resolver to update an ingredient by id
        updateIngredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const ingredient = yield ingredient_1.default.findOne({ _id: args.id });
                    if (!ingredient) {
                        throw new Error(`Ingredient with id ${args.id} not found`);
                    }
                    const updatedIngredient = yield ingredient_1.default.findByIdAndUpdate(args.id, { name: args.name }, { new: true });
                    return updatedIngredient;
                }
                catch (err) {
                    throw (0, HttpError_1.handleError)(err, "ingredient");
                }
            });
        },
        // Resolver to delete an ingredient by id
        deleteIngredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { id } = args;
                    yield ingredient_1.default.findByIdAndDelete(id);
                    return id;
                }
                catch (err) {
                    throw (0, HttpError_1.handleError)(err, "ingredient");
                }
            });
        },
        // Resolver to create a new recipe
        createRecipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { title, description, ingredients, time, dinners, instructions, imgUrl, } = args.input;
                    const newRecipe = new recipe_1.default({
                        title,
                        description,
                        ingredients,
                        time,
                        dinners,
                        instructions,
                        imgUrl,
                    });
                    yield newRecipe.save();
                    return newRecipe;
                }
                catch (err) {
                    throw (0, HttpError_1.handleError)(err, "recipe");
                }
            });
        },
        // Resolver to update a recipe by id
        updateRecipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const recipeExists = yield recipe_1.default.exists({ _id: args.id });
                    if (!recipeExists) {
                        throw new Error(`Recipe with id ${args.id} does not exist`);
                    }
                    const { title, description, ingredients, time, dinners, instructions, imgUrl, } = args.input;
                    const updatedRecipe = yield recipe_1.default.findByIdAndUpdate(args.id, {
                        title,
                        description,
                        ingredients,
                        time,
                        dinners,
                        instructions,
                        imgUrl,
                    }, { new: true });
                    return updatedRecipe;
                }
                catch (err) {
                    throw (0, HttpError_1.handleError)(err, "recipe");
                }
            });
        },
        // Resolver to delete a recipe by id
        deleteRecipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { id } = args;
                    yield recipe_1.default.findByIdAndDelete(id);
                    return id;
                }
                catch (err) {
                    throw (0, HttpError_1.handleError)(err, "recipe");
                }
            });
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map