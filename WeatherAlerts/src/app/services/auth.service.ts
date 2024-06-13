import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthModel } from '../models/auth-model';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../interfaces/iauth-response';
import { ApiConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtService: JwtHelperService) { }

    public login(model: AuthModel): Observable<IAuthResponse> {
      return this.httpClient.post<IAuthResponse>(`${ApiConfig.authApi}/login`,model);
    }

}
