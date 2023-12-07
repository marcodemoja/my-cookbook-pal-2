import { Routes } from '@angular/router';
import { RecipesPageComponent } from './containers/recipes-page/recipes-page.component';
import { provideState } from '@ngrx/store';
import { recipesEffects, recipesFeature } from './store';
import { provideEffects } from '@ngrx/effects';
import { AddRecipePageComponent } from './containers/add-recipe-page/add-recipe-page.component';
import { RecipesApiService } from './services/recipes-api.service';
import { RecipesListPageComponent } from './containers/recipes-list-page/recipes-list-page.component';
import { recipesResolver } from '../../resolvers/recipes.resolver';
import { recipeResolver } from '../../resolvers/recipe.resolver';

export const recipesRoutes: Routes = [
  {
    path: '',
    component: RecipesPageComponent,
    providers: [
      RecipesApiService,
      provideState(recipesFeature),
      provideEffects(recipesEffects)
    ],
    children: [
      {
        path: 'add',
        component: AddRecipePageComponent
      },
      {
        path: 'edit/:id',
        component: AddRecipePageComponent,
        resolve: {
          recipe: recipeResolver
        }
      },
      {
        path: 'list',
        component: RecipesListPageComponent,
        resolve: {
          recipes: recipesResolver
        },
      }

    ]
  }
];
