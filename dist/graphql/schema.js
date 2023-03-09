"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const resolvers_1 = __importDefault(require("./resolvers"));
const schema = (0, graphql_1.buildSchema)(`
  """
  This is the Ingredient object type.
  """
  type Ingredient {
    id: ID!
    name: String!
  }

  """
  This is the Recipe object type.
  """
  type Recipe {
    id: ID!
    title: String!
    description: String
    ingredients: [RecipeIngredient!]!
    time: Int
    dinners: Int!
    instructions: String!
    imgUrl: String
  }

  """
  This is the type for each ingredient in the recipe
  """
  type RecipeIngredient {
    ingredientId: ID!
    quantity: Float!
    unit: String!
  }

  """
  This is the input object type for creating an Ingredient.
  """
  input IngredientInput {
    name: String!
  }
  
  """
  This is the input object type for creating an Ingredient.
  """
  input RecipeIngredientInput {
    ingredientId: ID!
    quantity: Float!
    unit: String!
  }

  """
  This is the input object type for creating a Recipe.
  """
  input RecipeInput {
    title: String!
    description: String
    ingredients: [RecipeIngredientInput!]!
    time: Int
    dinners: Int!
    instructions: String!
    imgUrl: String
  }

  """
  This is the Query object type.
  """
  type Query {
    """
    Get all ingredients.
    """
    ingredients: [Ingredient!]!
    
    """
    Get an ingredient by ID.
    """
    ingredient(id: ID!): Ingredient
    
    """
    Get all recipes.
    """
    recipes: [Recipe!]!
    
    """
    Get a recipe by ID.
    """
    recipe(id: ID!): Recipe
  }

  """
  This is the Mutation object type.
  """
  type Mutation {
    """
    Create an ingredient.
    """
    createIngredient(name: String!): Ingredient!
    
    """
    Update an ingredient by ID.
    """
    updateIngredient(id: ID!, name: String): Ingredient!
    
    """
    Delete an ingredient by ID.
    """
    deleteIngredient(id: ID!): ID
    
    """
    Create a recipe.
    """
    createRecipe(input: RecipeInput!): Recipe!
    
    """
    Update a recipe by ID.
    """
    updateRecipe(id: ID!, input: RecipeInput!): Recipe!
    
    """
    Delete a recipe by ID.
    """
    deleteRecipe(id: ID!): ID
  }
`);
const { Query, Mutation } = resolvers_1.default;
const fields = schema.getQueryType().getFields();
const mutations = schema.getMutationType().getFields();
fields.ingredients.resolve = Query.ingredients;
fields.ingredient.resolve = Query.ingredient;
fields.recipes.resolve = Query.recipes;
fields.recipe.resolve = Query.recipe;
mutations.createIngredient.resolve = Mutation.createIngredient;
mutations.updateIngredient.resolve = Mutation.updateIngredient;
mutations.deleteIngredient.resolve = Mutation.deleteIngredient;
mutations.createRecipe.resolve = Mutation.createRecipe;
mutations.updateRecipe.resolve = Mutation.updateRecipe;
mutations.deleteRecipe.resolve = Mutation.deleteRecipe;
exports.default = schema;
//# sourceMappingURL=schema.js.map