import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthModel} from '../models/auth-model';
import {BehaviorSubject, Observable} from 'rxjs';
import {IAuthResponse} from '../interfaces/iauth-response';
import {ApiConfig} from '../config';
import {RegisterModel} from '../models/register-model';
import {AuthConstants} from '../auth/auth-constants'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtService: JwtHelperService) {
    if (this.isValidToken) {
      this.authenticated.next(true);
    }
  }

  public login(model: AuthModel): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${ApiConfig.authApi}/login`, model);
  }

  public authenticate(token: string): void {
    localStorage.setItem(AuthConstants.TOKEN_NAME, token)
    this.authenticated.next(true);
  }

  public logout(): void {
    localStorage.removeItem(AuthConstants.TOKEN_NAME);
    this.authenticated.next(false);
  }

  public get isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  public get isValidToken(): boolean {
    const token = localStorage.getItem(AuthConstants.TOKEN_NAME);
    return !this.jwtService.isTokenExpired(token)
  }

  public register(model: RegisterModel): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(`${ApiConfig.authApi}/register`, model);
  }

  public userId(): string {
    const token = localStorage.getItem(AuthConstants.TOKEN_NAME);
    const decode: any = this.jwtService.decodeToken(token);
    return decode.nameid;
  }

}
