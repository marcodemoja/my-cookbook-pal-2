import { ChangeDetectionStrategy, Component, Signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';
import { Recipe } from '../../models/recipe.model';
import { StoreFacadeService } from '../../../../store/store.facade';

@Component({
  selector: 'app-recipes-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, RecipesListComponent],
  templateUrl: './recipes-list-page.component.html',
  styleUrl: './recipes-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  storeSvc = inject(StoreFacadeService);
  recipes:Signal<Recipe[]> = this.storeSvc.recipesSignal;

  onDeleteRecipe(id: string):void {
    this.storeSvc.deleteRecipe(id);
  }

  onEditRecipe(id: string): void {
    this.router.navigate(['recipes/edit', id])
  }


}
