import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { environment } from '../../../../environments/environment';
import { RecipeSearchRequest } from '../models/recipe.requests';

@Injectable()
export class RecipesApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly svcApiUrl = `${environment.apiBaseUrl}/recipe`;

  save(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.svcApiUrl}/create`, recipe).pipe(
      map((recipe) => recipe))
  }

  edit(recipe: Partial<Recipe>): Observable<{}> {
    console.log(recipe, 'recipe');
    return this.http.patch(`${this.svcApiUrl}`, recipe, {params: {
      id: recipe.id as string
    }});
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${this.svcApiUrl}`, { params: {id}})
   }

  search(params?: RecipeSearchRequest): Observable<Recipe[]> {
    let query_str = ''

    if (params) {
      query_str = params.name ? `name=${params.name}&` : ``;
      query_str += `offset=${params.offset}&limit=${params.limit}`;
    }

    return this.http.get<Recipe[]>(`${this.svcApiUrl}/search${query_str}`);
  }

  fetchByName(name: string) { }

  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.svcApiUrl}/`, { params: {id}})
  }
}
