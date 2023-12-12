import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { environment } from '../../../../environments/environment';
import { RecipeSearchRequest } from '../models/recipe.requests';

@Injectable()
export class RecipesApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiSuffix = '/recipe'

  save(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${environment.apiBaseUrl}${this.apiSuffix}/create`, recipe).pipe(
      map((recipe) => recipe))
  }

  edit(recipe: Partial<Recipe>): Observable<{}> {
    console.log(recipe, 'recipe');
    return this.http.patch(`${environment.apiBaseUrl}${this.apiSuffix}`, recipe, {params: {
      id: recipe.id as string
    }});
  }

  delete(id: string) { }

  search(params?: RecipeSearchRequest): Observable<Recipe[]> {
    let query_str = ''

    if (params) {
      query_str = params.name ? `name=${params.name}&` : ``;
      query_str += `offset=${params.offset}&limit=${params.limit}`;
    }

    return this.http.get<Recipe[]>(`${environment.apiBaseUrl}${this.apiSuffix}/search${query_str}`);
  }

  fetchByName(name: string) { }

  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.apiBaseUrl}${this.apiSuffix}/`, { params: {id}})
  }
}
