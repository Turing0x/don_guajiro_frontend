import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { environment } from '../../../environments/environments';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  private readonly baseUrl: string = environment.baseUrl;

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  public setAuthentication(user: User, token: string): boolean {

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('access-token', token);

    return true;
  }

  login(username: string, password: string):Observable<Data> {
    const url = `${this.baseUrl}/api/users/signIn`;
    const body = { username, password };
    return this.http.post<LoginResponse>(url, body);
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/api/users/checkToken`;
    const token = localStorage.getItem('access-token');

    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.post<CheckTokenResponse>(`${url}`,{token})
      .pipe(
        map(({ data }) => this.setAuthentication(data.user, data.token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('access-token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
