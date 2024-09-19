import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public username!: string;

  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return localStorage.getItem('auth-token') ? true : false;
  }

  getUsername() {
    return this.username;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setJWT(data: string) {
    localStorage.setItem('auth-token', data);
  }

  getJWT() {
    return localStorage.getItem("auth-token");
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/login', data, {
      observe: 'body',
    });
  }

  signup(data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/signup', data, {
      observe: 'body',
    });
  }
}
