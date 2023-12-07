import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ENDPOINTS } from '../../environments/endpoints';
import {
  PaginatedUser,
  SingleUser,
  User,
} from '../models/interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  constructor() {}

  getUsers(page: number = 1): Observable<User[]> {
    return this.http
      .get<PaginatedUser>(`${ENDPOINTS.users.users}`, {
        params: { page, delay:3},
      })
      .pipe(map((response) => response.data));
  }
  
  getUser(id:string): Observable<User> {
    return this.http
      .get<SingleUser>(`${ENDPOINTS.users.users}/${id}`)
      .pipe(map(({data}) => data));
  }
}
