import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LoginPageComponent } from './features/auth/containers/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/recipes')
      .then(m => m.recipesRoutes)

  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];
