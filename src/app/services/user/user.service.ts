import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { authRequest } from 'src/app/models/interfaces/user/auth/authRequest';
import { authResponse } from 'src/app/models/interfaces/user/auth/authResponse';
import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`, requestDatas
    )
  }

  authUser(requestDatas: authRequest): Observable<authResponse> {
    return this.http.post<authResponse>(`${this.API_URL}/auth`, requestDatas)
  }
}
