import { Injectable, Signal, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Ingredient, Recipe } from "../models/recipe.model";


@Injectable()
export class RecipeFormService {
  private readonly fb = inject(FormBuilder);

  ingredients = signal<Ingredient[]>([]);
  name = signal('');
  description = signal('');
  preparation = signal('');


  populateFields(data: Recipe): void {
    if(data.ingredients) {
      this.ingredients.set(data.ingredients);
    }
  }


}
