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
const resolvers = {
    Query: {
        recipes() {
            return __awaiter(this, void 0, void 0, function* () {
                const recipes = yield recipe_1.default.find();
                return recipes;
            });
        },
        recipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const recipe = yield recipe_1.default.findById(args.id);
                return recipe;
            });
        },
        ingredients() {
            return __awaiter(this, void 0, void 0, function* () {
                const ingredients = yield ingredient_1.default.find();
                return ingredients;
            });
        },
        ingredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const ingredient = yield ingredient_1.default.findById(args.id);
                return ingredient;
            });
        },
    },
    Mutation: {
        createIngredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { name, quantity } = args;
                const newIngredient = new ingredient_1.default({ name, quantity });
                yield newIngredient.save();
                return newIngredient;
            });
        },
        updateIngredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id, name, quantity } = args;
                const updatedIngredient = yield ingredient_1.default.findByIdAndUpdate(id, { name, quantity }, { new: true });
                return updatedIngredient;
            });
        },
        deleteIngredient(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id } = args;
                yield ingredient_1.default.findByIdAndDelete(id);
                return id;
            });
        },
        createRecipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { title, description, ingredients } = args.input;
                const recipeIngredients = yield ingredient_1.default.insertMany(ingredients);
                const newRecipe = new recipe_1.default({
                    title,
                    description,
                    ingredients: recipeIngredients,
                });
                yield newRecipe.save();
                return newRecipe;
            });
        },
        updateRecipe(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id, input } = args;
                const { title, description, ingredients } = input;
                const recipeIngredients = yield ingredient_1.default.insertMany(ingredients);
                const updatedRecipe = yield recipe_1.default.findByIdAndUpdate(id, { title, description, ingredients: recipeIngredients }, { new: true });
                return updatedRecipe;
            });
        },
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
                const recipe = yield recipe_1.default.findById(parent.id).populate("ingredients");
                return recipe.ingredients;
            });
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map