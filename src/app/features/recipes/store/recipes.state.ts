import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Recipe } from "../models/recipe.model";
import * as recipesActions from "./recipes.actions";

export const recipesFeatureKey = 'recipes'

export interface RecipesState extends EntityState<Recipe> {
  recipeId: string | null;
  isLoading: boolean;
  recipesLoaded: boolean;
  query: string;
  records: Recipe[];
  selectedRecipe: Recipe | null;
};

export const adapter: EntityAdapter<Recipe> = createEntityAdapter({});

export const RecipesState: RecipesState = adapter.getInitialState({
  recipeId: null,
  isLoading: false,
  recipesLoaded: false,
  selectedRecipe: null,
  query: '',
  records: [],
});

const reducer = createReducer(
  RecipesState,
  on(recipesActions.selectRecipe, (state: RecipesState, { id }) => ({ ...state, selectedRecipe: (state.entities[id] as Recipe) })),
  on(recipesActions.fetchRecipeSuccess, (state: RecipesState, { recipe }) => ({ ...state, selectedRecipe: recipe })),
  on(recipesActions.editRecipeSuccess, (state: RecipesState, { recipe }) => {
    if (state.recipesLoaded === true) {
      return adapter.updateOne(recipe, state)
    } else {
      return ({ ...state, selectedRecipe: null })
    }
  }),
  on(recipesActions.deleteRecipeSuccess, (state: RecipesState, { id }) => adapter.removeOne(id, state)),
  on(recipesActions.fetchRecipesSuccess, (state: RecipesState, { recipes }) => adapter.setAll(recipes, { ...state, recipesLoaded: true })),
  on(recipesActions.filterRecipesByName, (state: RecipesState, { query }) => ({ ...state, query })),
  on(recipesActions.addRecipeSuccess, (state: RecipesState, { recipe }) => adapter.addOne(recipe, state))
)

export const recipesFeature = createFeature({
  name: recipesFeatureKey,
  reducer,
  extraSelectors: ({ selectQuery, selectRecords, selectRecipesState }) => ({
    ...adapter.getSelectors(selectRecipesState),
    selectFilteredRecords: createSelector(
      selectQuery,
      selectRecords,
      (query, items) => items.filter(item => item.name.includes(query))
    )
  }),
})
