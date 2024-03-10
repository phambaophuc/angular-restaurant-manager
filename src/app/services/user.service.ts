import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiURL = 'http://localhost:3000/api/v1';

    constructor(private http: HttpClient) { }

    getUserById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiURL}/user/${id}`);
    }
}
