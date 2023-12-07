import { Injectable, inject } from "@angular/core";
import { recipesFeature } from "./recipes.state";
import { Store } from "@ngrx/store";
import * as recipesActions from './recipes.actions';
import { Recipe } from "../models/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipesStoreFacadeService {
  store = inject(Store);
  recipesSignal = this.store.selectSignal(recipesFeature.selectAll);
  recipesLoadedSignal = this.store.selectSignal(recipesFeature.selectRecipesLoaded);
  selectedRecipeSignal = this.store.selectSignal(recipesFeature.selectSelectedRecipe);

  getAllRecipes():void {
    if(false === this.recipesLoadedSignal()){
      this.store.dispatch(recipesActions.fetchRecipes());
    }
  }

  fetchRecipe(id: string): void {
    this.store.dispatch(recipesActions.fetchRecipe({id}));
  }

  selectRecipe(id: string): void {
    this.store.dispatch(recipesActions.selectRecipe({id}));
  }

  addRecipesToStore(recipes: Recipe[]): void {
    this.store.dispatch(recipesActions.fetchRecipesSuccess({recipes}));
  }

  getRecipesByName(query: string): void {
    this.store.dispatch(recipesActions.filterRecipesByName({ query }))
  }

  addRecipe(recipe: Recipe): void {
    this.store.dispatch(recipesActions.addRecipe({ recipe }))
  }

  editRecipe(recipe: Recipe): void {
    this.store.dispatch(recipesActions.editRecipe({recipe}))
  }

  deleteRecipe(id: string): void {
    this.store.dispatch(recipesActions.deleteRecipe({id}))
  }

}
