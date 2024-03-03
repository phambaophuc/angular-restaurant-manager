import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    apiURL = `${environment.apiUrl}/api/products`;

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiURL}`);
    }

    getProductById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiURL}/${id}`);
    }
}
