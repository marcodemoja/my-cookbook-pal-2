import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, switchMap, of, map, exhaustMap, tap } from 'rxjs';
import { RecipesApiService } from '../services/recipes-api.service';
import { fetchRecipes, fetchRecipesSuccess, addRecipe, addRecipeSuccess,
  apiError, editRecipe, editRecipeSuccess, fetchRecipe, fetchRecipeSuccess } from './recipes.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Update } from '@ngrx/entity';
import { Recipe } from '../models/recipe.model';
import { Router } from '@angular/router';

export const fetchRecipes$ = createEffect(
  (actions$: Actions = inject(Actions), recipesApiSvc: RecipesApiService = inject(RecipesApiService)) => {
    return actions$.pipe(
      ofType(fetchRecipes),
      switchMap(() => recipesApiSvc.search().pipe(
        map((recipes) => {
          return fetchRecipesSuccess({ recipes })
        })
      )
      ),
      catchError((e: HttpErrorResponse) => {
        return [apiError(e)]
      })
    )
  },
  { functional: true }
);

export const addRecipe$ = createEffect(
  (actions$: Actions = inject(Actions), recipesApiSvc: RecipesApiService = inject(RecipesApiService)) => {
    return actions$.pipe(
      ofType(addRecipe),
      exhaustMap((action) => recipesApiSvc.save(action.recipe).pipe(
        map((recipe) => addRecipeSuccess({ recipe })),
        catchError((e: HttpErrorResponse) => {
          return of(apiError(e))
        })
      ))
    )
  },
  { functional: true }
);

export const fetchRecipe$ = createEffect(
  (actions$ = inject(Actions), recipeApiSvc = inject(RecipesApiService)) => {
    return actions$.pipe(
      ofType(fetchRecipe),
      switchMap((action) => {
        return recipeApiSvc.getById(action.id).pipe(
          map(recipe => fetchRecipeSuccess({ recipe })),
          catchError((e: HttpErrorResponse) => {
            return of(apiError(e))
          })
        )
      })
    )
  },
  { functional: true }
);

export const editRecipe$ = createEffect(
  (actions$ = inject(Actions), recipesApiSvc = inject(RecipesApiService)) => {
    return actions$.pipe(
      ofType(editRecipe),
      switchMap((action) =>  {
        return recipesApiSvc.edit(action.recipe).pipe(
        map(() => {
          const recipe: Update<Recipe> = {
            id: action.recipe.id as string,
            changes: action.recipe
          };
          return editRecipeSuccess({ recipe })
        }),
        catchError((e: HttpErrorResponse) => {
          return of(apiError(e))
        })
      )})
    )
  },
  { functional: true }
);

export const addRecipeSuccess$ = createEffect(
  (actions$: Actions = inject(Actions), router: Router = inject(Router)) => {
    return actions$.pipe(
      ofType(addRecipeSuccess, editRecipeSuccess),
      tap(() => router.navigate(['recipes', 'list']))
    )
  },
  { dispatch: false, functional: true }
);
