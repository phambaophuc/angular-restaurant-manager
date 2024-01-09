import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    apiURL = 'http://localhost:3000/api/v1/table';

    constructor(private http: HttpClient) { }

    getTables(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiURL}`);
    }

    getTablesByStatus(status: string): Observable<any[]> {
        const URL = `${this.apiURL}/status/${status}`;
        return this.http.get<any[]>(URL);
    }
}
