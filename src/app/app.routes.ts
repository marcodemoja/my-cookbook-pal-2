import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/services/auth.guard';

export const routes: Routes = [
  {
    path: 'recipes',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./features/recipes')
      .then(m => m.recipesRoutes)

  },
  {
    path: 'login',
    component: LoginComponent
  }
];
