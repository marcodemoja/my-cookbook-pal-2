import { ChangeDetectionStrategy, Component, Signal, ViewChild, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InstantSearchItemResponse } from '../../../../shared/interfaces/nutritionx/responses';
import { StoreFacadeService } from '../../../../store/store.facade';
import { IngredientsFieldsListComponent } from '../../components/ingredients-fields-list/ingredients-fields-list.component';
import { SearchFoodComponent } from '../../../../shared/components/search-food/search-food.component';
import { Ingredient, Recipe } from '../../models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../foods/services/food.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';

@UntilDestroy()
@Component({
  selector: 'app-add-recipe-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    SearchFoodComponent,
    IngredientsFieldsListComponent,
    MatIconModule
  ],
  providers: [
    FoodService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  templateUrl: './add-recipe-page.component.html',
  styleUrl: './add-recipe-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRecipePageComponent {

  private readonly fb: FormBuilder = inject(FormBuilder)
  private readonly storeFacadeSvc = inject(StoreFacadeService);
  private readonly foodSvc = inject(FoodService);
  private readonly route = inject(ActivatedRoute);

  @ViewChild(MatStepper) stepper!: MatStepper;

  get step1() { return this.form.controls['step1'] as FormGroup; }
  get step2() { return this.form.controls['step2'] as FormGroup; }
  get step3() { return this.form.controls['step3'] as FormGroup; }
  get fg_ingredients() {
    const form = this.form.get('step2') as FormGroup
    return form.get('ingredients') as FormArray<FormGroup>;
  }

  ingredientsSearchResult$!: Observable<InstantSearchItemResponse[]>;
  recipeIngredients$ = new BehaviorSubject<FormGroup[]>([]);
  recipeData: Signal<Recipe> = this.route.snapshot.data['recipe'];

  form: FormGroup = this.fb.group({
    step1: this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required]
    }),
    step2: this.fb.group({
      ingredients: this.fb.array<FormGroup>([])
    }),
    step3: this.fb.group({
      preparation: ['', Validators.required]
    }),
  })

  constructor() {
    //populate form from route data signal if editing a recipe
    if (this.recipeData) {
      effect(() => {
        if (this.recipeData() !== null) {
          this.populateForm(this.recipeData());
        }
      });
    }
  }

  setIngredientStepErrorState():boolean {
    if(this.stepper) {
      return (this.stepper.steps.get(1)?.interacted && this.step2.get('ingredients')?.value.length === 0 )? true : false
    }
    return false;
  }

  onSearchIngredients(query: string) {
    this.ingredientsSearchResult$ = this.foodSvc.typeAheadSearchFood(query);
  }

  onSelectIngredient(ingredient: string): void {
    this.foodSvc.getFoodByName(ingredient).pipe(untilDestroyed(this)).subscribe((facts) => {
      const ingredient: Ingredient = {
        food_id: facts.id as string,
        food_name: facts.food_name as string,
        quantity: '',
        serving_unit: facts.serving_unit as string
      };
      this.populateIngredientsFormArray([ingredient]);
    })
  }


  removeIngredient(index: number) {
    this.fg_ingredients.removeAt(index);
    this.recipeIngredients$.next(this.fg_ingredients.controls);
  }

  save() {
    if (this.form.valid) {
      const recipe: Recipe = {
        name: this.step1.get('name')?.value,
        description: this.step1.get('description')?.value,
        preparation: this.step3.get('preparation')?.value,
        ingredients: this.step2.get('ingredients')?.getRawValue()
      }

      const id = this.step1.get('id')?.value;

      if (id === null) {
        this.storeFacadeSvc.addRecipe(recipe);
      } else {
        recipe.id = id,
          this.storeFacadeSvc.editRecipe(recipe)
      }
    }
  }

  private populateForm(recipe: Recipe): void {
    this.step1.get('id')?.setValue(recipe.id);
    this.step1.get('name')?.setValue(recipe.name);
    this.step1.get('description')?.setValue(recipe.description);
    this.step3.get('preparation')?.setValue(recipe.preparation);
    this.populateIngredientsFormArray(recipe.ingredients as Ingredient[]);

  }

  private populateIngredientsFormArray(ingredients: Ingredient[]): void {
    ingredients?.forEach((ingredient) => {
      const fg = this.fb.group({});
      for (const [propName, value] of Object.entries(ingredient)) {
        fg.addControl(propName, this.fb.control(value, Validators.required));
      }
      this.fg_ingredients.push(fg);
    })

    this.recipeIngredients$.next(this.fg_ingredients.controls);
  }

}
