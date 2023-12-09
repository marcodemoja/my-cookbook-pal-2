import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IFood } from '../../../shared/interfaces/IFood';
import { NutritionXService } from '../../../shared/services/nutrition-x.service';

export class FoodService {

  private base_url = `${environment.apiBaseUrl}/food`;
  private readonly http = inject(HttpClient);
  private readonly nutritionXSvc = inject(NutritionXService);
  selectedFoodWithFacts = signal({});

  add(food: IFood): Observable<IFood> {
    return this.http.post<IFood>(`${this.base_url}`, food);
  }

  update(food: IFood): Observable<any> {
    return this.http.put(`${this.base_url}`, food);
  }

  getFoodByName(food_name: string): Observable<IFood> {
    return this.http.get<IFood>(`${this.base_url}/findOne`, {params: {food_name}});
  }

  //look into mongoDB for food, if not present call external APIs to retrieve info and save in mongoDB
  getFoodNutrientsByNameAndSave(food_name: string): Observable<IFood> {
    return this.getFoodByName(food_name).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 404){
          return this.nutritionXSvc.getNutrients(food_name).pipe(
            switchMap((facts) => this.add(facts))
          )
        }
          return new Observable<IFood>()
      }),
      map(result => result)
    )
  }

  search(name?: string, offset?: number, limit?: number ): Observable<IFood[]> {
    let query_str = name ? `name=${name}&`: ``;
    query_str += `offset=${offset}&limit=${limit}`;

    return this.http.get<IFood[]>(`${this.base_url}/food/search?${query_str}`);
  }

}
