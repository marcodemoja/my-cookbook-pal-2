import { Inject, Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { createSignal } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly http = inject(HttpClient);
  readonly user = signal({});

  baseEndpoint = `${environment.apiBaseUrl}/auth`;

  isUserLogged():boolean {
    const user = sessionStorage.getItem('user.email');
    return user ? true : false;
  }

  login(email:string, password: string):Observable<User|HttpErrorResponse> {
    return this.http.post<User>(`${this.baseEndpoint}/login`, {email, password}).pipe(
      tap((user) => {
        sessionStorage.setItem('user.email', user.email);
        sessionStorage.setItem('user.name', user.name);
        this.user.set(user);
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err)
        return of(err)
      })
    )
  }

  signup(name: string, email: string, password: string): Observable<User|string> {
    return this.http.post<User>(`${this.baseEndpoint}/signup`, { email, name, password})
  }

}
