import { GraphQLSchema } from "graphql";
import { buildSchema } from "graphql";
import resolvers from "./resolvers";

const schema: GraphQLSchema = buildSchema(`
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
    id: ID!
    name: String!
    quantity: Float!
    unit: String!
  }

  """
  This is the input object type for CREATING an Ingredient.
  """
  input IngredientInput {
    name: String!
  }

  """
  This is the input object type for CREATING a Recipe.
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
  This is the input object type for UPDATING a Recipe.
  """
  input RecipeUpdateInput {
    title: String
    description: String
    ingredients: [RecipeIngredientInput]
    time: Int
    dinners: Int
    instructions: String
    imgUrl: String
  }

  """
  This is the input object type for all ingredients in a Recipe.
  """
  input RecipeIngredientInput {
    id: ID!
    quantity: Float!
    unit: String!
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
    updateIngredient(id: ID!, name: String!): Ingredient!
    
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
    updateRecipe(id: ID!, input: RecipeUpdateInput): Recipe!
    
    """
    Delete a recipe by ID.
    """
    deleteRecipe(id: ID!): ID
  }
`);

const { Query, Mutation } = resolvers;
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

export default schema;
