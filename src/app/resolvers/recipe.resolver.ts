import { Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResolveFn } from '@angular/router';
import { Recipe } from '../features/recipes/models/recipe.model';
import { RecipesStoreFacadeService } from '../features/recipes/store/store.facade';
import { recipesFeature } from '../features/recipes/store';
import { RecipesApiService } from '../features/recipes/services/recipes-api.service';
import { Store } from '@ngrx/store';

export const recipeResolver: ResolveFn<Signal<Recipe|null>> = (route, state) => {
  const store = inject(Store);
  const storeSvc = inject(RecipesStoreFacadeService);
  const recipeSvc = inject(RecipesApiService);
  let result: Signal<Recipe|null>;

  if ('id' in route.params) {
    const id = route.params['id'];
    if (storeSvc.recipesLoadedSignal() === true) {
      storeSvc.selectRecipe(id);
    } else {
      storeSvc.fetchRecipe(id);
    }

    return store.selectSignal(recipesFeature.selectSelectedRecipe);

  }

  return signal(null);

};
