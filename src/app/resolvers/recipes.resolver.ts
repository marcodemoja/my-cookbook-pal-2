import { Signal, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Recipe } from '../features/recipes/models/recipe.model';
import { RecipesStoreFacadeService } from '../features/recipes/store/store.facade';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const storeSvc = inject(RecipesStoreFacadeService);
  storeSvc.getAllRecipes();
  return storeSvc.recipesSignal();
};
