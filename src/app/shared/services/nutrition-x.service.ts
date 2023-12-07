import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NaturalNutrientsRequest } from '../interfaces/nutritionx/requests';
import { Food, InstantSearchItemResponse, InstantSearchResponse, NaturalNutrientsResponse } from '../interfaces/nutritionx/responses';
import { IFood } from '../interfaces/IFood';

@Injectable({
  providedIn: 'root'
})
export class NutritionXService {

  http: HttpClient = inject(HttpClient);

  searchFood(name: string): Observable<InstantSearchItemResponse[]> {
    return this.http.get<InstantSearchResponse>(`${environment.nutritionXBaseUrl}search/instant`, { params: { query: name, branded: false } })
      .pipe(map(response => response.common))
  }

  getNutrients(food_name: string, params?: NaturalNutrientsRequest): Observable<IFood> {
      return this.http.post<NaturalNutrientsResponse>(`${environment.nutritionXBaseUrl}natural/nutrients`, { query: food_name })
        .pipe(
          map(response => response.foods[0]),
          map((facts) => {
            const food: IFood = {
              food_name: facts.food_name,
              serving_unit: facts.serving_unit,
              serving_qty: facts.serving_qty,
              serving_weight_grams:facts.serving_weight_grams,
              calories: facts.nf_calories,
              total_carbohydrate: facts.nf_total_carbohydrate,
              dietary_fiber: facts.nf_dietary_fiber,
              sugars: facts.nf_sugars,
              protein: facts.nf_protein,
              total_fat: facts.nf_total_fat,
              saturated_fat: facts.nf_saturated_fat,
              cholesterol: facts.nf_cholesterol,
              sodium: facts.nf_sodium,
            }
            return food
          }),
        );
  }

  typeAheadSearchFood(query:string): Observable<InstantSearchItemResponse[]> {
    return of(query).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => this.searchFood(q))
    );
  }
}
