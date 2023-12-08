import { Inject, Injectable, Signal, computed, effect, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoggedUser, SignIn, User } from '../models/user';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResponseSuccessSignIn } from '../../shared/types/http.responses';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  baseEndpoint = `${environment.apiBaseUrl}/auth`;

  isUserLogged = signal(false);

  verifySessionStorageToken():Observable<LoggedUser|null> {
    const token = sessionStorage.getItem('token')!;
    if(token !== null) {
      return this.http.post<ResponseSuccessSignIn>(`${this.baseEndpoint}/verify`, {token}, {observe: 'response'}).pipe(
        tap((res) => {
          if( res.headers.get('x-auth-token') === token) {
            this.isUserLogged.set(true);
            this.router.navigate(['recipes', 'list'])
          } else {
            this.isUserLogged.set(false);
            this.router.navigate(['login']);
          }
        }),
        map((res) => res.body?.user!),
      )
    }
    return of(null);
  }

  signIn(user: SignIn):Observable<HttpResponse<ResponseSuccessSignIn>> {
    return this.http.post<ResponseSuccessSignIn>(`${this.baseEndpoint}/login`, {email: user.email, password: user.password}, {observe: 'response'}).pipe(
      tap((res) => {
        const token = res.headers.get('X-Auth-Token')!;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', res.body?.user?.email!);
        sessionStorage.setItem('name', res.body?.user?.name!);

        if(sessionStorage.getItem('token') !== null){
          this.isUserLogged.set(true);
          this.router.navigate(['recipes', 'list']);
        }
      })
    )
  }

  signup(name: string, email: string, password: string): Observable<User|string> {
    return this.http.post<User>(`${this.baseEndpoint}/signup`, { email, name, password})
  }

  signOut():void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    this.isUserLogged.set(false);
    this.router.navigate(['login']);
  }

}
