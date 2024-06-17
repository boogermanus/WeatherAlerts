import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthModel } from '../models/auth-model';
import { BehaviorSubject, Observable, map, of, pipe, switchMap } from 'rxjs';
import { IAuthResponse } from '../interfaces/iauth-response';
import { ApiConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN: string = "token";
  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtService: JwtHelperService) { }

  public login(model: AuthModel): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${ApiConfig.authApi}/login`, model);
  }

  public authenticate(token: string): void {
    localStorage.setItem(this.TOKEN, token)
    this.authenticated.next(true);
  }
  
  public logout(): void {
    localStorage.removeItem(this.TOKEN);
    this.authenticated.next(false);
  }
  
  public get isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  public userId(): string {
    const token = localStorage.getItem(this.TOKEN);
    const decode: any = this.jwtService.decodeToken(token);
    return decode.nameid;
  }

}
