import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

import { Recipe } from '../models/recipe.model';

export const recipesKey = '[Recipes]';

export const addRecipe = createAction(
  `${recipesKey} Add Recipe`,
  props<{ recipe: Recipe }>()
);

export const addRecipeSuccess = createAction(
  `${recipesKey} Add Recipe Success`,
  props<{ recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  `${recipesKey} Delete Recipe`,
  props<{ id: string }>()
);

export const deleteRecipeSuccess = createAction(
  `${recipesKey} Delete Recipe Success`,
  props<{ id: string }>()
)

export const fetchRecipe = createAction(
  `${recipesKey} Fetch Recipe`,
  props<{id: string}>()
);

export const fetchRecipeSuccess = createAction(
  `${recipesKey} Fetch Recipe Success`,
  props<{recipe: Recipe}>()
);

export const selectRecipe = createAction(
  `${recipesKey} Select Recipe`,
  props<{id: string}>()
);

export const editRecipe = createAction(
  `${recipesKey} Edit Recipe`,
  props<{recipe: Recipe}>()
)

export const editRecipeSuccess = createAction(
  `${recipesKey} Edit Recipe Success`,
  props<{ recipe: Update<Recipe> }>()
);

export const fetchRecipes = createAction(
  `${recipesKey} Fetch All Recipes`
);

export const fetchRecipesSuccess = createAction(
  `${recipesKey} Fetch Recipes Success`,
  props<{ recipes: Recipe[] }>()
);

export const filterRecipesByName = createAction(
  `${recipesKey} Filter Recipes By Name`,
  props<{ query: string }>()
);

export const saveRecipeFields = createAction(
  `${recipesKey} Save Recipe Values`,
  props<{ values: Partial<Recipe>}>()
);
