import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Recipe } from '../features/recipes/models/recipe.model';
import { StoreFacadeService } from '../store/store.facade';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const storeSvc = inject(StoreFacadeService);
  storeSvc.getAllRecipes();
  return storeSvc.recipesSignal();
};
