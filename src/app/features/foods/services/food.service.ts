import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IFood } from '../../../shared/interfaces/IFood';
import { InstantSearchItemResponse, InstantSearchResponse } from '../../../shared/interfaces/nutritionx/responses';

export class FoodService {

  private base_url = `${environment.apiBaseUrl}/food`;
  private readonly http = inject(HttpClient);
  selectedFoodWithFacts = signal({});

  add(food: IFood): Observable<IFood> {
    return this.http.post<IFood>(`${this.base_url}`, food);
  }

  update(food: IFood): Observable<any> {
    return this.http.put(`${this.base_url}`, food);
  }

  getFoodByName(food_name: string): Observable<IFood> {
    return this.http.get<IFood>(`${this.base_url}/find/${food_name}`);
  }

  searchTerm(query: string): Observable<InstantSearchItemResponse[]> {
    return this.http.get<InstantSearchResponse>(`${this.base_url}/search/${query}`).pipe(
      map(result => result.common)
    )
  }

  typeAheadSearchFood(query:string): Observable<InstantSearchItemResponse[]> {
    return of(query).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => this.searchTerm(q))
    );
  }


  selectFood(food_name: string): Observable<IFood> {
    return this.http.get<IFood>(`${this.base_url}/find/${food_name}`)
  }

  search(name?: string, offset?: number, limit?: number ): Observable<IFood[]> {
    let query_str = name ? `name=${name}&`: ``;
    query_str += `offset=${offset}&limit=${limit}`;

    return this.http.get<IFood[]>(`${this.base_url}/food/search?${query_str}`);
  }

}
