import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/users';

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.api}/users/register`, data);
  }

  login(data: { correo: string; contraseña: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
